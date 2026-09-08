# RETINA-XAI UI Specification

This document defines the reusable visual foundation for the RETINA-XAI clinical workstation. It is intentionally separate from page-specific layout decisions.

## Visual Direction

RETINA-XAI uses a dark, clinical interface built for repeated field-workstation use. The system favors clear hierarchy, quiet surfaces, precise spacing, subtle borders, and restrained cyan accents. Contrast and structure carry most of the visual weight; gradients, glow, decoration, and heavy shadows are not default treatments.

## Color System

Semantic CSS variables live in `src/index.css`:

- `--app-background`: near-black/navy application canvas.
- `--surface-elevated`: cards, panels, and raised controls.
- `--surface-secondary`: secondary surfaces and grouped controls.
- `--text-primary`: main readable content.
- `--text-secondary`: supporting copy and metadata.
- `--text-tertiary`: low-priority supporting text; use sparingly.
- `--border-subtle`: default structural border.
- `--border-strong`: focused or emphasized structural border.
- `--accent-primary`: restrained RETINA-XAI cyan accent.
- `--accent-hover`: interactive accent state.
- `--status-success`: successful or usable state.
- `--status-warning`: attention state.
- `--status-danger`: error or destructive state.
- `--status-neutral`: neutral status content.

Status must use text and/or an icon in addition to color.

## Typography

The existing Geist Variable font is retained as the project UI font. The semantic scale is available through theme values and utility classes:

- `type-display`: 2.75rem, tight display line-height, semibold.
- `type-page-title`: 1.875rem, 1.2 line-height, semibold.
- `type-section-title`: 1.25rem, 1.3 line-height, semibold.
- `type-body`: 0.9375rem, 1.6 line-height.
- `type-body-small`: 0.8125rem, 1.5 line-height.
- `type-metadata` / `type-label`: 0.6875rem with restrained tracking.

Page headings should be concise and scannable. Supporting text should use comfortable line-height rather than excessive weight or contrast.

## Spacing

Use the existing Tailwind spacing scale as the base. These semantic values identify common layout roles:

- `--spacing-page`: 1rem base page inset.
- `--spacing-section`: 1.5rem between related sections.
- `--spacing-card`: 1.25rem default panel padding.
- `--spacing-control`: 0.75rem between controls.
- `--spacing-navigation`: 0.5rem between navigation items.

Responsive layouts may increase page and section spacing at larger breakpoints, but the rhythm should remain predictable.

## Radius

Radii are restrained and purposeful:

- `--radius-sm-token`: 0.375rem for compact elements.
- `--radius-control-token`: 0.5rem for buttons, inputs, and controls.
- `--radius-card-token`: 0.75rem for cards and grouped panels.
- `--radius-surface-token`: 1rem for larger framed surfaces.

Do not apply large rounding to every element.

## Borders

Borders define hierarchy without becoming decoration. Use `--border-subtle` for default boundaries and `--border-strong` for focus or intentional emphasis. Avoid glowing borders and unnecessary nested card borders.

## Shadows

The system is primarily surface-and-border driven:

- `--shadow-subtle`: restrained separation for modest elevation.
- `--shadow-elevated`: reserved for dialogs or clearly raised surfaces.

Do not use shadows as a substitute for structural spacing or contrast.

## Motion

Motion values are available for later page polish:

- `--duration-fast`: 120ms for direct interaction feedback.
- `--duration-standard`: 220ms for standard transitions.
- `--duration-slow`: 360ms for deliberate emphasis.
- `--motion-ease` / `--ease-clinical`: restrained ease-out curve.

Existing pages are not animated by this foundation change. Future motion must respect `prefers-reduced-motion` and communicate state rather than decorate.

## Component Principles

### Buttons

- Primary actions use the accent and clear text.
- Secondary actions use a quiet outline or neutral surface.
- Ghost actions remain low emphasis while preserving a visible focus state.
- Destructive actions use danger semantics and explicit text.
- Important actions should provide approximately 44-48px touch targets.

### Inputs

- Labels remain visible and associated with their controls.
- Default controls use a quiet surface and subtle border.
- Focus uses the accent ring/border without excessive glow.
- Error state combines text and structural indication; never color alone.
- Disabled state reduces emphasis and prevents interaction.

### Status

Statuses use icon plus text whenever possible. Success, warning, attention, and neutral states must remain understandable without color perception.

### Cards and Surfaces

- Base cards group related content with a subtle border.
- Elevated cards are reserved for meaningful hierarchy.
- Interactive cards need an obvious hover/focus treatment.
- Avoid cards inside cards unless the inner item is a genuinely repeated record or framed tool.

## Responsive Principles

- Content must fit without horizontal scrolling at mobile widths.
- Controls remain comfortable to tap and keyboard-focus.
- Dense desktop lists should stack or become readable record blocks on mobile.
- Preserve information hierarchy when columns collapse.
- Keep navigation behavior predictable between sidebar and mobile navigation.

## Accessibility

- Preserve readable contrast for primary and supporting text.
- Keep visible keyboard focus states.
- Use semantic headings, labels, forms, lists, and status regions.
- Pair status colors with text or icons.
- Maintain touch targets around 44-48px for primary controls.
- Respect reduced-motion preferences.

## Scope

This foundation does not redesign any application screen, change routing, add features, or alter backend/session architecture. Page-specific polish should adopt these tokens incrementally in later phases.
