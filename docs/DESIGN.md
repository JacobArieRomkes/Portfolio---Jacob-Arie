---
name: Vivid Minimalist Portfolio
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#486554'
  on-secondary: '#ffffff'
  secondary-container: '#caead6'
  on-secondary-container: '#4e6b5a'
  tertiary: '#55615a'
  on-tertiary: '#ffffff'
  tertiary-container: '#a2afa7'
  on-tertiary-container: '#37433c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#caead6'
  secondary-fixed-dim: '#afceba'
  on-secondary-fixed: '#042014'
  on-secondary-fixed-variant: '#314d3e'
  tertiary-fixed: '#d9e6dd'
  tertiary-fixed-dim: '#bdcac1'
  on-tertiary-fixed: '#131e19'
  on-tertiary-fixed-variant: '#3e4943'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-xl:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  section-gap: 80px
  container-max: 1200px
---

## Brand & Style
The design system focuses on a clean, professional, and optimistic identity tailored for a UX Designer’s portfolio. It balances technical precision with an approachable, human-centered feel. 

The aesthetic is **Modern Corporate Minimalism** with **Tactile** influences. It utilizes significant white space (while remaining compact in component layout) to let project case studies take center stage. Key characteristics include high-quality typography, a refreshing nature-inspired color palette, and subtle depth through soft shadows and layered surfaces. The goal is to evoke a sense of reliability, growth, and meticulous attention to detail.

## Colors
The palette is built around a vibrant Emerald Green, symbolizing growth and fresh perspectives. 

- **Primary (#22C55E):** Used for actionable items, key brand highlights, and emphasis in headlines.
- **Secondary (#DCFCE7):** A soft mint used for subtle backgrounds in chips, secondary buttons, or decorative elements.
- **Tertiary (#F0FDF4):** The lightest tint of green, used for container backgrounds and section dividers to provide subtle visual separation.
- **Neutral (#111827):** A deep charcoal for primary text to ensure maximum readability and professional contrast against light backgrounds.
- **Background/Surface:** A combination of pure white (#FFFFFF) for cards and nearly-white grey (#F9FAFB) for the main body background to create "paper-on-table" depth.

## Typography
The system uses a pairing of **Sora** and **Inter**. 

Sora is utilized for headlines to provide a modern, geometric, and distinct character. Its high x-height makes it excellent for bold statements. Inter is used for all body text and UI labels due to its exceptional legibility and neutral, professional tone.

Maintain a strict vertical rhythm by sticking to the defined line heights. Use `label-sm` for overlines and category tags to establish clear information hierarchy before the reader reaches the main headline.

## Layout & Spacing
The design utilizes a **Fixed Grid** approach for desktop, centering content within a 1200px container. 

- **Grid:** 12-column grid with 24px gutters.
- **Density:** To avoid excessive whitespace while maintaining an "airy" feel, use compact internal padding for cards (24px) but generous margins between distinct sections (80px).
- **Mobile Adaption:** On mobile devices, the 12-column grid collapses to a single column with 16px side margins. Large hero headlines scale down to `headline-xl-mobile`.
- **Rhythm:** All spacing should be multiples of the 4px base unit to ensure visual consistency.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Ambient Shadows**.

- **Level 0 (Background):** #F9FAFB. The canvas.
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)).
- **Level 2 (Interactive/Floating):** Use a slightly more pronounced shadow (0px 10px 30px rgba(0, 0, 0, 0.08)) for elements that are actively being hovered or for primary CTAs.
- **Image Treatment:** Images and mockups should use soft rounded corners and subtle shadows to appear as if they are resting on the page.

## Shapes
The shape language is **Rounded** and friendly, avoiding sharp clinical edges.

- **Standard Radius:** 0.5rem (8px) for buttons and small input fields.
- **Large Radius (rounded-lg):** 1rem (16px) for cards and project thumbnails.
- **Extra Large Radius (rounded-xl):** 1.5rem (24px) for main section containers or large hero image wrappers.
- **Pill Shape:** Used exclusively for chips, tags, and specific navigation elements to denote category or status.

## Components

### Buttons
- **Primary:** Solid #22C55E background with white text. High-contrast, rounded-md (8px). On hover, darken slightly.
- **Secondary/Outlined:** 1.5px border of #22C55E with #22C55E text. Transparent background.
- **Ghost:** No border or background, green text, used for "Learn More" links with a trailing arrow icon.

### Chips & Tags
- Used for project categories (e.g., "UI Design", "UX Research").
- Background: #DCFCE7 (Secondary Color).
- Text: #166534 (Darker green for accessibility).
- Shape: Full pill (999px radius).

### Cards
- White background, 16px border-radius, soft ambient shadow.
- Content within cards should have a 24px internal padding.
- For "Case Study" cards, the image should occupy the top half with a clean bleed or a subtle inset.

### Input Fields
- Background: #F3F4F6 (Light grey) or #FFFFFF with a 1px #E5E7EB border.
- Border-radius: 8px.
- Focus state: 2px solid #22C55E border.

### Progress Indicators (Process Steps)
- Use thin green lines to connect circular step indicators.
- Active steps use a solid green fill; inactive steps use a light green stroke.