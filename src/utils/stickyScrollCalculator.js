import { SCROLL_CONFIG } from '../constants/scrollConfig'

/**
 * Unified calculation function for sticky scroll state
 * Handles both competitions and events sections with shared logic
 * 
 * @param {Object} params - Calculation parameters
 * @param {HTMLElement|null} params.sectionRef - Section element reference
 * @param {HTMLElement|null} params.listRef - List container element reference
 * @param {number} params.scrollY - Current scroll position in pixels
 * @param {number} params.viewportHeight - Viewport height in pixels
 * @returns {Object} Calculated state object
 * @returns {string} returns.titlePosition - Position of title ('left-middle' | 'up')
 * @returns {number} returns.activeIndex - Index of currently active card (-1 if none)
 * @returns {Object<number, number>} returns.parallaxData - Map of card index to parallax offset
 * @returns {number} returns.progress - Scroll progress (0 to 1)
 * @returns {Object<number, string>} returns.cardPositions - Map of card index to position ('active' | 'previous' | 'next' | 'hidden')
 */
export function calculateStickyScrollState({
  sectionRef,
  listRef,
  scrollY,
  viewportHeight,
}) {
  if (!sectionRef || !listRef) {
    return {
      titlePosition: 'left-middle',
      activeIndex: -1,
      parallaxData: {},
      progress: 0,
      cardPositions: {},
    }
  }

  try {
    // Batch DOM measurements
    const sectionRect = sectionRef.getBoundingClientRect()
    const listRect = listRef.getBoundingClientRect()
    
    const sectionTop = sectionRect.top + scrollY
    const listBottom = listRect.bottom + scrollY
    const sectionHeight = listBottom - sectionTop

    // Calculate title position
    const remainingHeight = listBottom - scrollY - viewportHeight
    const titlePosition = remainingHeight < viewportHeight * SCROLL_CONFIG.TITLE_MOVE_UP_THRESHOLD
      ? 'up'
      : 'left-middle'

    // Calculate section scroll progress (0 to 1)
    const progress = Math.max(
      0,
      Math.min(
        1,
        (scrollY - sectionTop + viewportHeight * 0.5) / 
        (sectionHeight - viewportHeight * 0.5)
      )
    )

    // Calculate active card and parallax
    const cardElements = listRef.children
    const viewportCenter = scrollY + viewportHeight * 0.5
    let closestIndex = -1
    let closestDistance = Infinity
    const parallaxData = {}

    // Only process cards that are potentially visible
    const viewportTop = scrollY
    const viewportBottom = scrollY + viewportHeight
    const processRange = viewportHeight * 2 // Process cards within 2 viewport heights

    // Calculate card positions (previous/active/next/hidden)
    const cardPositions = {}
    const totalCards = cardElements.length

    Array.from(cardElements).forEach((card, index) => {
      const cardRect = card.getBoundingClientRect()
      const cardTop = cardRect.top + scrollY
      const cardBottom = cardRect.bottom + scrollY
      const cardCenter = cardTop + cardRect.height * 0.5

      // Skip cards that are far outside viewport
      if (cardBottom < viewportTop - processRange || cardTop > viewportBottom + processRange) {
        return
      }

      const distanceFromCenter = Math.abs(cardCenter - viewportCenter)

      // Check if card is visible and closest to center
      if (
        distanceFromCenter < closestDistance &&
        cardRect.top < viewportHeight &&
        cardRect.bottom > 0
      ) {
        closestDistance = distanceFromCenter
        closestIndex = index
      }

      // Calculate parallax offset only for cards near viewport
      if (cardRect.top < viewportHeight * 1.5 && cardRect.bottom > -viewportHeight * 0.5) {
        const parallaxOffset = (cardCenter - viewportCenter) * SCROLL_CONFIG.PARALLAX_FACTOR
        parallaxData[index] = parallaxOffset
      }
    })

    // Determine card positions based on active index
    if (closestIndex >= 0 && totalCards > 0) {
      for (let i = 0; i < totalCards; i++) {
        if (i === closestIndex) {
          cardPositions[i] = 'active'
        } else if (i === closestIndex - 1 && closestIndex > 0) {
          cardPositions[i] = 'previous'
        } else if (i === closestIndex + 1 && closestIndex < totalCards - 1) {
          cardPositions[i] = 'next'
        } else {
          cardPositions[i] = 'hidden'
        }
      }
    } else {
      // No active card found, mark all as hidden
      for (let i = 0; i < totalCards; i++) {
        cardPositions[i] = 'hidden'
      }
    }

    return {
      titlePosition,
      activeIndex: closestIndex,
      parallaxData,
      progress,
      cardPositions,
    }
  } catch {
    // Silently return default state on error - error boundaries will handle component-level errors
    return {
      titlePosition: 'left-middle',
      activeIndex: -1,
      parallaxData: {},
      progress: 0,
      cardPositions: {},
    }
  }
}
