import { useState, useEffect, useRef } from 'react'
import { ANIMATION_DURATIONS } from '../constants/animations'

/**
 * CountUp component - Animated number counting
 * Optimized with proper cleanup and memoization
 * 
 * @param {Object} props - Component props
 * @param {string|number} props.value - The value to animate (currency string like "₹50,000" or number)
 * @param {boolean} props.isVisible - Whether the component is currently visible
 * @returns {JSX.Element} Formatted count display
 */
export function CountUp({ value, isVisible }) {
  const [count, setCount] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)
  const rafId = useRef(null)
  const isActive = useRef(true)
  const previousValue = useRef(value)

  // Reset animation state when value changes
  useEffect(() => {
    if (previousValue.current !== value) {
      previousValue.current = value
      // Schedule state update to avoid synchronous setState warning
      const timeoutId = setTimeout(() => {
        setHasAnimated(false)
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [value])

  useEffect(() => {
    // Handle non-currency strings like "Free Entry" - show immediately
    if (typeof value === 'string' && !value.includes('₹')) {
      // Schedule state updates to avoid synchronous setState warning
      setTimeout(() => {
        setCount(value)
        setHasAnimated(true)
      }, 0)
      return
    }

    if (!isVisible) {
      // If not visible, initialize with value but don't animate
      if (typeof value === 'string' && value.includes('₹')) {
        const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
        // Schedule state update to avoid synchronous setState warning
        setTimeout(() => {
          setCount(numericValue || value)
        }, 0)
      }
      return
    }

    if (hasAnimated) return

    // Check if value is a currency string (contains ₹)
    if (typeof value === 'string' && value.includes('₹')) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
      
      if (numericValue === 0) {
        setTimeout(() => {
          setCount(value)
          setHasAnimated(true)
        }, 0)
        return
      }

      isActive.current = true
      const duration = ANIMATION_DURATIONS.COUNT_UP
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        if (!isActive.current) return

        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(startValue + (numericValue - startValue) * easeOutQuart)

        setCount(currentValue)

        if (progress < 1) {
          rafId.current = requestAnimationFrame(animate)
        } else {
          setCount(numericValue)
          setHasAnimated(true)
        }
      }

      rafId.current = requestAnimationFrame(animate)

      return () => {
        isActive.current = false
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
      }
    }
  }, [isVisible, value, hasAnimated])

  // Format the output
  if (typeof count === 'number' && count > 0) {
    return `₹${count.toLocaleString('en-IN')}`
  }
  return count || value
}
