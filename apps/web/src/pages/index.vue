<script lang="ts" setup>
import { ref } from 'vue'
import {
  Avatar,
  Breadcrumbs,
  Button,
  Checkbox,
  Icon,
  IconButton,
  Input,
  Message,
  Pagination,
  Progress,
  Radio,
  Select,
  SelectButton,
  Skeleton,
  Switch,
  Tabs,
  Tag,
  Textarea,
  UiKitProvider,
} from '@dotdev/ui-kit'
import Logo from '../components/Logo.vue'

definePage({ name: 'Landing' })

const pgVariant = ref('soft')
const pgColor = ref('primary')
const pgSize = ref('md')
const demoSwitch = ref(true)

const marqueeIcons = [
  'accessibility',
  'align-right',
  'arrow-down',
  'avatar',
  'bookmark-filled',
  'border-right',
  'box-model',
  'caret-down',
  'check-circled',
  'circle-backslash',
  'column-spacing',
  'component-none',
  'corner-top-left',
  'cross-2',
  'cursor-text',
  'discord-logo',
  'double-arrow-down',
  'drag-handle-horizontal',
  'envelope-closed',
  'exit-full-screen',
  'file',
  'font-italic',
  'github-logo',
  'hamburger-menu',
  'home',
  'keyboard',
  'letter-case-toggle',
  'link-break-1',
  'lock-closed',
  'mask-off',
  'mixer-vertical',
  'open-in-new-window',
  'panel-right',
  'person',
  'play',
  'reader',
  'row-spacing',
  'sewing-pin',
  'share-2',
  'space-between-vertically',
  'square',
  'stretch-horizontally',
  'target',
  'text-align-middle',
  'thick-arrow-up',
  'transparency-grid',
  'twitter-logo',
  'video',
  'zoom-in',
] as const

const strengths = [
  {
    title: 'BEM + Tailwind, zero runtime',
    desc: 'Methodology and utilities compose instead of fighting. Styles ship as CSS tokens — no CSS-in-JS, no runtime cost, nothing to flash on load.',
  },
  {
    title: 'Namespaces, not migrations',
    desc: 'Run several design systems side by side in one app. Roll the new look out section by section while the old one keeps working.',
  },
  {
    title: 'One grammar for every control',
    desc: 'Soft, outlined or solid — every component speaks the same three fills plus a full semantic color set. Learn once, apply everywhere.',
  },
  {
    title: 'Dark mode is a first-class twin',
    desc: 'Light and dark derive from the same oklch ramp, not an afterthought pass. Flip the scheme and every surface follows.',
  },
  {
    title: 'Keyboard-first details',
    desc: '⌘K search, arrow-key navigation through menus and lists, focus rings you can actually see. Built for people who live on the keyboard.',
  },
  {
    title: 'Docs that run themselves',
    desc: 'The studio framework generates live examples straight from component folders. If a demo compiles, it matches the code you install.',
  },
]

const packages = [
  {
    name: 'ui-kit',
    icon: 'component-1',
    desc: 'Vue 3 components with BEM classes and three fills per control — soft, outlined, solid.',
    meta: ['29 components', '10 composables'],
  },
  {
    name: 'icons',
    icon: 'image',
    desc: 'An SVG icon set wired through the Vite plugin, ready to register with any namespace.',
    meta: ['337 glyphs'],
  },
  {
    name: 'theme',
    icon: 'color-wheel',
    desc: 'CSS tokens and a defineSheet DSL: oklch palettes, a dark twin, per-namespace themes.',
    meta: ['CSS only'],
  },
  {
    name: 'studio',
    icon: 'card-stack',
    desc: 'The docs framework: live examples, playgrounds and DocPage generated from component folders.',
    meta: ['live examples'],
  },
] as const

const hooks = [
  {
    name: 'useArrayModel',
    to: '/docs/hooks/use-array-model',
    desc: 'Single or multiple selection with value keys and disabled options.',
  },
  {
    name: 'useClickOutside',
    to: '/docs/hooks/use-click-outside',
    desc: 'Fire a callback on outside clicks — popovers, menus, dropdowns.',
  },
  { name: 'useClipboard', to: '/docs/hooks/use-clipboard', desc: 'Read and write the clipboard reactively.' },
  {
    name: 'useColorScheme',
    to: '/docs/hooks/use-color-scheme',
    desc: 'Light / dark / auto with system sync and persistence.',
  },
  {
    name: 'useFloating',
    to: '/docs/hooks/use-floating',
    desc: 'Anchor positioning for popups and floating surfaces.',
  },
  {
    name: 'useGlobalEvent',
    to: '/docs/hooks/use-global-event',
    desc: 'Typed window and document listeners with automatic cleanup.',
  },
  {
    name: 'useKeyboardNavigation',
    to: '/docs/hooks/use-keyboard-navigation',
    desc: 'Arrow-key navigation with boundary control for lists.',
  },
  {
    name: 'useTypeahead',
    to: '/docs/hooks/use-typeahead',
    desc: 'Type-ahead selection for listbox-style interfaces.',
  },
]

const rampTokens = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const rampKind = [
  'neutral',
  'neutral',
  'neutral',
  'neutral',
  'brand',
  'brand',
  'brand',
  'brand',
  'neutral',
  'neutral',
  'neutral',
]

const steps = [
  {
    title: 'Register a namespace',
    desc: 'Wire the kit into your app once — pick a namespace and bundle the icon set.',
    code: `import { createUiKit } from '@dotdev/ui-kit'
import { icons } from '@dotdev/icons'

export const uiKit = createUiKit({
  namespace: 'd',
  icons,
})`,
  },
  {
    title: 'Tune components globally',
    desc: 'Override defaults for every instance — sizes, colors, variants — in one place.',
    code: `createUiKit({
  components: {
    button: { color: 'primary', variant: 'soft' },
    input: { size: 'md' },
  },
})`,
  },
  {
    title: 'Add a second design system',
    desc: 'Create another namespace for a new section and adopt it step by step, without touching the old look.',
    code: `export const landingKit = createUiKit({
  namespace: 'landing',
})`,
  },
]

const galleryGroups = [
  { label: 'Buttons', to: '/docs/ui-kit/buttons' },
  { label: 'Fields', to: '/docs/ui-kit/form' },
  { label: 'Selection', to: '/docs/ui-kit/form/select-button' },
  { label: 'Status & data', to: '/docs/ui-kit/data' },
  { label: 'Navigation', to: '/docs/ui-kit/navigation' },
]

const city = ref('Berlin')
const tab = ref('Overview')
const page = ref(2)
const publicProfile = ref(true)
const notifications = ref(true)
const planA = ref(true)
const planB = ref(false)
const demoCheck = ref(true)
</script>

<template>
  <main class="landing">
    <section class="landing__hero">
      <div aria-hidden="true" class="landing__hero-glow" />
      <div aria-hidden="true" class="landing__hero-grid" />

      <div class="landing__hero-copy">
        <h1 class="landing__title">
          Vue 3 components,
          <span class="landing__title-muted">built to spec.</span>
        </h1>

        <p class="landing__subtitle">
          A clean, deeply themeable UI kit. BEM + Tailwind with no CSS-in-JS runtime, namespaced themes that coexist in
          one project — and every component documented with live examples.
        </p>

        <div class="landing__actions">
          <Button href="/docs/ui-kit" size="lg">Browse components</Button>
          <Button href="/docs/documentation/config" size="lg" variant="outlined">Get started</Button>
        </div>

        <p class="landing__meta">
          v0.1.0
          <span class="landing__meta-sep" />
          open source
          <span class="landing__meta-sep" />
          29 components
          <span class="landing__meta-sep" />
          337 icons
        </p>
      </div>

      <div class="landing__demo">
        <div class="landing__demo-bar">
          <span class="landing__demo-label">workbench · playground</span>
          <span class="landing__demo-version">v0.1.0</span>
        </div>

        <div class="landing__demo-stage">
          <div class="landing__demo-controls">
            <SelectButton v-model="pgVariant" :items="['soft', 'outlined', 'solid']" size="sm" />
            <SelectButton v-model="pgColor" :items="['primary', 'neutral', 'success', 'danger']" size="sm" />
            <SelectButton v-model="pgSize" :items="['sm', 'md', 'lg']" size="sm" />
          </div>

          <div class="landing__demo-output">
            <Button :color="pgColor" :size="pgSize" :variant="pgVariant" label="Deploy" />
            <Input :size="pgSize === 'lg' ? 'lg' : 'md'" placeholder="Project name" variant="soft" />
            <Switch v-model="demoSwitch" />
            <Tag :color="pgColor" label="live" />
          </div>

          <p class="landing__demo-hint">Real components, real props — flip the segments above.</p>
        </div>
      </div>
    </section>

    <section aria-label="Icon set preview" class="landing__marquee">
      <span class="landing__marquee-caption">the icon set</span>
      <div aria-hidden="true" class="landing__marquee-window">
        <div class="landing__marquee-track">
          <div v-for="half in 2" :key="half" class="landing__marquee-half">
            <span v-for="iconName in marqueeIcons" :key="`${half}-${iconName}`" class="landing__marquee-icon">
              <Icon :name="iconName" />
            </span>
          </div>
        </div>
      </div>
      <span class="landing__marquee-caption landing__marquee-caption--right">337 glyphs</span>
    </section>

    <section class="landing__section landing__ledger-section">
      <div class="landing__ledger-intro">
        <h2 class="landing__section-title">Built like a workbench</h2>
        <p class="landing__section-sub">
          Small visible surfaces, a single source of truth, no magic. Every claim below is something you can verify in
          the docs today.
        </p>
      </div>

      <div class="landing__ledger">
        <article v-for="strength in strengths" :key="strength.title" class="landing__ledger-row">
          <h3 class="landing__ledger-title">{{ strength.title }}</h3>
          <p class="landing__ledger-desc">{{ strength.desc }}</p>
        </article>
      </div>
    </section>

    <section class="landing__section">
      <div class="landing__section-head">
        <h2 class="landing__section-title">Two design systems. One project.</h2>
        <p class="landing__section-sub">
          Every kit instance gets its own namespace, its own tokens, its own scale. Same markup below, two registered
          kits — no iframes, no isolation tricks.
        </p>
      </div>

      <div class="landing__namespaces">
        <UiKitProvider namespace="d">
          <article class="landing__ns-pane">
            <header class="landing__ns-bar">
              <Tag is="code" label="namespace: 'd'" variant="outlined" />
              <span class="landing__ns-note">indigo workbench</span>
            </header>
            <div class="landing__ns-stage">
              <div class="landing__ns-row">
                <Button label="Deploy" />
                <Button label="Preview" variant="soft" />
              </div>
              <Input placeholder="Workspace name" variant="soft" />
              <div class="landing__ns-row">
                <Switch v-model="demoSwitch" />
                <Checkbox v-model="demoCheck" />
                <Tag color="primary" label="Production" />
                <Tag label="v0.1.0" variant="outlined" />
              </div>
            </div>
          </article>
        </UiKitProvider>

        <UiKitProvider namespace="landing">
          <article class="landing__ns-pane landing__ns-pane--violet">
            <header class="landing__ns-bar">
              <Tag is="code" label="namespace: 'landing'" variant="outlined" />
              <span class="landing__ns-note">violet landing</span>
            </header>
            <div class="landing__ns-stage">
              <div class="landing__ns-row">
                <Button label="Deploy" />
                <Button label="Preview" variant="soft" />
              </div>
              <Input placeholder="Workspace name" variant="soft" />
              <div class="landing__ns-row">
                <Switch v-model="demoSwitch" />
                <Checkbox v-model="demoCheck" />
                <Tag color="primary" label="Production" />
                <Tag label="v0.1.0" variant="outlined" />
              </div>
            </div>
          </article>
        </UiKitProvider>
      </div>

      <pre class="landing__ns-code">app.use(createUiKit([workbenchKit, violetKit]))</pre>
    </section>

    <section class="landing__section">
      <div class="landing__section-head">
        <h2 class="landing__section-title">Every control, alive</h2>
        <p class="landing__section-sub">
          These are the real components, rendered by the same kit you would install. Open any group to read its source,
          props and themes.
        </p>
      </div>

      <div class="landing__gallery">
        <article class="landing__gallery-group">
          <header class="landing__gallery-head">
            <h3 class="landing__gallery-label">{{ galleryGroups[0].label }}</h3>
            <RouterLink :to="galleryGroups[0].to" class="landing__gallery-link">Open docs</RouterLink>
          </header>
          <div class="landing__gallery-stage">
            <Button label="Save" />
            <Button label="Preview" variant="soft" />
            <Button label="Cancel" variant="outlined" />
            <Button label="Skip" variant="ghost" />
            <Button label="Dismiss" variant="text" />
            <IconButton aria-label="Archive" icon="archive" variant="soft" />
          </div>
        </article>

        <article class="landing__gallery-group">
          <header class="landing__gallery-head">
            <h3 class="landing__gallery-label">{{ galleryGroups[1].label }}</h3>
            <RouterLink :to="galleryGroups[1].to" class="landing__gallery-link">Open docs</RouterLink>
          </header>
          <div class="landing__gallery-stage landing__gallery-stage--fields">
            <Input placeholder="Email address" variant="outlined" />
            <Textarea placeholder="Message" />
            <Select v-model="city" :items="['Berlin', 'London', 'Paris', 'Tokyo']" placeholder="City" />
          </div>
        </article>

        <article class="landing__gallery-group">
          <header class="landing__gallery-head">
            <h3 class="landing__gallery-label">{{ galleryGroups[2].label }}</h3>
            <RouterLink :to="galleryGroups[2].to" class="landing__gallery-link">Open docs</RouterLink>
          </header>
          <div class="landing__gallery-stage">
            <label class="landing__gallery-field">
              <Checkbox v-model="notifications" />
              Notifications
            </label>
            <label class="landing__gallery-field">
              <Radio v-model="planA" />
              Weekly digest
            </label>
            <label class="landing__gallery-field">
              <Radio v-model="planB" />
              Monthly report
            </label>
            <label class="landing__gallery-field">
              <Switch v-model="publicProfile" />
              Public profile
            </label>
            <SelectButton v-model="tab" :items="['Day', 'Week', 'Month']" size="sm" />
          </div>
        </article>

        <article class="landing__gallery-group">
          <header class="landing__gallery-head">
            <h3 class="landing__gallery-label">{{ galleryGroups[3].label }}</h3>
            <RouterLink :to="galleryGroups[3].to" class="landing__gallery-link">Open docs</RouterLink>
          </header>
          <div class="landing__gallery-stage landing__gallery-stage--status">
            <div class="landing__ns-row">
              <Tag color="primary" label="Primary" />
              <Tag color="success" label="Passing" />
              <Tag color="warning" label="Beta" />
              <Tag color="danger" label="Legacy" />
              <Tag color="neutral" label="v0.1.0" variant="outlined" />
            </div>
            <div class="landing__ns-row">
              <Avatar label="AP" />
              <Avatar label="dk" square />
              <Progress :value="64" class="w-40" />
              <Skeleton class="w-24 h-4" />
            </div>
            <Message
              class="w-full max-w-sm"
              color="success"
              message="main@4f2c9e is live in production."
              title="Deployed"
            />
          </div>
        </article>

        <article class="landing__gallery-group">
          <header class="landing__gallery-head">
            <h3 class="landing__gallery-label">{{ galleryGroups[4].label }}</h3>
            <RouterLink :to="galleryGroups[4].to" class="landing__gallery-link">Open docs</RouterLink>
          </header>
          <div class="landing__gallery-stage landing__gallery-stage--nav">
            <Breadcrumbs :items="[{ label: 'Home' }, { label: 'Library' }, { label: 'Data' }]" />
            <Tabs v-model="tab" :options="['Overview', 'Specs', 'History']" />
            <Pagination v-model="page" :page-size="10" :total="120" />
          </div>
        </article>
      </div>
    </section>

    <section class="landing__section">
      <div class="landing__section-head">
        <h2 class="landing__section-title">Four packages, one system</h2>
        <p class="landing__section-sub">
          Everything ships together, but each package stays independent — install what you need.
        </p>
      </div>

      <div class="landing__packages">
        <article v-for="pkg in packages" :key="pkg.name" class="landing__package">
          <div class="landing__package-head">
            <span class="landing__package-icon">
              <Icon :name="pkg.icon" />
            </span>
            <span class="landing__package-name">@dotdev/{{ pkg.name }}</span>
          </div>
          <p class="landing__package-desc">{{ pkg.desc }}</p>
          <div class="landing__package-meta">
            <Tag v-for="chip in pkg.meta" :key="chip" :label="chip" color="primary" variant="soft" />
          </div>
        </article>
      </div>
    </section>

    <section class="landing__section">
      <div class="landing__section-head">
        <h2 class="landing__section-title">Composables that pull their weight</h2>
        <p class="landing__section-sub">
          The headless layer ships with the kit — selection models, floating positioning, keyboard navigation.
        </p>
      </div>

      <div class="landing__hooks">
        <RouterLink v-for="hook in hooks" :key="hook.name" :to="hook.to" class="landing__hook group">
          <code class="landing__hook-name">{{ hook.name }}</code>
          <span class="landing__hook-desc">{{ hook.desc }}</span>
          <Icon class="landing__hook-arrow" name="arrow-right" />
        </RouterLink>
      </div>
    </section>

    <section class="landing__section landing__theme">
      <div class="landing__theme-copy">
        <h2 class="landing__section-title">One ramp. Two worlds.</h2>
        <p class="landing__section-sub landing__section-sub--left">
          Tokens are plain CSS custom properties on an oklch ramp. Flip one class and every surface follows — no second
          stylesheet, no build step, no flash.
        </p>

        <div class="landing__ramp">
          <span
            v-for="(step, i) in rampTokens"
            :key="`${rampKind[i]}-${step}`"
            :class="`landing__ramp-swatch--${rampKind[i]}-${step}`"
            class="landing__ramp-swatch"
          />
        </div>
        <p class="landing__ramp-caption">oklch — cool greys with a violet undertone, indigo core at 400–700</p>
      </div>

      <div class="landing__twins">
        <div class="landing__twin landing__twin--light">
          <header class="landing__twin-bar">
            <span class="landing__twin-name">light</span>
          </header>
          <div class="landing__twin-stage">
            <Button label="Deploy" />
            <Input placeholder="Search" size="sm" variant="soft" />
            <div class="landing__ns-row">
              <Switch v-model="demoSwitch" />
              <Tag color="primary" label="Live" />
            </div>
          </div>
        </div>

        <div class="landing__twin landing__twin--dark">
          <header class="landing__twin-bar">
            <span class="landing__twin-name">dark</span>
          </header>
          <div class="landing__twin-stage">
            <Button label="Deploy" />
            <Input placeholder="Search" size="sm" variant="soft" />
            <div class="landing__ns-row">
              <Switch v-model="demoSwitch" />
              <Tag color="primary" label="Live" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="landing__section">
      <div class="landing__section-head">
        <h2 class="landing__section-title">From zero to your first namespace</h2>
        <p class="landing__section-sub">
          No scaffolding to learn, no generator to run — three small steps and components are yours.
        </p>
      </div>

      <ol class="landing__steps">
        <li v-for="(step, index) in steps" :key="step.title" class="landing__step">
          <p class="landing__step-index">{{ String(index + 1).padStart(2, '0') }}</p>
          <h3 class="landing__step-title">{{ step.title }}</h3>
          <p class="landing__step-desc">{{ step.desc }}</p>
          <pre class="landing__step-code">{{ step.code }}</pre>
        </li>
      </ol>
    </section>

    <section class="landing__cta">
      <h2 class="landing__cta-title">Start building on the workbench.</h2>
      <p class="landing__cta-sub">
        Pick a component, open the source, and make it yours. Everything is themeable, nothing is locked in.
      </p>

      <div class="landing__cta-actions">
        <Button href="/ui-kit" size="lg">Browse components</Button>
        <Button href="/docs/documentation/config" size="lg" variant="outlined">Read the docs</Button>
      </div>

      <p class="landing__cta-version">dotdev v0.1.0 — the precision workbench</p>
    </section>

    <footer class="landing__footer">
      <div class="landing__footer-grid">
        <div class="landing__footer-brand">
          <Logo />
          <p class="landing__footer-tagline">The precision workbench for Vue 3 teams.</p>
          <IconButton aria-label="GitHub repository" class="text-muted" icon="github-logo" />
        </div>

        <nav aria-label="Components" class="landing__footer-col">
          <p class="landing__footer-heading">Components</p>
          <RouterLink class="landing__footer-link" to="/docs/ui-kit/buttons">Buttons</RouterLink>
          <RouterLink class="landing__footer-link" to="/docs/ui-kit/form/input">Inputs</RouterLink>
          <RouterLink class="landing__footer-link" to="/docs/ui-kit/form/select">Selects</RouterLink>
          <RouterLink class="landing__footer-link" to="/docs/ui-kit/navigation/tabs">Tabs</RouterLink>
        </nav>

        <nav aria-label="Resources" class="landing__footer-col">
          <p class="landing__footer-heading">Resources</p>
          <RouterLink class="landing__footer-link" to="/docs/documentation">Documentation</RouterLink>
          <RouterLink class="landing__footer-link" to="/docs/documentation/config">Configuration</RouterLink>
          <RouterLink class="landing__footer-link" to="/docs/hooks">Hooks</RouterLink>
        </nav>
      </div>

      <div class="landing__footer-bottom">
        <span>dotdev v0.1.0</span>
        <span>docs built by studio</span>
      </div>
    </footer>
  </main>
</template>
