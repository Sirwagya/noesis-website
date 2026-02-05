import { useState, useEffect, useRef } from 'react'

/**
 * CountUp component - Animated number counting
 * Optimized with proper cleanup and memoization
 */
export function CountUp({ value, isVisible }) {
  const [count, setCount] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)
  const rafId = useRef(null)
  const isActive = useRef(true)
  const previousValue = useRef(value)

  useEffect(() => {
    // Reset animation state when value changes
    if (previousValue.current !== value) {
      setHasAnimated(false)
      previousValue.current = value
    }

    // Handle non-currency strings like "Free Entry" - show immediately
    if (typeof value === 'string' && !value.includes('₹')) {
      setCount(value)
      setHasAnimated(true)
      return
    }

    if (!isVisible) {
      // If not visible, initialize with value but don't animate
      if (typeof value === 'string' && value.includes('₹')) {
        const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
        setCount(numericValue || value)
      }
      return
    }

    if (hasAnimated) return

    // Check if value is a currency string (contains ₹)
    if (typeof value === 'string' && value.includes('₹')) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
      
      if (numericValue === 0) {
        setCount(value)
        setHasAnimated(true)
        return
      }

      isActive.current = true
      const duration = 2000
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
