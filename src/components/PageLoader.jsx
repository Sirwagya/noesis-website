import { useEffect, useMemo, useState } from 'react'
import { ANIMATION_DURATIONS } from '../constants/animations'

/**
 * Page Loader Component
 * Elegant loading screen with NOESIS logo and progress indicator
 * 
 * @returns {JSX.Element|null} Loader component or null when hidden
 */
export function PageLoader() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  const lines = useMemo(
    () => ['Altering reality…', 'Loading up the Simulation…', 'Entering'],
    [],
  )

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const minimumDuration = prefersReducedMotion ? 600 : 2600
    const start = performance.now()
    let loadResolved = false

    const handleLoad = () => {
      loadResolved = true
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    const tick = () => {
      const elapsed = performance.now() - start
      if (elapsed >= minimumDuration && loadResolved) {
        setIsFading(true)
        setTimeout(() => {
          setIsVisible(false)
        }, ANIMATION_DURATIONS.PAGE_LOADER_FADE)
        return
      }

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('load', handleLoad)
    }
  }, [isVisible, prefersReducedMotion])

  if (!isVisible) return null

  return (
    <div className={`page-loader ${isFading ? 'page-loader--hidden' : ''}`}>
      <div className="page-loader__content" aria-live="polite">
        <div className="page-loader__lines">
          {lines.map((line, index) => (
            <p
              key={line}
              className="page-loader__line"
              style={{ '--line-delay': `${index * 0.4}s` }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
