#!/usr/bin/env node
/**
 * Build @dotdev/ui-kit -> dist mirroring the src structure.
 * Public API surface is the root barrel only (@dotdev/ui-kit).
 *
 * Units:
 *   - src/components/<name>          -> dist/components/<name>/index.{mjs,d.ts}   (mjs bundled, d.ts copied verbatim from <name>.type.ts)
 *   - src/utils|config|composables   -> dist/<unit>/**.mjs + **.d.ts              (preserveModules, file per module)
 *   - src/types                      -> dist/types/*.d.ts                         (declarations only)
 *   - ../theme/src (runtime+generated)-> dist/theme/**                            (inlined, codegen config excluded)
 *
 * Every intra-kit import stays an unresolved '@dotdev/ui-kit' specifier (PrimeVue-style),
 * same for vue / vue-router / @floating-ui/*. '@dotdev/theme' is bundled: its specifiers
 * are rewritten to relative './theme/index.*' paths after the unit builds.
 */
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { build as viteBuild } from 'vite'

const PKG_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(PKG_DIR, 'src')
const DIST = join(PKG_DIR, 'dist')
const TYPES = join(PKG_DIR, '.types')
const COMPONENTS_SRC = join(SRC, 'components')
const THEME_SRC = resolve(PKG_DIR, '..', 'theme', 'src')
const THEME_OUT = join(DIST, 'theme')
const PLUGIN_SRC = join(SRC, 'plugins', 'dotdev-ui-css')
const PLUGIN_OUT = join(DIST, 'plugin')

const INFRA_UNITS = readdirSync(SRC, { withFileTypes: true })
  .filter(
    (e) =>
      e.isDirectory() && e.name !== 'components' && e.name !== 'types' && existsSync(join(SRC, e.name, 'index.ts')),
  )
  .map((e) => e.name)

const pkg = JSON.parse(readFileSync(join(PKG_DIR, 'package.json'), 'utf8'))
const EXTERNAL_RE = new RegExp(
  `^(?:${[...new Set([...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {}), '@dotdev/'])]
    .map((e) => {
      const safe = e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return e.startsWith('@') ? safe : `${safe}(?:\\/|$)`
    })
    .join('|')})`,
)

const isExternal = (id) =>
  id.startsWith('node:') || (!id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0') && EXTERNAL_RE.test(id))

/** Recursively list files under dir as paths relative to it */
function walkFiles(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name)
    return e.isDirectory() ? walkFiles(p, base) : [relative(base, p)]
  })
}

/** Component units discovered from the filesystem */
function discoverUnits() {
  return readdirSync(COMPONENTS_SRC, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(COMPONENTS_SRC, e.name, 'index.ts')))
    .map((e) => e.name)
}

/** Phase A-1: bundle one component folder into a single index.mjs */
async function buildComponentJs(unit) {
  await viteBuild({
    configFile: false,
    root: PKG_DIR,
    logLevel: 'error',
    plugins: [vue()],
    build: {
      outDir: 'dist/components',
      emptyOutDir: false,
      target: 'esnext',
      minify: false,
      sourcemap: false,
      rollupOptions: {
        input: { [unit]: join(COMPONENTS_SRC, unit, 'index.ts') },
        external: isExternal,
        preserveEntrySignatures: 'allow-extension',
        output: {
          format: 'es',
          entryFileNames: '[name]/index.mjs',
        },
      },
    },
  })
}

/**
 * Phase A-2: emit infra folder file-per-module.
 * Relative imports between sibling files are rewritten to the emitted neighbours;
 * '@dotdev/ui-kit' and other externals stay untouched.
 */
async function buildInfraJs(unit) {
  await viteBuild({
    configFile: false,
    root: PKG_DIR,
    logLevel: 'error',
    build: {
      outDir: `dist/${unit}`,
      emptyOutDir: false,
      target: 'esnext',
      minify: false,
      sourcemap: false,
      rollupOptions: {
        input: { index: join(SRC, unit, 'index.ts') },
        external: isExternal,
        preserveEntrySignatures: 'allow-extension',
        output: {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: join(SRC, unit),
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
        },
      },
    },
  })
}

/**
 * Phase A-3: emit @dotdev/theme (runtime + generated styles) file-per-module.
 * Codegen inputs from theme/src/config are excluded — they are build-time only
 * and still depend on the design CLI. The public barrel is written textually.
 */
async function buildThemeJs() {
  const entries = Object.fromEntries([
    ...walkFiles(join(THEME_SRC, 'runtime'))
      .filter((f) => f.endsWith('.ts'))
      .map((f) => [`runtime/${f.replace(/\.ts$/, '')}`, join(THEME_SRC, 'runtime', f)]),
    ...walkFiles(join(THEME_SRC, 'generated'))
      .filter((f) => f.endsWith('.ts'))
      .map((f) => [`generated/${f.replace(/\.ts$/, '')}`, join(THEME_SRC, 'generated', f)]),
  ])

  await viteBuild({
    configFile: false,
    root: PKG_DIR,
    logLevel: 'error',
    build: {
      outDir: 'dist/theme',
      emptyOutDir: false,
      target: 'esnext',
      minify: false,
      sourcemap: false,
      rollupOptions: {
        input: entries,
        external: isExternal,
        preserveEntrySignatures: 'allow-extension',
        output: {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: THEME_SRC,
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
        },
      },
    },
  })
}

/**
 * Phase A-4: emit the vite plugin (`@dotdev/ui-kit/plugin`) file-per-module.
 * Deliberately NOT part of the root barrel: it is a build-time tool with its own
 * externals (magic-string, @vue/compiler-*), so it ships as a separate subpath.
 */
async function buildPluginJs() {
  await viteBuild({
    configFile: false,
    root: PKG_DIR,
    logLevel: 'error',
    build: {
      outDir: 'dist/plugin',
      emptyOutDir: false,
      target: 'esnext',
      minify: false,
      sourcemap: false,
      rollupOptions: {
        input: { index: join(PLUGIN_SRC, 'index.ts') },
        external: isExternal,
        preserveEntrySignatures: 'allow-extension',
        output: {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: join(SRC, 'plugins', 'dotdev-ui-css'),
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
        },
      },
    },
  })
}

function writeThemeBarrels() {
  const runtimeFiles = walkFiles(join(THEME_SRC, 'runtime'))
    .filter((f) => f.endsWith('.ts'))
    .map((f) => f.replace(/\.ts$/, ''))

  writeFileSync(
    join(THEME_OUT, 'index.mjs'),
    [`export * from './generated/index.mjs'`, ...runtimeFiles.map((f) => `export * from './runtime/${f}.mjs'`)].join(
      '\n',
    ) + '\n',
  )
  writeFileSync(
    join(THEME_OUT, 'index.d.ts'),
    [`export * from './generated/index.js'`, ...runtimeFiles.map((f) => `export * from './runtime/${f}.js'`)].join(
      '\n',
    ) + '\n',
  )
}

/** Copy theme declarations emitted next to ui-kit's (.types/theme/src) */
function copyThemeDts() {
  const themeDirs = readdirSync(join(TYPES, 'theme', 'src'), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
  for (const dir of themeDirs) {
    cpSync(join(TYPES, 'theme', 'src', dir), join(THEME_OUT, dir), { recursive: true })
  }
  rewriteDtsSpecifiers(THEME_OUT)
}

/**
 * Copy plugin declarations emitted to .types/ui-kit/src/plugins/dotdev-ui-css
 * into dist/plugin, mirroring the infra handling (per-file + barrel synth).
 */
function copyPluginDts() {
  const srcTypeDir = join(TYPES, 'ui-kit', 'src', 'plugins', 'dotdev-ui-css')
  const outDir = PLUGIN_OUT

  if (!existsSync(join(srcTypeDir, 'index.d.ts'))) return

  cpSync(srcTypeDir, outDir, { recursive: true })
  rewriteDtsSpecifiers(outDir)
  for (const rel of walkFiles(srcTypeDir)) {
    if (rel.endsWith('.ts')) synthesizeMissingBarrelMjs('plugin', rel.replace(/\.ts$/, ''))
  }
  console.log('  d.ts plugin/ (copied, mirrored)')
}

/**
 * '@dotdev/theme' is bundled into dist/theme — point every remaining specifier
 * at the local barrel from the importing file's location.
 */
function rewriteThemeSpecifiers() {
  for (const rel of walkFiles(DIST)) {
    if (!rel.endsWith('.mjs') && !rel.endsWith('.d.ts')) continue
    const file = join(DIST, rel)
    const src = readFileSync(file, 'utf8')
    if (!src.includes('@dotdev/theme')) continue

    let target = relative(dirname(file), THEME_OUT).replaceAll('\\', '/')
    if (!target.startsWith('.')) target = `./${target}`
    const ext = rel.endsWith('.mjs') ? 'index.mjs' : 'index.js'
    const next = src.replace(/(['"])@dotdev\/theme\1/g, (_m, q) => `${q}${target}/${ext}${q}`)
    if (next !== src) writeFileSync(file, next)
  }
}

/** Phase B-1: emit declaration files for the whole src via vue-tsc */
function emitDeclarations() {
  const bin = join(PKG_DIR, 'node_modules', '.bin', 'vue-tsc')
  const cmd = process.platform === 'win32' ? `${bin}.cmd` : bin
  const result = spawnSync(cmd, ['-p', 'tsconfig.build.json'], { cwd: PKG_DIR, stdio: 'inherit' })
  if (result.status !== 0) {
    throw new Error(`vue-tsc failed with exit code ${result.status}`)
  }
}

/** Component declarations are hand-authored (<unit>.types.ts) — copied verbatim */
function copyComponentDts(unit) {
  cpSync(join(COMPONENTS_SRC, unit, `${unit}.types.ts`), join(DIST, 'components', unit, 'index.d.ts'))
}

/** Phase B-3: infra + types declarations are already per-file — copy the emitted tree */
function copyInfraDts(unit) {
  cpSync(join(TYPES, 'ui-kit', 'src', unit), join(DIST, unit), { recursive: true })
}

function copyTypesDts() {
  cpSync(join(TYPES, 'ui-kit', 'src', 'types'), join(DIST, 'types'), { recursive: true })
}

const REL_TS_SPECIFIER = /from '(\.\.?\/[^']+)\.ts'/g

/**
 * Emitted declarations keep '.ts' specifiers; point them at sibling declarations
 * ('./bem.js' resolves to the adjacent bem.d.ts for consumers).
 */
function rewriteDtsSpecifiers(dir) {
  for (const rel of walkFiles(dir)) {
    if (!rel.endsWith('.d.ts')) continue
    const file = join(dir, rel)
    const src = readFileSync(file, 'utf8')
    const next = src.replace(REL_TS_SPECIFIER, "from '$1.js'")
    if (next !== src) writeFileSync(file, next)
  }
}

/**
 * rolldown drops pass-through barrel modules (pure re-export chains) from
 * preserveModules output. Restore them: the module's own d.ts already describes
 * exactly what it re-exports, so transpile those lines into an .mjs stub.
 */
function synthesizeMissingBarrelMjs(unit, rel) {
  const outBase = join(DIST, rel).replace(/\.ts$/, '')
  if (existsSync(`${outBase}.mjs`) || !existsSync(`${outBase}.d.ts`)) return

  const dts = readFileSync(`${outBase}.d.ts`, 'utf8')
  const reexports = dts
    .split('\n')
    .filter((line) => /^export \* from|^export \{[^}]*} from/.test(line.trim()))
    .join('\n')
    .replace(/from '(\.\.?\/[^']+)\.js'/g, "from '$1.mjs'")

  if (!reexports.trim()) return

  writeFileSync(`${outBase}.mjs`, `[synthesized barrel]\n${reexports}\n`)
  console.log(`  synth ${relative(DIST, `${outBase}.mjs`)}`)
}

/** Sanity: every infra source module has its .mjs (+.d.ts) — skip pure type-only files */
function assertInfraMirror(unit) {
  for (const rel of walkFiles(join(SRC, unit))) {
    if (!rel.endsWith('.ts')) continue
    const outBase = join(DIST, unit, rel.replace(/\.ts$/, ''))
    if (!existsSync(`${outBase}.d.ts`)) throw new Error(`missing declaration for ${unit}/${rel}: ${outBase}.d.ts`)
    if (!existsSync(`${outBase}.mjs`)) {
      const src = readFileSync(join(SRC, unit, rel), 'utf8')
      const hasRuntime = /^export (?:const|let|var|function|class|default) /m.test(src)
      if (hasRuntime) throw new Error(`missing dist artifact for ${unit}/${rel}: ${outBase}.mjs`)
    }
  }
}

/** Phase C: root barrels; order mirrors src/index.ts */
function writeRootBarrels(components) {
  const runtimeUnits = ['utils', 'core', ...components.map((c) => `components/${c}`), 'composables']
  const typeExports = readdirSync(join(SRC, 'types'))
    .filter((f) => f.endsWith('.ts'))
    .map((f) => `export * from './types/${f.replace(/\.ts$/, '.js')}'`)

  writeFileSync(join(DIST, 'index.mjs'), runtimeUnits.map((u) => `export * from './${u}/index.mjs'`).join('\n') + '\n')
  writeFileSync(
    join(DIST, 'index.d.ts'),
    [...typeExports, ...runtimeUnits.map((u) => `export * from './${u}/index.js'`)].join('\n') + '\n',
  )
}

/** Auto-generate src/components/index.ts from discovered components */
function generateComponentsBarrel(components) {
  const content =
    components
      .sort()
      .map((c) => `export * from './${c}'`)
      .join('\n') + '\n'
  writeFileSync(join(COMPONENTS_SRC, 'index.ts'), content)
}

/** Auto-generate src/index.ts with type + runtime exports */
function generateIndexBarrel(infraUnits) {
  const typeExports = readdirSync(join(SRC, 'types'))
    .filter((f) => f.endsWith('.ts'))
    .map((f) => `export type * from './types/${f}'`)

  const infraExports = infraUnits.filter((u) => u !== 'composables').map((u) => `export * from './${u}'`)

  const lines = [
    '/* Types */',
    ...typeExports,
    '',
    '/* Runtime */',
    ...infraExports,
    '',
    '/* Components */',
    `export * from './components'`,
    `export * from './composables'`,
  ]

  writeFileSync(join(SRC, 'index.ts'), lines.join('\n') + '\n')
}

async function main() {
  const t0 = performance.now()
  const units = discoverUnits()

  generateComponentsBarrel(units)
  generateIndexBarrel(INFRA_UNITS)
  console.log(`ui-kit build: ${units.length} components + ${INFRA_UNITS.join(', ')} + types`)
  rmSync(DIST, { recursive: true, force: true })
  rmSync(TYPES, { recursive: true, force: true })

  for (const unit of units) {
    await buildComponentJs(unit)
    console.log(`  mjs  components/${unit}`)
  }
  for (const unit of INFRA_UNITS) {
    await buildInfraJs(unit)
    console.log(`  mjs  ${unit}/ (preserveModules)`)
  }
  await buildPluginJs()
  console.log('  mjs  plugin/ (preserveModules)')
  await buildThemeJs()
  writeThemeBarrels()
  console.log('  mjs  theme/ (inlined)')

  emitDeclarations()
  for (const unit of units) {
    copyComponentDts(unit)
    console.log(`  d.ts components/${unit} (copied)`)
  }
  for (const unit of INFRA_UNITS) {
    copyInfraDts(unit)
    rewriteDtsSpecifiers(join(DIST, unit))

    for (const rel of walkFiles(join(SRC, unit))) {
      if (rel.endsWith('.ts')) synthesizeMissingBarrelMjs(unit, `${unit}/${rel}`)
    }

    assertInfraMirror(unit)
    console.log(`  d.ts ${unit}/ (copied, mirrored)`)
  }
  copyTypesDts()
  rewriteDtsSpecifiers(join(DIST, 'types'))
  console.log('  d.ts types/')

  copyThemeDts()
  writeThemeBarrels()
  console.log('  d.ts theme/ (inlined)')

  copyPluginDts()

  writeRootBarrels(units.sort())
  rewriteThemeSpecifiers()
  rmSync(TYPES, { recursive: true, force: true })

  console.log(`ui-kit build done in ${((performance.now() - t0) / 1000).toFixed(1)}s`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
