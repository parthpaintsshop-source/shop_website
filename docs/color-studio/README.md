# Colour Studio proof of concept

The photographic studio is now embedded on the homepage at `/#room-explorer`, replacing the illustrated RoomExplorer after user approval. The standalone `/color-studio-preview` route remains available. Embedded mode uses the existing navigation, an h2 heading and no duplicate page header.

## Photograph and mask

- Current real photograph: Viaceslav Kat, Pexels 1571460, https://www.pexels.com/photo/interior-design-of-a-house-1571460/
- Licence: https://www.pexels.com/license/ (website use and modification allowed; no endorsement implied).
- Current source retained at public/images/studio/architectural-source.jpg, downloaded at 2400 pixels wide. Working WebP is a 1650 ? 1200 crop from (750,270), quality 92.
- Current registered mask: public/images/studio/architectural-wall.svg. Its coordinates are traced against the 1600px reference photograph and transformed by matrix(1.5 0 0 1.5 -750 -270) to match the high-resolution crop.
- Two selectable surfaces: the recessed wall beneath the stairs (5.5% of the photograph) and the kitchen/dining plaster wall. Each has its own registered mask; clock, window, extractor hood, cabinets, ceiling, stair structure, sofa and floor are excluded. Only the currently selected wall is painted.
- The former sofa/white-wall crop is retained as an earlier proof asset but is no longer loaded. It was dominated by one nearly uniform wall, making recoloring resemble a full-background fill.
- Per-pixel source luminance is converted to linear RGB and normalized against a 0.55 neutral reference for the shaded recess. This retains its naturally dark upper edge and lighter lower surface. There is no full-photo tint or CSS background-color replacement.
- The photograph and both canvas layers share the exact same dimensions and coordinate system. Mask alpha is preserved; shade selection crossfades between canvas layers. Reduced-motion bypasses the crossfade.
- New photographs still require individually traced masks and calibrated lighting; arbitrary photos are not supported.

## Shade provenance

Six individual pages were read, not the complete catalogue. Each record in `src/lib/color-studio/shades.ts` includes its official URL and verification date. `source-verification.json` records the observed `field_shade_hex_code`, displayed code and structured-data SKU from those pages. Hex values are official website display samples, not measured physical paint reflectance. Filter families are editorial groupings, explicitly labelled in the UI.

The user confirmed on 2026-11-16 that no official shade data file or written reproduction permission is available. No permission to reproduce the full proprietary catalogue or Nerolac brand artwork has been obtained. A prominent external link opens the complete official Nerolac catalogue; only the six verified local shades can be previewed. Expansion requires an approved data feed or permission. No remote Nerolac API is called at runtime.

## Functional scope

- One real living room photograph, two paintable wall regions. No wall is painted until selected. Tap the wall or numbered target, use Tab/Enter on its button, or choose it from the dropdown. Outlines can be toggled off. Other room presets remain unavailable.
- Shade search, editorial family filtering, no-results state, selected details and official reference links.
- Favorites stored under `parth-paints:studio-favorites:v1`; guarded parsing, blocked-storage feedback, same-tab and cross-tab updates.
- Before, after and a keyboard/touch-accessible comparison range; split position does not rerender image pixels.
- Inquiry includes selected name, code, room and wall. Copy-to-clipboard plus selectable text fallback. Sending intentionally not connected: the homepage store number is a placeholder.
- Browser canvas loading and dimension validation, accessible status/error messages, original-photo fallback.

## Verification

Run `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/check-color-studio.mjs` on Node 22.18+/24+. It checks real asset dimensions, mask exclusions, alpha coverage, retained lighting variation, search/filter cases, favorites filtering, inquiry content and source hex/code consistency. It also generates Red Ranch and Healing Herbs rendered reviews in `output/color-studio/`.

The rendered pixel outputs were visually inspected as standalone images. This does not constitute browser, mobile layout, clipboard, persistence or interaction verification. Browser integration and physical colour matching still need review.
