---
name: Civic Health Editorial
colors:
  surface: '#eefdf3'
  surface-dim: '#ceded4'
  surface-bright: '#eefdf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#e8f7ed'
  surface-container: '#e2f2e8'
  surface-container-high: '#dcece2'
  surface-container-highest: '#d7e6dc'
  on-surface: '#111e18'
  on-surface-variant: '#3f4941'
  inverse-surface: '#26332d'
  inverse-on-surface: '#e5f4ea'
  outline: '#6f7a70'
  outline-variant: '#bec9be'
  surface-tint: '#006d40'
  primary: '#00653b'
  on-primary: '#ffffff'
  primary-container: '#1e7f4f'
  on-primary-container: '#d2ffde'
  inverse-primary: '#7ed9a1'
  secondary: '#00629d'
  on-secondary: '#ffffff'
  secondary-container: '#75bcfe'
  on-secondary-container: '#004a78'
  tertiary: '#006259'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d72'
  on-tertiary-container: '#c5fff5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9af6bb'
  primary-fixed-dim: '#7ed9a1'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#00522f'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#99cbff'
  on-secondary-fixed: '#001d33'
  on-secondary-fixed-variant: '#004a78'
  tertiary-fixed: '#7bf7e7'
  tertiary-fixed-dim: '#5bdacb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#eefdf3'
  on-background: '#111e18'
  surface-variant: '#d7e6dc'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: 4.25rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.625rem
    fontWeight: '600'
    lineHeight: 2.125rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
  title-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
  title-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '600'
    lineHeight: 1.5rem
  title-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-lg:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system serves frontline healthcare volunteers (kader posyandu) operating in community clinics across Kecamatan Kepanjen, Kabupaten Malang. The demographic spans intergenerational volunteers who require clarity under pressure, legible data capture, and reassurance during rapid record-keeping.

The design movement synthesizes **Material 3 Health** and modern **Civic SaaS**:
- **Trustworthy & Clinical Yet Warm:** Replaces intimidating clinical coldness with nurturing botanical greens and crisp medical accents.
- **Card-Centric Architecture:** Structured surface panels isolate dense health workflows, reducing cognitive fatigue during field screenings.
- **High Glanceability:** Explicit life-cycle chromatic coding, clear badge taxonomy, and generous 44px+ touch targets ensure zero-error data collection in outdoor or community center conditions.

## Colors

The palette balances administrative neutrality with distinct clinical categorizations.

### Core Architecture
- **Primary Health Green (`#1E7F4F`):** Core call-to-actions, positive confirmations, active state indicators.
- **Deep Forest Green (`#145A38`):** Persistent navigation, sidebar shell background, high-emphasis interactive headers.
- **Soft Green Tint (`#E6F4EC`):** Selected states, high-priority container highlights, interactive active backgrounds.
- **Medical Blue (`#2B7BB9`):** Information callouts, active hyperlinked text, submitted status metrics.
- **Teal (`#15AB9D`):** Analytical trends, secondary functional metrics, juvenile demographic badges.

### Neutrals & Surfaces
- **Canvas (`#F6F8F7`):** Calming, tinted neutral foundation reducing screen glare during outdoor operations.
- **Surface (`#FFFFFF`):** High-clarity elevated cards, forms, and overlays.
- **Border (`#D9E2DD`):** Subtle structural delimiters maintaining 1px crisp separation.
- **Text Primary (`#14211B`):** Deep green-tinged black delivering WCAG AAA contrast on white cards.
- **Text Secondary (`#4B5B53`):** Metadata, descriptive guides, and field hints.
- **Text Muted (`#8A9A92`):** Placeholder text, passive counter labels, disabled indicators.

### Life-Cycle Demographic Spectrum
Every demographic category must pair its assigned color with an identifiable icon and persistent text label to avoid color-only reliance:
1. **Ibu Hamil, Nifas & Menyusui:** Coral Pink (`#F17079`)
2. **Bayi, Balita & Apras:** Medical Powder Blue (`#4C94B3`)
3. **Usia Sekolah & Remaja:** Active Teal (`#15AB9D`)
4. **Usia Dewasa / Produktif:** Warm Amber (`#F6D44B`) — strictly enforced with dark text `#1F2937`.
5. **Usia Lanjut (Lansia):** Vibrant Orange (`#FBB03F`) — strictly enforced with dark text `#1F2937`.

### Operational Status Badges
- **Terverifikasi / Selesai:** Background `#DCFCE7`, Text `#166534`
- **Menunggu Pemeriksaan:** Background `#FEF3C7`, Text `#92400E`
- **Perlu Perbaikan:** Background `#FEE2E2`, Text `#991B1B`
- **Terkirim:** Background `#DBEAFE`, Text `#1D4ED8`
- **Dalam Proses:** Background `#E6F4EC`, Text `#145A38`
- **Draf:** Background `#F1F5F9`, Text `#475569`, Border `1px dashed #CBD5E1`
- **Belum Dimulai:** Background `transparent`, Text `#4B5B53`, Border `1px dashed #8A9A92`

## Typography

The type system is built on **Inter** to ensure maximum legibility at tiny scale, rapid data entry recognition, and clear numeric parsing for clinical records (weights, blood pressure, arm circumferences).

- **Tabular Figures Enabled:** All data grids, biometric metrics, and date/time inputs must render with OpenType `tnum` (Tabular Numbers) activated to prevent horizontal layout jank during screening lists.
- **Rhythmic Proportion:** The vertical scale preserves an accessible 1.4 to 1.5 ratio on descriptive blocks to prevent line-skipping errors for cadre reading instructions on small smartphones.
- **Strict Size Hierarchy:** Micro-copy below 11px (`label-sm`) is forbidden to preserve accessibility standards across aged screening devices.

## Layout & Spacing

The layout model adapts across three operational modes:

1. **Mobile Handheld (360px – 767px):** Single-column layout. Section margins are clamped to `margin-mobile` (16px), with component-to-component gaps of `space-md` (16px). All tap elements (buttons, inputs, status filters) adhere strictly to a **minimum touch height of 44px**.
2. **Tablet Clinic Floor (768px – 1023px):** 8-column responsive fluid grid with 16px gutters and 24px margins. Allows two-column form entries (e.g., patient identity side-by-side with vital measurements).
3. **Desktop Administrative Station (1024px+):** Fixed 12-column layout (max-width 1360px) framed by a persistent 260px administrative left rail (`#145A38`). Canvas margins expand to `margin` (32px) with `gutter` (24px) for data tables and aggregate statistical analytics.

## Elevation & Depth

Visual hierarchy is maintained through soft surface elevation and crisp boundary delineation instead of high-contrast borders or dark drop shadows:

- **Level 0 (Canvas Base):** Tinted neutral background (`#F6F8F7`), fully non-elevated.
- **Level 1 (Default Data Surface):** White background (`#FFFFFF`) framed by a subtle 1px border (`#D9E2DD`) and an ultra-diffused ambient shadow: `0px 1px 3px rgba(20, 33, 27, 0.05), 0px 4px 12px rgba(20, 33, 27, 0.03)`. Used for metric cards, patient records, and standard forms.
- **Level 2 (Interactive Floating / Hover):** Used for elevated cards during drag-and-drop or card hover: `0px 4px 6px rgba(20, 33, 27, 0.06), 0px 10px 24px rgba(20, 33, 27, 0.08)`.
- **Level 3 (Modals & Sheet Drawers):** Used for patient detail bottom sheets on mobile or center dialogue screens: `0px 12px 32px rgba(20, 33, 27, 0.12)`.

## Shapes

The design system enforces a **Level 2 (Rounded)** curvature profile across the ecosystem:

- **Standard Containers & Cards (`rounded`):** `0.5rem` (8px). Delivers a structured, clean feel to tables, input cards, and summary panels.
- **Medium Panels & Modals (`rounded-lg`):** `1rem` (16px). Used for mobile action drawers, flyout menus, and patient screening summary containers.
- **Badges, Chips & Action Buttons:** Full pill styling (`9999px` / `rounded-full`) to differentiate touchable interactive elements from rectangular content containers.

## Components

### Buttons
- **Primary Action:** Solid background `#1E7F4F`, white text, 48px height on mobile (40px desktop), horizontal padding `1.25rem`, radius `0.5rem`. Hover state transitions to `#145A38`.
- **Secondary Action:** Background `#E6F4EC`, text `#145A38`, zero border.
- **Neutral / Outlined:** 1px solid border `#D9E2DD`, background `#FFFFFF`, text `#14211B`.
- **Destructive:** Background `#FEE2E2`, text `#991B1B`. Hover state darkens text to `#7F1D1D`.

### Form Input Fields
- **Container:** Height 48px, background `#FFFFFF`, border `1px solid #D9E2DD`, radius `0.5rem`, horizontal padding `0.875rem`.
- **Focus State:** 2px ring `#1E7F4F` with an offset of 0px, border color `#1E7F4F`.
- **Helper & Validation Text:** Positioned 4px beneath the container using `label-md`. Errors render in `#991B1B` with an inline alert icon.

### Demographic Life-Cycle Chips
- Horizontal flex containers consisting of:
  - 8px circular demographic indicator or 16px demographic icon.
  - Text label rendered in `label-md` bold.
- Background uses 12% tint of the respective life-cycle hex, text renders in the solid primary hue (except Yellow and Orange which use `#1F2937`).

### Operational Status Badges
- Compact tags: Height 26px, padding `0.25rem 0.625rem`, pill-shaped (`9999px`).
- Always structured with a leading 6px colored dot or semantic status icon + text in `label-sm`.
- Draft tags feature an explicit `1px dashed #CBD5E1` outline.

### Patient Record Cards
- Background `#FFFFFF`, border `1px solid #D9E2DD`, elevation Level 1, internal padding `1rem`.
- Divided into three distinct zones:
  1. Top header: Life-cycle chip (left) + Status Badge (right).
  2. Main body: Patient Name (`title-md`), NIK / Parent details (`body-sm`, `#4B5B53`).
  3. Footer tray: Last checked timestamp, vital badge pills (e.g., "BB: 8.4 kg", "TB: 72 cm"), and direct screening trigger button.

### Biometric Quick-Counter
- Mobile-specific component for field screenings (stunting measurement, immunization check).
- Uses large high-contrast tabular numeric inputs flanked by 48px segmented step buttons (`-` and `+`) to accommodate single-hand field logging.