/**
 * Scroll configuration constants
 * Centralized configuration for sticky scroll behavior, thresholds, and performance settings
 */

export const SCROLL_CONFIG = {
  // Title transition thresholds
  TITLE_TRANSITION_START: 0.2, // 20% viewport from top
  TITLE_TRANSITION_END: 0.5,
  TITLE_MOVE_UP_THRESHOLD: 0.3, // Move title up when 30% of section remains
  
  // Active card detection
  ACTIVE_CARD_VISIBILITY_MIN: 0.3, // Minimum 30% visible to be considered active
  ACTIVE_CARD_HYSTERESIS: 0.5, // 50% visibility threshold to switch cards
  
  // Parallax factors
  PARALLAX_FACTOR: 0.1, // Card parallax multiplier
  BACKGROUND_PARALLAX: 0.05, // Background layer parallax
  HERO_BLOB_PARALLAX: 0.2, // Hero blob parallax
  HERO_GRID_PARALLAX: 0.12, // Hero grid parallax
  
  // Scroll velocity
  VELOCITY_HIGH_THRESHOLD: 500, // px/s - threshold for "high" velocity
  VELOCITY_SMOOTHING: 0.7, // EMA (Exponential Moving Average) factor for smoothing
  
  // Performance settings
  MEASUREMENT_CACHE_TTL: 100, // ms - cache DOM measurements for 100ms
  RAF_THROTTLE: 16, // ms - target 60fps (16.67ms per frame)
  MOBILE_CALCULATION_INTERVAL: 32, // ms - 30fps on mobile devices
  
  // Animation durations
  TITLE_TRANSITION_DURATION: 800, // ms
  CARD_TRANSITION_DURATION: 800, // ms
  
  // Nav bar
  NAV_SCROLL_THRESHOLD: 0.95, // Show nav when 95% through hero
  NAV_SCROLLED_THRESHOLD: 60, // px - nav scrolled state threshold
  
  // Hero section scroll thresholds
  HERO_SCROLL_PAST_THRESHOLD: 0.9, // Show competitions when scrolled past 90% of hero height
  HERO_SCROLL_NEAR_THRESHOLD: 0.8, // Hide competitions when near top (within 80% of hero height)
  PARALLAX_INTENSITY_REDUCTION: 0.5, // Reduce parallax intensity for smoother effect
}
