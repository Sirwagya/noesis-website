import { useState, useEffect } from 'react'

/**
 * Scroll Progress Indicator Component
 * Shows scroll percentage at the top of the page
 */
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0
      
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => {
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
        className="scroll-progress__bar"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}
