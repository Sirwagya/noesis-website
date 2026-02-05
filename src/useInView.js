import { useEffect, useRef, useState } from 'react'

/**
 * Intersection Observer hook: returns ref and whether element is in view.
 * Use ref on the element and add class "in-view" when isInView is true for scroll reveals.
 */
export function useInView(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    
    return () => {
      observer.disconnect() // Proper cleanup
    }
  }, [threshold, rootMargin])

  return { ref, isInView }
}
