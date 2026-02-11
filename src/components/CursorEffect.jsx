import { useEffect, useState } from 'react'

/**
 * Custom Cursor Effect Component
 * Creates a custom cursor with glow effect and magnetic attraction
 * Only renders on desktop devices (pointer: fine)
 * 
 * @returns {JSX.Element|null} Cursor elements or null on touch devices
 */
export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  // Initialize with media query check
  const [isPointerFine] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  })

  useEffect(() => {
    // Only enable on desktop (not touch devices)
    if (!isPointerFine) return

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Use event delegation on document level to handle dynamically added elements
    const handleDocumentMouseEnter = (e) => {
      const target = e.target
      if (
        target.matches('a, button, .competition-hero, .event-hero, .contact__link, .btn, .nav__link') ||
        target.closest('a, button, .competition-hero, .event-hero, .contact__link, .btn, .nav__link')
      ) {
        setIsHovering(true)
      }
    }

    const handleDocumentMouseLeave = (e) => {
      const target = e.target
      if (
        target.matches('a, button, .competition-hero, .event-hero, .contact__link, .btn, .nav__link') ||
        target.closest('a, button, .competition-hero, .event-hero, .contact__link, .btn, .nav__link')
      ) {
        setIsHovering(false)
      }
    }

      window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleDocumentMouseEnter, true)
    document.addEventListener('mouseleave', handleDocumentMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleDocumentMouseEnter, true)
      document.removeEventListener('mouseleave', handleDocumentMouseLeave, true)
    }
  }, [isPointerFine])

  // Don't render on touch devices
  if (!isPointerFine) {
    return null
  }

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      <div
        className={`custom-cursor-trail ${isHovering ? 'cursor-hover' : ''}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
    </>
  )
}
