import { defineComponent } from '@dotdev/design'

export const landing = defineComponent({
  ui: 'landing',
  layer: 'studio',
  semantics: {
    'bg-grid-dot': 'neutral-500/30',
    'bg-hero-glow': ['brand-100/60', 'brand-500/10'],
  },
  rules: {
    '.landing': `mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 lg:py-24`,

    /* Hero */
    '.landing__hero': `relative isolate grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center`,
    '.landing__hero-glow': `pointer-events-none absolute -inset-x-10 -top-28 -z-10 h-125 bg-[radial-gradient(55%_60%_at_35%_25%,var(--s-landing-bg-hero-glow),transparent_70%)]`,
    '.landing__hero-grid': `pointer-events-none absolute inset-x-0 -top-16 -z-10 h-110 mask-[linear-gradient(to_bottom,black,transparent)] bg-[radial-gradient(var(--s-landing-bg-grid-dot)_1px,transparent_1px)] bg-size-[22px_22px]`,
    '.landing__hero-copy': `flex flex-col items-start gap-6`,
    '.landing__title': `font-bold text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] text-balance`,
    '.landing__title-muted': `text-muted`,
    '.landing__subtitle': `max-w-xl text-lg text-muted text-balance`,
    '.landing__actions': `flex flex-wrap items-center gap-3`,
    '.landing__meta': `flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted`,
    '.landing__meta-sep': `size-1 rounded-full bg-neutral-400`,

    /* Playground window */
    '.landing__demo': `w-full rounded-2xl border border-default overflow-hidden bg-surface`,
    '.landing__demo-bar': `flex items-center justify-between border-b border-default bg-surface px-4 h-10`,
    '.landing__demo-label': `font-mono text-xs uppercase tracking-widest text-muted`,
    '.landing__demo-version': `font-mono text-xs text-muted`,
    '.landing__demo-stage': `flex flex-col gap-6 px-6 py-8`,
    '.landing__demo-controls': `flex flex-wrap items-center gap-3 pb-5 border-b border-dashed border-default`,
    '.landing__demo-output': `flex flex-wrap items-center gap-4`,
    '.landing__demo-hint': `font-mono text-xs text-muted`,

    /* Marquee */
    '.landing__marquee': `mt-16 flex items-center gap-5 border-y border-default py-3.5`,
    '.landing__marquee-caption': `shrink-0 font-mono text-xs uppercase tracking-widest text-muted`,
    '.landing__marquee-window': `relative flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]`,
    '.landing__marquee-track': `flex w-max animate-[landing-marquee_40s_linear_infinite]`,
    '.landing__marquee-half': `flex items-center gap-7 pr-7`,
    '.landing__marquee-icon': `text-xl text-neutral-400 transition-colors hover:text-brand`,

    /* Sections */
    '.landing__section': `mt-24 lg:mt-32`,
    '.landing__section-head': `flex flex-col items-center gap-3 text-center`,
    '.landing__section-title': `font-bold text-3xl sm:text-4xl tracking-tight text-balance`,
    '.landing__section-sub': `max-w-2xl text-muted text-balance`,

    /* Strengths ledger */
    '.landing__ledger-section': `lg:grid lg:grid-cols-[minmax(260px,1fr)_1.7fr] lg:gap-16`,
    '.landing__ledger-intro': `self-start flex flex-col items-start gap-3 lg:sticky lg:top-24`,
    '.landing__ledger': `mt-10 lg:mt-0 flex flex-col`,
    '.landing__ledger-row': `flex flex-col gap-2 py-6 border-b border-default lg:grid lg:grid-cols-[240px_1fr] lg:gap-8 lg:items-baseline`,
    '.landing__ledger-row:first-child': `pt-0`,
    '.landing__ledger-title': `font-semibold text-lg tracking-tight transition-colors`,
    '.landing__ledger-row:hover .landing__ledger-title': `text-brand`,
    '.landing__ledger-desc': `text-sm text-muted`,

    /* Namespace showcase */
    '.landing__namespaces': `mt-12 grid gap-5 lg:grid-cols-2`,
    '.landing__ns-pane': `rounded-xl border border-default overflow-hidden bg-surface`,
    '.landing__ns-bar': `flex items-center justify-between gap-3 border-b border-default px-4 h-11`,
    '.landing__ns-note': `font-mono text-xs text-muted`,
    '.landing__ns-stage': `flex flex-col gap-4 p-5`,
    '.landing__ns-row': `flex flex-wrap items-center gap-3`,
    '.landing__ns-code': `mt-6 mx-auto w-fit max-w-full overflow-x-auto rounded-lg border border-default bg-neutral-soft px-4 py-2.5 font-mono type-xs text-muted`,

    /* Component gallery */
    '.landing__gallery': `mt-12 flex flex-col gap-5`,
    '.landing__gallery-group': `rounded-xl border border-default overflow-hidden`,
    '.landing__gallery-head': `flex items-center justify-between gap-3 border-b border-default bg-surface px-4 h-11`,
    '.landing__gallery-label': `font-semibold text-sm`,
    '.landing__gallery-link': `font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-brand`,
    '.landing__gallery-stage': `flex flex-wrap items-center gap-4 p-5`,
    '.landing__gallery-stage--fields': `flex-col items-stretch gap-3`,
    '.landing__gallery-stage--fields > *': `w-full`,
    '.landing__gallery-field': `flex items-center gap-2.5 text-sm cursor-pointer w-fit`,
    '.landing__gallery-stage--status': `flex-col items-stretch gap-3.5`,
    '.landing__gallery-stage--nav': `flex-col items-start gap-4`,

    /* Packages */
    '.landing__packages': `grid gap-5 mt-12 sm:grid-cols-2`,
    '.landing__package': `flex flex-col gap-2.5 rounded-xl border border-default p-5 h-full transition-colors hover:border-neutral-300`,
    '.landing__package-head': `flex items-center gap-2.5`,
    '.landing__package-icon': `size-7.5 flex items-center justify-center rounded-lg border border-brand-soft bg-brand-soft text-brand text-base`,
    '.landing__package-name': `font-mono text-sm font-medium`,
    '.landing__package-desc': `text-sm text-muted`,
    '.landing__package-meta': `flex flex-wrap gap-1.5 mt-auto pt-2`,

    /* Hooks directory */
    '.landing__hooks': `mt-12 grid gap-x-12 sm:grid-cols-2`,
    '.landing__hook': `flex items-center gap-4 py-4 border-b border-default`,
    '.landing__hook-name': `font-mono text-sm font-medium shrink-0 transition-colors group-hover:text-brand`,
    '.landing__hook-desc': `text-sm text-muted min-w-0`,
    '.landing__hook-arrow': `ml-auto size-4 shrink-0 text-muted opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-brand`,

    /* Theme twins */
    '.landing__theme': `lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:items-center`,
    '.landing__theme-copy': `flex flex-col items-start gap-4`,
    '.landing__section-sub--left': `text-left max-w-md`,
    '.landing__ramp': `mt-4 flex w-full max-w-md overflow-hidden rounded-lg border border-default`,
    '.landing__ramp-swatch': `h-13 flex-1`,
    '.landing__ramp-caption': `mt-2.5 font-mono text-xs text-muted`,
    '.landing__ramp-swatch--neutral-50': `bg-(--s-neutral-50)`,
    '.landing__ramp-swatch--neutral-100': `bg-(--s-neutral-100)`,
    '.landing__ramp-swatch--neutral-200': `bg-(--s-neutral-200)`,
    '.landing__ramp-swatch--neutral-300': `bg-(--s-neutral-300)`,
    '.landing__ramp-swatch--brand-400': `bg-(--s-brand-400)`,
    '.landing__ramp-swatch--brand-500': `bg-(--s-brand-500)`,
    '.landing__ramp-swatch--brand-600': `bg-(--s-brand-600)`,
    '.landing__ramp-swatch--brand-700': `bg-(--s-brand-700)`,
    '.landing__ramp-swatch--neutral-800': `bg-(--s-neutral-800)`,
    '.landing__ramp-swatch--neutral-900': `bg-(--s-neutral-900)`,
    '.landing__ramp-swatch--neutral-950': `bg-(--s-neutral-950)`,

    '.landing__twins': `grid gap-4 mt-10 sm:grid-cols-2 lg:mt-0`,
    '.landing__twin': `rounded-xl border border-default overflow-hidden`,
    '.landing__twin-bar': `flex items-center px-4 h-9 border-b border-default bg-surface`,
    '.landing__twin-name': `font-mono text-xs uppercase tracking-widest text-muted`,
    '.landing__twin-stage': `flex flex-col items-start gap-3.5 p-4`,
    '.landing__twin--light':
      `[--s-bg-background:white] [--s-bg-surface:white] [--s-text-foreground:var(--s-neutral-900)] [--s-text-muted:var(--s-neutral-500)] [--s-border-default:var(--s-neutral-100)] [--s-text-placeholder:var(--s-neutral-400)] [--s-bg-brand:var(--s-brand-600)] [--s-bg-brand-hover:var(--s-brand-700)] [--s-text-brand:var(--s-brand-700)] [--s-text-on-brand:var(--s-neutral-50)] [--s-bg-brand-soft:var(--s-brand-50)] [--s-bg-brand-soft-hover:var(--s-brand-100)] [--s-bg-neutral-soft:var(--s-neutral-50)] [--s-bg-neutral-soft-hover:var(--s-neutral-100)] bg-white text-neutral-900`,
    '.landing__twin--dark':
      `[--s-bg-background:var(--s-neutral-950)] [--s-bg-surface:var(--s-neutral-950)] [--s-text-foreground:var(--s-neutral-100)] [--s-text-muted:var(--s-neutral-400)] [--s-border-default:var(--s-neutral-800)] [--s-text-placeholder:var(--s-neutral-600)] [--s-bg-brand:var(--s-brand-400)] [--s-bg-brand-hover:var(--s-brand-300)] [--s-text-brand:var(--s-brand-400)] [--s-text-on-brand:var(--s-neutral-950)] [--s-bg-brand-soft:color-mix(in_oklab,var(--s-brand-500)_16%,transparent)] [--s-bg-brand-soft-hover:color-mix(in_oklab,var(--s-brand-500)_26%,transparent)] [--s-bg-neutral-soft:color-mix(in_oklab,var(--s-neutral-500)_16%,transparent)] [--s-bg-neutral-soft-hover:color-mix(in_oklab,var(--s-neutral-500)_26%,transparent)] bg-neutral-950 text-neutral-100`,

    /* Getting started */
    '.landing__steps': `grid gap-8 mt-12 lg:grid-cols-3 lg:gap-6`,
    '.landing__step': `relative flex flex-col gap-3 border-t border-default pt-7`,
    '.landing__step-index': `absolute -top-3.5 left-0 size-7 flex items-center justify-center rounded-full border border-brand-soft bg-background text-brand font-mono text-xs`,
    '.landing__step-title': `font-semibold text-lg tracking-tight`,
    '.landing__step-desc': `text-sm text-muted`,
    '.landing__step-code': `rounded-lg border border-default bg-neutral-soft p-4 font-mono type-xs leading-relaxed overflow-x-auto`,

    /* CTA */
    '.landing__cta': `mt-28 flex flex-col items-center gap-4 text-center`,
    '.landing__cta-title': `font-bold text-3xl sm:text-5xl tracking-tight text-balance`,
    '.landing__cta-sub': `max-w-xl text-muted`,
    '.landing__cta-actions': `flex flex-wrap items-center justify-center gap-3`,
    '.landing__cta-version': `font-mono text-xs text-muted`,

    /* Footer */
    '.landing__footer': `mt-28 flex flex-col gap-10 border-t border-default pt-12 pb-4`,
    '.landing__footer-grid': `grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]`,
    '.landing__footer-brand': `flex flex-col items-start gap-3`,
    '.landing__footer-tagline': `max-w-xs text-sm text-muted`,
    '.landing__footer-col': `flex flex-col`,
    '.landing__footer-heading': `mb-3 font-mono text-xs uppercase tracking-widest text-muted`,
    '.landing__footer-link': `w-fit py-1 text-sm text-muted transition-colors hover:text-foreground`,
    '.landing__footer-bottom': `flex flex-wrap items-center justify-between gap-2 border-t border-default pt-6 font-mono text-xs text-muted`,
  },
})
