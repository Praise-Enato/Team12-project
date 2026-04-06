# Handcrafted Haven Design Direction

## Design Goal

Create a marketplace that feels warm, crafted, trustworthy, and premium without looking overly rustic or outdated. The interface should communicate handmade quality, support product discovery, and keep the buying path simple.

## Brand Theme

Theme name: Warm Modern Atelier

Brand attributes:

- Handcrafted
- Welcoming
- Sustainable
- Trustworthy
- Curated

## Color System

Primary palette:

- `Clay` `#A35A3A`: primary buttons, links, active states
- `Forest` `#355C4D`: secondary actions, trust accents, badges
- `Cream` `#F6F0E8`: page background
- `Walnut` `#4A3428`: main headings and dark surfaces
- `Sand` `#DCC7AA`: borders, soft backgrounds, filter chips

Support colors:

- `Gold` `#C58B45`: ratings, highlights, featured product markers
- `Mist` `#E9E4DD`: card backgrounds and section contrast
- `Charcoal` `#2F2A26`: body text
- `Error` `#B53A2D`
- `Success` `#2F6A4F`

Usage rules:

- Use `Cream` as the main page canvas to keep the site bright and product-focused.
- Reserve `Clay` for primary calls to action so the purchase path stays obvious.
- Use `Forest` for seller trust signals, profile accents, and navigation highlights.
- Keep text mostly `Charcoal` or `Walnut` for strong contrast.
- Use `Gold` sparingly for rating stars and promotional emphasis.

## Typography

Recommended font pair:

- Headings: `Cormorant Garamond`, serif
- Body/UI: `Manrope`, sans-serif

Typography intent:

- `Cormorant Garamond` gives the brand an editorial, artisan-market feel.
- `Manrope` keeps forms, navigation, and product metadata clean and modern.

Suggested scale:

- H1: 48 to 56px, semi-bold
- H2: 36 to 40px, semi-bold
- H3: 28 to 32px, medium
- Body large: 18px
- Body default: 16px
- Caption/meta: 14px

Rules:

- Keep heading line-length short for impact.
- Avoid all-caps for long labels; use sentence case or title case.
- Maintain at least 1.5 line-height for body content and reviews.

## Layout Direction

Global structure:

- Sticky header with logo, search, categories, seller CTA, and account/cart actions
- Wide content container on desktop with generous white space
- Single-column stacking on mobile with persistent search and simplified filters

Homepage sections:

1. Hero with brand statement, featured handmade items, and primary CTA
2. Featured categories with image tiles
3. Spotlight artisans with short bios
4. Trending or newest products grid
5. Social proof section with reviews and ratings
6. Seller invitation banner
7. Footer with support, policy, and community links

Marketplace layout:

- Left filter rail on desktop
- Collapsible filter drawer on mobile
- Product grid with strong photography and clean metadata

Product page layout:

- Image gallery first
- Product summary with price, materials, shipping note, and seller info
- Review block below the fold
- Related products section near the bottom

Seller profile layout:

- Seller avatar and story at the top
- Trust indicators such as rating, response time, and total sales
- Product collection grid underneath

## UI Elements

Core components:

- Rounded-rectangle buttons with medium radius
- Product cards with soft borders and subtle shadow
- Category chips and filter pills
- Review stars in `Gold`
- Seller badges for local, eco-friendly, or custom-order options
- Form fields with visible focus rings and clear helper text

Visual accents:

- Soft paper-texture backgrounds in selected sections
- Thin hand-drawn style dividers or botanical line icons
- Natural product photography with warm lighting

Motion:

- Gentle fade-up reveals on section load
- Quick hover lift on cards
- No excessive animation on checkout or forms

## Accessibility Requirements

- Meet WCAG 2.1 Level AA color contrast
- Provide visible focus states for all interactive elements
- Support keyboard navigation for filters, menus, reviews, and forms
- Avoid conveying meaning through color alone
- Use clear labels for seller actions, ratings, and image uploads

## Tailwind or CSS Strategy

Recommended implementation approach:

- Use Tailwind CSS with custom theme tokens for color, spacing, border radius, and typography.
- Store brand tokens as CSS variables so the visual system stays portable if the team later changes frameworks.

Suggested token names:

- `--color-bg`
- `--color-surface`
- `--color-primary`
- `--color-secondary`
- `--color-text`
- `--color-accent`

## Initial Design Decisions

- Use a light theme first; avoid dark mode until the core shopping experience is stable.
- Prioritize product photography and seller stories over decorative graphics.
- Keep navigation shallow so users can browse within one or two clicks from the homepage.
- Favor calm, earthy tones over bright marketplace colors to reinforce handmade quality.
