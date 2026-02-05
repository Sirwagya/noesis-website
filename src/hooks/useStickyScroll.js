import { useState, useEffect, useRef, useCallback } from 'react'
import { calculateStickyScrollState } from '../utils/stickyScrollCalculator'
import { SCROLL_CONFIG } from '../constants/scrollConfig'

/**
 * Custom hook for managing sticky scroll behavior
 * Optimized with IntersectionObserver, cached measurements, and batched updates
 * 
 * @param {Object} params
 * @param {React.RefObject} params.sectionRef - Section element ref
 * @param {React.RefObject} params.listRef - List container ref
 * @returns {Object} Scroll state: { titlePosition, activeIndex, parallaxData, progress, cardPositions }
 */
export function useStickyScroll({ sectionRef, listRef }) {
  const [state, setState] = useState({
    titlePosition: 'left-middle',
    activeIndex: -1,
    parallaxData: {},
    progress: 0,
    cardPositions: {},
  })

  // Cache for DOM measurements
  const measurementCache = useRef({
    sectionRect: null,
    listRect: null,
    timestamp: 0,
  })

  // IntersectionObserver to only calculate when section is visible
  const isVisible = useRef(false)
  const observerRef = useRef(null)

  // RAF management
  const rafId = useRef(null)
  const isActive = useRef(true)

  // Invalidate cache helper
  const invalidateCache = useCallback(() => {
    measurementCache.current = {
      sectionRect: null,
      listRect: null,
      timestamp: 0,
    }
  }, [])

  // Calculate scroll state
  const updateScrollState = useCallback(() => {
    if (!isActive.current || !isVisible.current) return

    const now = Date.now()
    const cacheAge = now - measurementCache.current.timestamp
    const shouldRecalculate = 
      !measurementCache.current.sectionRect ||
      cacheAge > SCROLL_CONFIG.MEASUREMENT_CACHE_TTL

    if (shouldRecalculate && sectionRef.current && listRef.current) {
      // Batch DOM measurements
      measurementCache.current.sectionRect = sectionRef.current.getBoundingClientRect()
      measurementCache.current.listRect = listRef.current.getBoundingClientRect()
      measurementCache.current.timestamp = now
    }

    const scrollY = window.scrollY
    const viewportHeight = window.innerHeight

    const newState = calculateStickyScrollState({
      sectionRef: sectionRef.current,
      listRef: listRef.current,
      scrollY,
      viewportHeight,
    })

    setState(newState)
  }, [sectionRef, listRef])

  // Scroll handler with RAF throttling
  const handleScroll = useCallback(() => {
    if (!isActive.current || rafId.current) return

    rafId.current = requestAnimationFrame(() => {
      if (!isActive.current) return
      updateScrollState()
      rafId.current = null
    })
  }, [updateScrollState])

  // Setup IntersectionObserver
  useEffect(() => {
    if (!sectionRef.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
        if (entry.isIntersecting) {
          invalidateCache() // Recalculate when entering viewport
          updateScrollState()
        }
      },
      {
        threshold: 0,
        rootMargin: '50% 0px', // Start calculating when section is 50% away
      }
    )

    observerRef.current.observe(sectionRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sectionRef, invalidateCache, updateScrollState])

  // Setup scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', invalidateCache, { passive: true })

    // Initial calculation
    updateScrollState()

    return () => {
      isActive.current = false
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', invalidateCache)
    }
  }, [handleScroll, invalidateCache, updateScrollState])

  return state
}
