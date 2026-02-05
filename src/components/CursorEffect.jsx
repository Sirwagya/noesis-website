import { useEffect, useState } from 'react'

/**
 * Custom Cursor Effect Component
 * Creates a custom cursor with glow effect and magnetic attraction
 */
export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only enable on desktop (not touch devices)
    if (window.matchMedia('(pointer: fine)').matches) {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      const handleMouseEnter = () => setIsHovering(true)
      const handleMouseLeave = () => setIsHovering(false)

      // Track hover on interactive elements
      const interactiveElements = document.querySelectorAll(
        'a, button, .competition-hero, .event-hero, .contact__link, .btn, .nav__link'
      )

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        interactiveElements.forEach((el) => {
          el.removeEventListener('mouseenter', handleMouseEnter)
          el.removeEventListener('mouseleave', handleMouseLeave)
        })
      }
    }
  }, [])

  // Don't render on touch devices
  if (!window.matchMedia('(pointer: fine)').matches) {
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
