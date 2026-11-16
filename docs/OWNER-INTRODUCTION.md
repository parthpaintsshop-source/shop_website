# Owner introduction

`OwnerIntroduction.tsx` appears after the store story and before the final invitation. It uses the user-supplied `owner.jpeg`, copied unchanged from the project root to `public/images/owner.jpeg`. No facial edits or substitute image were used. Replace that public file with an approved portrait to update it.

The owner name, role and 10+ years of experience were supplied by the user. No additional biography or claims were added. The experience statement was moved from the store story to avoid repetition.

The portrait frame reserves a 3:4 aspect ratio. GSAP reveals are scoped and reverted on cleanup; desktop scroll parallax moves the photograph only 12px overall without rotation or distortion. Mobile omits parallax. Reduced-motion and no-JavaScript rendering show the complete static section. There is no looping animation or pinning.

Lint, TypeScript and production build passed. Desktop/mobile browser layout and animation require manual visual review.
