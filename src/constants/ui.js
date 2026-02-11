/**
 * UI constants
 * Centralized UI-related constants (intervals, counts, thresholds, etc.)
 */

export const UI_CONSTANTS = {
  // Page Loader
  PAGE_LOADER_INTERVAL: 30, // ms - Progress update interval
  PAGE_LOADER_INCREMENT: 2, // Percentage increment per interval
  PAGE_LOADER_FADE_DELAY: 500, // ms - Delay before fade out

  // Particles
  PARTICLE_COUNT: 30, // Default particle count
  PARTICLE_COUNT_MOBILE: 15, // Reduced count for mobile devices
  PARTICLE_COUNT_LOW_END: 10, // Reduced count for low-end devices

  // Scroll Progress
  SCROLL_PROGRESS_UPDATE_THROTTLE: 16, // ms - RAF throttle (60fps)

  // Performance thresholds
  LOW_END_DEVICE_CORES: 4, // Consider device low-end if cores < 4
}
