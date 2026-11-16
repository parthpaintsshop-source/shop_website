# Parth Paints — digital showroom

Existing Next.js 16.4.6 / React 19 / TypeScript / Tailwind 4 application, with GSAP and Lenis. The site advertises the physical Parth Paints store in Aspur, Dungarpur; it is not an online shop or a replica of Nerolac's catalogue.

## Develop and check

```sh
npm run dev
npm run lint
npx tsc --noEmit
npm run build
node scripts/check-hero-build.mjs
node scripts/check-showroom.mjs
npm run start
```

On Windows PowerShell with blocked npm.ps1, use `npm.cmd` / `npx.cmd`.

## Homepage

Hero → photographic paint transformation → collection browser → colour stories → store identity → contact/map → footer. The former `/color-studio-preview` URL redirects to `/#room-explorer`.

Business information lives in `src/lib/constants.ts`. Product category and inspiration content live in `src/lib/showroom.ts`. Contact details and daily 8 AM–8 PM hours were supplied by the owner on 16 November 2026. WhatsApp uses the first supplied number, 6377223181. No testimonials, experience statistics, free-service claims or stock guarantees are published.

Set `NEXT_PUBLIC_SITE_URL` to the real production origin before deployment. Canonical and absolute social-image URLs are enabled only when it is supplied. The 1200 × 630 social image is ready at `public/opengraph.jpg`; no production domain is invented.

## Motion and assets

- Hero uses separate entrance-mask, image-expansion and parallax wrappers.
- Transformation uses a registered before/after pair with paint restricted to two traced wall planes. Desktop pinning is limited to 65% of a viewport; mobile/short screens use unpinned scrolling. A manual comparison control is available.
- Collection images reveal and change with the selected category. The inspiration track uses native horizontal scroll, keyboard focus, swipe and previous/next controls.
- All essential text and images are visible in prerendered HTML. Reduced motion bypasses GSAP and magnetic movement.
- Sources and image-use limitations are documented in [docs/SHOWROOM-REDESIGN.md](docs/SHOWROOM-REDESIGN.md).
- Rebuild the photographic colour pair using `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/build-transformation.mjs` on Node 22.18+/24+. The helper runs mask registration and protected-surface checks before output.

## Local recovery

Branch: `redesign/premium-showroom`. Checkpoint `7035240` preserves the complete pre-redesign project. The former Color Studio, screenshots, source images and data can be recovered from that checkpoint. Current changes are left reviewable in the working tree.
