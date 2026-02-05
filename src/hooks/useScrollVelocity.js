import { useState, useEffect, useRef } from 'react'
import { SCROLL_CONFIG } from '../constants/scrollConfig'

/**
 * Custom hook for calculating scroll velocity with exponential moving average smoothing
 * Provides smooth velocity tracking for dynamic effects
 */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const smoothedVelocity = useRef(0)

  useEffect(() => {
    let rafId = null
    let isActive = true

    const handleScroll = () => {
      if (!isActive) return
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        if (!isActive) return

        const now = Date.now()
        const timeDelta = Math.max(now - lastScrollTime.current, 1) // Prevent division by zero
        const scrollY = window.scrollY
        const scrollDelta = scrollY - lastScrollY.current

        // Calculate raw velocity (pixels per second)
        const rawVelocity = Math.abs((scrollDelta / timeDelta) * 1000)

        // Apply exponential moving average for smoothing
        const smoothingFactor = SCROLL_CONFIG.VELOCITY_SMOOTHING
        smoothedVelocity.current = 
          smoothedVelocity.current * smoothingFactor + 
          rawVelocity * (1 - smoothingFactor)

        // Cap maximum velocity for stability
        const cappedVelocity = Math.min(smoothedVelocity.current, 2000)

        setVelocity(cappedVelocity)
        lastScrollY.current = scrollY
        lastScrollTime.current = now

        rafId = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      isActive = false
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return velocity
}
