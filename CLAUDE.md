# Portfolio Design Decisions

This document tracks the design decisions made for this portfolio website.

## Selected Design

### Color Scheme: **Bold Contrast**
- **Primary Accent**: `#fca311` (Vibrant Orange)
- **Dark Background**: `#14213d` (Dark Navy)
- **Black**: `#000000`
- **Text Colors**:
    - White: `#ffffff`
    - Light Gray: `#e5e5e5`
- **Vibe**: High contrast, modern, punchy

**Source**: Coolors palette - https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff

### Layout Style: **Minimal & Spacious**
- Lots of whitespace
- Large typography
- Subtle animations
- Grid-based project layouts
- Focus on readability and breathing room

### UI Feel: **Sharp & Geometric**
- **No rounded corners** - All elements use sharp edges (border-radius: 0)
- **Hard edges** - Clean, precise lines
- **Clean lines** - Geometric precision
- **Typography**: Uppercase headings, bold weights, tight letter-spacing
- **Borders**: Solid, defined borders with accent colors
- **Layout**: Grid-based with clear separation

## Design Rationale

### Why Bold Contrast?
- High visual impact without being overwhelming
- Orange provides energy and professionalism
- Dark navy gives sophistication and trust
- Black and white create strong hierarchy
- Stands out from typical blue/purple tech portfolios

### Why Minimal & Spacious?
- Lets the work speak for itself
- Professional and clean appearance
- Easy to navigate and scan
- Timeless approach that won't look dated
- Works well for software engineering portfolios

### Why Sharp & Geometric?
- Conveys precision and technical expertise
- Professional without being corporate
- Distinctive - avoids the "default Tailwind" look
- Clean aesthetic appropriate for a software engineer
- Geometric patterns suggest logical thinking

## Technical Stack

- **Framework**: Astro 5.14.6
- **Styling**: Tailwind CSS v4.1.14
- **Animations**: Motion 12.23.24
- **Deployment**: GitHub Pages (planned)

## Configuration Files

All personal information is centralized in `/src/config/`:

### `/src/config/me.ts`
```typescript
export const FIRST_NAME = "Diego";
export const LAST_NAME = "Barreiro Pérez";
export const FULL_NAME = `${FIRST_NAME} ${LAST_NAME}`;
export const ROLE = "Software Engineer";
```

### `/src/config/contact.ts`
```typescript
export const EMAIL_ADDRESS = "diego@barreiro.dev";
```

### `/src/config/social.ts`
```typescript
export const GITHUB_LINK = "https://github.com/barreeeiroo";
export const LINKEDIN_LINK = "https://linkedin.com/in/barreeeiroo";
export const INSTAGRAM_LINK = "https://www.instagram.com/barreeeiroo";
export const X_LINK = "https://x.com/barreeeiroo";
```

### `/src/config/index.ts`
Central export file that re-exports all configuration:
```typescript
export { FIRST_NAME, LAST_NAME, FULL_NAME, ROLE } from './name';
export { EMAIL_ADDRESS } from './contact';
export { GITHUB_LINK, LINKEDIN_LINK, INSTAGRAM_LINK, X_LINK } from './social';
```

**Usage:**
```astro
---
import { FULL_NAME, ROLE, EMAIL_ADDRESS, GITHUB_LINK } from '../config';
---
<title>{FULL_NAME} - {ROLE}</title>
<a href={`mailto:${EMAIL_ADDRESS}`}>Email</a>
<a href={GITHUB_LINK}>GitHub</a>
```

## Design System Configuration

All design tokens are configured in `/src/styles/global.css`:

### Color Tokens
- `--color-primary` - Main accent color (#fca311)
- `--color-navy` - Dark background (#14213d)
- `--color-black` / `--color-white` - Base colors
- `--color-gray-light` - Light text (#e5e5e5)

### Usage in Components

**With Tailwind Utilities:**
```html
<div class="bg-primary text-white">...</div>
<div class="bg-navy border-primary">...</div>
<button class="border-geometric shadow-sharp-primary">...</button>
```

**With Custom CSS Variables:**
```css
background-color: var(--color-primary);
border-color: var(--color-navy);
```

### Sharp & Geometric Defaults
- All border-radius values set to `0px` by default
- No rounded corners on any Tailwind utility (e.g., `rounded`, `rounded-lg` all render as sharp)
- Form elements (buttons, inputs) reset to sharp corners

### Custom Utilities
- `.bg-primary` / `.text-primary` - Primary orange color
- `.bg-navy` / `.text-navy` - Navy background/text
- `.border-primary` / `.border-navy` - Colored borders
- `.shadow-sharp` - Hard geometric shadow (4px offset)
- `.shadow-sharp-primary` - Geometric shadow with primary color
- `.border-geometric` - 2px solid primary border
- `.border-geometric-thick` - 4px solid primary border

## Reference Files

Design exploration pages created during the process:
- `/src/pages/colors.astro` - Color scheme comparisons
- `/src/pages/feels.astro` - UI feel variations
- `/src/pages/examples.astro` - Layout style examples
- `/src/pages/test.astro` - Tailwind CSS test page

## Next Steps

- [ ] Implement Sharp & Geometric feel with Bold Contrast colors
- [ ] Create component library based on selected design
- [ ] Design and build additional pages (About, Projects, Contact)
- [ ] Add real content and portfolio projects
- [ ] Optimize animations and interactions
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] Deploy to GitHub Pages

---

*Design decisions documented on 2025-10-20*
