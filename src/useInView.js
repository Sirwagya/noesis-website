import { useEffect, useRef, useState } from 'react'

/**
 * Intersection Observer hook: returns ref and whether element is in view.
 * Use ref on the element and add class "in-view" when isInView is true for scroll reveals.
 * 
 * @param {Object} [options={}] - IntersectionObserver options
 * @param {number} [options.threshold=0.1] - Threshold for intersection (0 to 1)
 * @param {string} [options.rootMargin='0px 0px -50px 0px'] - Root margin for intersection calculation
 * @returns {Object} Hook return value
 * @returns {React.RefObject<HTMLElement>} returns.ref - Ref to attach to element
 * @returns {boolean} returns.isInView - Whether element is currently in view
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
