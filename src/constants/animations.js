/**
 * Animation constants
 * Centralized animation durations, delays, and timing functions
 */

export const ANIMATION_DURATIONS = {
  FAST: 200, // ms
  NORMAL: 400, // ms
  SLOW: 800, // ms
  COUNT_UP: 2000, // ms - CountUp animation duration
  PAGE_LOADER_FADE: 500, // ms - Page loader fade out delay
}

export const ANIMATION_DELAYS = {
  STAGGER_SHORT: 100, // ms
  STAGGER_MEDIUM: 200, // ms
  STAGGER_LONG: 300, // ms
}

export const ANIMATION_EASING = {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  EASE_OUT: 'cubic-bezier(0.0, 0, 0.2, 1)',
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
}
