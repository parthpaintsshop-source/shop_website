'use client';
import { useMediaQuery } from './useMediaQuery';

export function useReducedMotion(): boolean {
  // Use the static fallback until the browser preference is known.
  return useMediaQuery('(prefers-reduced-motion: reduce)', true);
}
