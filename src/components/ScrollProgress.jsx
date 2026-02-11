import { useState, useEffect, useRef } from 'react'

/**
 * Scroll Progress Indicator Component
 * Shows scroll percentage at the top of the page
 * Optimized with RAF throttling and CSS transforms for smooth performance
 * 
 * @returns {JSX.Element} Scroll progress bar component
 */
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafId = useRef(null)
  const isActive = useRef(true)
  const lastUpdateTime = useRef(0)
  const barRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!isActive.current) return

      const now = performance.now()
      // Throttle to ~60fps (16ms between updates)
      if (now - lastUpdateTime.current < 16) return

      if (rafId.current) return

      rafId.current = requestAnimationFrame(() => {
        if (!isActive.current) return

        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const scrollableHeight = documentHeight - windowHeight
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
        
        // Use CSS transform for better performance instead of width
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${Math.min(progress, 100) / 100})`
          barRef.current.style.transformOrigin = 'left'
        }
        
        setScrollProgress(Math.min(progress, 100))
        lastUpdateTime.current = now
        rafId.current = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
      isActive.current = false
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div 
      className="scroll-progress" 
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Scroll progress"
    >
      <div 
        ref={barRef}
        className="scroll-progress__bar"
        style={{ width: '100%' }}
      />
    </div>
  )
}
