/**
 * Accessibility utility for respecting prefers-reduced-motion
 * WCAG 2.1 Level A - Animation from Interactions (2.3.3)
 */

import { animate, type AnimationOptions } from 'motion';

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate with respect to motion preferences
 * If user prefers reduced motion, animation is instant (0.01ms)
 */
export function accessibleAnimate(
  target: any,
  keyframes: any,
  options?: AnimationOptions
) {
  if (prefersReducedMotion()) {
    // Make animation nearly instant
    return animate(target, keyframes, {
      ...options,
      duration: 0.01,
    });
  }

  return animate(target, keyframes, options);
}

/**
 * Get animation duration based on motion preferences
 */
export function getAnimationDuration(defaultDuration: number): number {
  return prefersReducedMotion() ? 0.01 : defaultDuration;
}

/**
 * Get animation delay based on motion preferences
 */
export function getAnimationDelay(defaultDelay: number): number {
  return prefersReducedMotion() ? 0 : defaultDelay;
}
