# Showroom redesign — audit, implementation and limitations

## Recovery and audit

Checkpoint: `7035240`, branch `redesign/premium-showroom`. The checkpoint includes all pre-existing tracked and untracked work. Initial lint, TypeScript and production build passed.

The audit found a working hero entrance, reduced-motion media store, Lenis/ScrollTrigger integration, keyboard-aware mobile menu and photograph/mask calibration. It also found a disproportionate Color Studio workflow, unneeded Motion dependency, placeholder product/gallery gradients, inactive social links, fake contact values and unsupported claims about free consultation, tinting, warranties and customer counts.

## Implementation plan and result

1. Preserve the original project in Git; simplify the site around showroom discovery and contact.
2. Establish the static composition using ivory, burgundy, sage, terracotta, large serif headings, readable supporting copy, photographic product inspiration and alternating light/dark sections.
3. Retain/refine the coordinated hero entrance; add a registered photographic accent-wall reveal with reversible scroll progress, short desktop-only pin and manual comparison.
4. Add collection selection, an immersive native horizontal gallery, original Parth Paints typography, store narrative, genuine contact details and map.
5. Refine mobile stacking, focus indicators, menu focus trap/Escape/closed inert behavior, native touch scrolling and reduced-motion fallback. Lenis stops while the menu is open.
6. Validate build/lint/types, prerendered CSS exports, anchors, contact URLs, JSON-LD, asset registration and transformation exclusions.

## Removed / simplified

- Homepage Color Studio, favorites, six-shade selection workflow and duplicate catalogue interface.
- Cartoon SVG room, old roller prototype, unused shade records and animation factory file.
- Gradient-only collection/gallery placeholders and unsupported social links.
- Unverified business claims and fabricated contact information.
- Unused `motion` package. No packages added.
- Original Next favicon replaced with a Parth Paints lettermark.
- The old preview URL now redirects to the colour-story section, preserving bookmarks.

## Working features

- Full-viewport hero, editorial line reveals, image-mask expansion, subtle scroll parallax, magnetic collection CTA and animated scroll cue.
- Original/corrected photographic layers, reverseable clip reveal, coordinated titles, manual comparison, reduced-motion static composition and mobile unpinned behavior.
- Five manufacturer category discovery rows with image/detail selection and category-specific WhatsApp inquiries. Category descriptions are general discovery copy, not stock or performance guarantees.
- Three photo-led colour stories, illustrative palette swatches, native horizontal swipe/scroll, buttons and official Nerolac catalogue/visualizer links.
- Owner-provided primary and secondary phone, email, store location, map pin and daily 8 AM–8 PM hours.
- Sticky navigation with active section indication, accessible mobile menu, footer return-to-top, store JSON-LD and local metadata.

## Image provenance

Pexels licence: https://www.pexels.com/license/ (website use and modification permitted; endorsement is not implied). Original downloaded files are retained under `assets/source`, not exposed as production-page payloads.

| Asset | Source | Use |
| --- | --- | --- |
| `parth-interior.webp` | Existing original AI-generated architectural visualization; original PNG retained in `assets/source` | Aspirational hero/interior collection. Not a real store or completed project. |
| `neutral-room.webp` / `transformed-room.webp` | Viaceslav Kat, https://www.pexels.com/photo/interior-design-of-a-house-1571460/ | Real photograph; calibrated sage/burgundy edits restricted to the kitchen/dining and staircase-recess walls. Original crop is 1650 × 1200 at (750,270) from the 2400px source. |
| `soft-neutral.webp` | Pexels photo ID 1643383, https://www.pexels.com/photo/1643383/ | Neutral interior inspiration. |
| `deep-burgundy.webp` | Pexels photo ID 164595, https://www.pexels.com/photo/164595/ | Bedroom colour inspiration. |
| `exterior.webp` | Pexels photo ID 1396122, https://www.pexels.com/photo/1396122/ | Exterior category inspiration, not a local shop photograph. |
| `preparation.webp` | Tima Miroshnichenko, https://www.pexels.com/photo/man-painting-the-wall-6474471/ | Preparation category illustration; not Parth Paints personnel or an advertised painting service. |

Paint colours in the illustrative transformation and palettes are design colours, not claimed Nerolac shade matches. Source luminance and mask alpha retain photographed shadows and texture. Approved Nerolac logos and product packshots have not been copied.

## Verified business data

Parth Paints, opposite Nice Marble, Aspur, Dungarpur, Rajasthan. Phone +91 63772 23181 / +91 70732 90182. Email parthsevak97@gmail.com. Coordinates 23.952773, 74.083259. Hours confirmed by owner: every day 8 AM–8 PM. WhatsApp points to the first supplied phone number.

## Remaining real-world inputs

- Actual Parth Paints exterior/interior/store-team photography. The store identity panel uses original typography instead of a fabricated storefront.
- Approved Nerolac product photography/brand artwork, confirmed local stock and any specifically verified services.
- Any testimonials must be supplied and authorized; none were invented.
- Verified social profile URLs; none are shown currently.
- Real production origin via `NEXT_PUBLIC_SITE_URL`, for canonical/social absolute URLs.

## Verification limit

The connected browser host is unavailable. No desktop/mobile screenshots or interactive motion, map, call/WhatsApp handoff tests were completed. Source imagery and generated photographic layers can be inspected as local images, and build/HTTP/structural tests are performed separately. These checks do not prove frame rate, final responsive composition, external account availability or browser accessibility behavior.
## Final checks completed

- `npm run lint`: pass, no warnings.
- `npx tsc --noEmit`: pass.
- `npm run build`: pass; homepage prerendered successfully.
- Hero build regression checks: pass (scoped classes, visible static content, typography and font assets).
- Showroom structural checks: pass (all anchors, one h1, verified contact URLs and schema, no obsolete studio or fabricated data, registered image dimensions).
- Offline transformation generation checks: pass (masks match the photo and exclude protected furniture/floor/ceiling pixels).
- Local HTTP checks: homepage, both stylesheets, optimized hero, before/after photos, icon and social image all return 200. Former preview URL returns 307 to `/#room-explorer`.
- Browser capture/interaction testing: unavailable because the browser access host is disconnected. No performance score or visually verified desktop/mobile result is claimed.

Primary implementation files: `src/app/page.tsx`, `layout.tsx`, `globals.css`, `icon.svg`; `src/components/sections/{Hero,Transformation,Products,Gallery,WhyUs,Contact}.tsx` and their scoped styles; `src/components/layout/{Navbar,SmoothScroll,ShowroomMotion,Footer}.tsx`; `src/lib/{constants,showroom}.ts`; asset generation/structural test scripts; optimized showroom imagery. Full original work is preserved in checkpoint `7035240`.
## Composition refinement — final invitation

The hero, palette, verified business data and GSAP/Lenis foundation were retained. The oversized burgundy PP identity panel was removed and the store story rebuilt with a labelled inspiration photograph, a shorter narrative and two business facts. The previous burgundy contact block and oversized footer branding were merged into one full-screen-minimum invitation, followed by a compact practical footer. The map remains available through an expandable footer control.

The invitation has a scroll-linked warm-charcoal-to-burgundy transition, three upward-masked headline lines, a framed photographic expansion, restrained scroll-driven colour accents and a finishing oversized wordmark. No additional pinning or continuous floating loops were introduced. All actions remain visible and touch/keyboard accessible. Reduced-motion skips the scroll timelines.

Products now retain the previous photograph until a newly selected image has loaded, then crossfade through registered image layers. The gallery has intentional per-image crops, active-position status, disabled edge controls, direct pagination, arrow/Home/End key support, resize-aware position tracking and mobile-specific sizing. Native swipe remains intact.

New image: `public/images/showroom/closing-interior.webp`, an 87 KB portrait crop (0,0,680,1173) of Pexels photo ID 1571458, https://www.pexels.com/photo/1571458/, under the Pexels licence https://www.pexels.com/license/. It is labelled architectural inspiration and is not represented as the shop. The downloaded source is retained at `assets/source/ending-1571458.jpg`; the unused comparison candidate is `ending-1571459.jpg`.

Files changed in this refinement: `WhyUs.tsx`, `Contact.tsx`, `Products.tsx`, `Gallery.tsx`, `Footer.tsx`, `ShowroomMotion.tsx`, shared `showroom.module.css`, new scoped `closing.module.css`, the closing photograph/source, `scripts/check-showroom.mjs`, and this report. Hero and store constants were not changed.

Validation: lint, TypeScript and production build pass. Hero, showroom and ending structural checks pass. Source image inspected locally. Browser access host remains unavailable, so actual desktop/mobile screenshots, touch/keyboard interaction and animation timing still require manual visual review. No visual browser verification is claimed.
