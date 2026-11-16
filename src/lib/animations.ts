import gsap from 'gsap';

// Default ease curves
export const EASE = {
  smooth: 'power3.out',
  smoothInOut: 'power3.inOut',
  snap: 'power4.out',
  bounce: 'back.out(1.2)',
  expo: 'expo.out',
} as const;

// Standard durations
export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  xslow: 1.8,
} as const;

// Reusable animation configs for ScrollTrigger
export const scrollRevealConfig = {
  start: 'top 85%',
  end: 'top 20%',
  toggleActions: 'play none none none',
} as const;

// Text reveal animation factory
export function createTextReveal(
  elements: gsap.TweenTarget,
  options?: { delay?: number; stagger?: number; y?: number }
) {
  const { delay = 0, stagger = 0.05, y = 60 } = options ?? {};
  return gsap.fromTo(
    elements,
    { y, opacity: 0, rotateX: 15 },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: DURATION.normal,
      ease: EASE.smooth,
      stagger,
      delay,
    }
  );
}

// Image reveal animation factory
export function createImageReveal(
  element: gsap.TweenTarget,
  options?: { delay?: number; scale?: number }
) {
  const { delay = 0, scale = 1.15 } = options ?? {};
  return gsap.fromTo(
    element,
    { scale, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: DURATION.slow,
      ease: EASE.smoothInOut,
      delay,
    }
  );
}

// Fade up animation
export function createFadeUp(
  element: gsap.TweenTarget,
  options?: { delay?: number; y?: number }
) {
  const { delay = 0, y = 40 } = options ?? {};
  return gsap.fromTo(
    element,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: DURATION.normal,
      ease: EASE.smooth,
      delay,
    }
  );
}
