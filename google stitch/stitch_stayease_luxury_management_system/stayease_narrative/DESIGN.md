---
name: StayEase Narrative
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#44474c'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4f6073'
  primary: '#041627'
  on-primary: '#ffffff'
  primary-container: '#1a2b3c'
  on-primary-container: '#8192a7'
  inverse-primary: '#b7c8de'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#151613'
  on-tertiary: '#ffffff'
  tertiary-container: '#292a27'
  on-tertiary-container: '#91918d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4fb'
  primary-fixed-dim: '#b7c8de'
  on-primary-fixed: '#0b1d2d'
  on-primary-fixed-variant: '#38485a'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e4e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1b1c19'
  on-tertiary-fixed-variant: '#474744'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is anchored in a **Modern Luxury** aesthetic, blending high-end editorial sophistication with seamless digital utility. It targets a discerning audience of luxury travelers and high-stakes hospitality managers who value efficiency wrapped in elegance.

The visual language balances **Minimalism** with **Tactile** refinement. Large areas of negative space (whitespace) are treated as a luxury commodity, allowing high-quality photography to breathe. The emotional response should be one of "effortless exclusivity"—calm, authoritative, and meticulously organized. Surfaces feel premium through the use of soft-light shadows and subtle color transitions rather than heavy textures.

## Colors

This design system utilizes a high-contrast, professional palette designed for readability and prestige.

- **Primary (#1A2B3C):** Deep Navy. Used for core brand elements, primary typography, and deep-state backgrounds. It provides the "anchor" for the professional dashboard and booking experience.
- **Secondary (#C5A059):** Muted Gold. Reserved for accents, calls to action (CTAs), and highlighting premium status. Use sparingly to maintain its impact.
- **Backgrounds:** The primary canvas is **#FFFFFF**, while **#F9F7F2 (Warm Cream)** is used for section containers and secondary backgrounds to add warmth and depth.
- **Neutrals:** Soft grays are used for borders (#E5E7EB) and secondary metadata (#6B7280).

## Typography

The typography strategy employs a classic "Serif for Display, Sans for Utility" pairing.

- **Headlines:** Playfair Display creates an immediate sense of heritage and luxury. Headlines should use tight letter-spacing and generous line-heights to maintain an editorial feel.
- **Body:** Inter provides maximum legibility for complex booking data and room descriptions. Its neutral, systematic nature ensures the UI feels modern and functional.
- **Labels:** Small labels and overlines should use Inter in bold uppercase with increased tracking (letter-spacing) to signify technical or categorized information.

## Layout & Spacing

The design system follows a **Fixed-Fluid hybrid grid**. Content is contained within a 1440px max-width container on desktop, centered with generous 64px margins to emphasize spaciousness.

- **Desktop (12 columns):** 24px gutters. Elements should span columns to create asymmetrical, editorial layouts.
- **Tablet (8 columns):** 16px gutters, 32px margins.
- **Mobile (4 columns):** 16px gutters, 20px margins.

Spacing follows an 8px base unit. For luxury appeal, favor larger padding values (e.g., 48px, 64px, or 80px) between sections to prevent the UI from feeling "cramped" or "budget."

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Ambient Shadows**.

- **Level 0:** Main canvas (#FFFFFF or #F9F7F2).
- **Level 1 (Cards/Modules):** White surfaces with an extremely soft, diffused shadow: `0px 4px 20px rgba(26, 43, 60, 0.05)`. This creates a lifted effect without looking "heavy."
- **Level 2 (Dropdowns/Modals):** High-elevation surfaces with a more pronounced shadow: `0px 12px 40px rgba(26, 43, 60, 0.12)`.
- **Interaction:** Use subtle 1px borders in #E5E7EB for low-elevation containers (like input fields) instead of shadows to keep the interface clean and structured.

## Shapes

The shape language is sophisticated and approachable. All primary UI containers, including room cards and search modules, use a **16px (rounded-lg)** corner radius. 

- **Buttons:** Use a 4px (soft) radius for a more professional, "tailored" look, or a full pill-shape for specific "Book Now" actions.
- **Inputs:** Match the 8px default roundedness.
- **Imagery:** Photography should always feature 16px corners when used in card format, but remain sharp (0px) when used as full-bleed hero backgrounds.

## Components

- **Primary Buttons:** Solid #C5A059 background with white text. High-contrast, no border. Subtle scale-up on hover.
- **Secondary Buttons:** Transparent background with a 1px #1A2B3C border. Professional and understated.
- **Search Modules:** Large, horizontal bar with internal dividers. Use #F9F7F2 for the internal background to distinguish the tool from the page content.
- **Room Cards:** 16px rounded corners, full-width image at the top, followed by Playfair Display titles and Inter body text. Use "Gold" for price points.
- **Data Dashboards:** Use clean white cards on a #F9F7F2 background. Data visualizations should use the Navy and Gold colors primarily, with muted grays for axes.
- **Navigation:** A minimal top-bar with a centered or left-aligned logo. Use a "Gold" underline for active states.