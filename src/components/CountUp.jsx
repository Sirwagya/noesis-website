import { useState, useEffect, useRef } from 'react'

/**
 * CountUp component - Animated number counting
 * Optimized with proper cleanup and memoization
 */
export function CountUp({ value, isVisible }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const rafId = useRef(null)
  const isActive = useRef(true)

  useEffect(() => {
    if (!isVisible || hasAnimated) return

    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0
    
    // Handle non-numeric values
    if (numericValue === 0 || !value.includes('₹')) {
      setCount(value)
      setHasAnimated(true)
      return
    }

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
  }, [isVisible, value, hasAnimated])

  return value.includes('₹') ? `₹${count.toLocaleString()}` : value
}
