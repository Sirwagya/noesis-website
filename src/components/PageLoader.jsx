import { useState, useEffect } from 'react'

/**
 * Page Loader Component
 * Elegant loading screen with NOESIS logo and progress indicator
 */
export function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Fade out after loading completes
          setTimeout(() => {
            setIsVisible(false)
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    // Also check if page is actually loaded
    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className={`page-loader ${!isVisible ? 'page-loader--hidden' : ''}`}>
      <div className="page-loader__content">
        <div className="page-loader__logo">
          <img src="/noesis-logo.png" alt="NOESIS 2026" />
        </div>
        <div className="page-loader__progress">
          <div 
            className="page-loader__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="page-loader__text">
          Loading... <span className="page-loader__percentage">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
