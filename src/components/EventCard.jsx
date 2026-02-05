import React from 'react'
import { CountUp } from './CountUp'

/**
 * Memoized Event Card Component
 * Only re-renders when props actually change
 */
export const EventCard = React.memo(({
  event,
  index, // eslint-disable-line no-unused-vars
  isActive,
  parallaxY,
  scrollVelocity,
  listPosition,
}) => {
  // Apply scroll velocity effect (brightness only, no blur)
  const velocityFactor = Math.min(scrollVelocity / 1000, 0.3); // Normalize to 0-0.3
  
  return (
    <li
      key={event.name}
      className={`event-hero ${isActive ? 'event-hero--active' : ''}`}
      style={{
        '--parallax-y': `${parallaxY}px`,
        '--velocity-factor': velocityFactor,
        transform: `translate3d(0, ${parallaxY}px, 0)`,
        filter: `brightness(${1 + velocityFactor * 0.2})`,
      }}
    >
      <div className="event-hero__badge">{event.category}</div>
      <h3 className="event-hero__title">{event.name}</h3>
      <p className="event-hero__tagline">{event.tagline}</p>
      <p className="event-hero__desc">{event.desc}</p>
      <div className="event-hero__prize">
        <span className="event-hero__prize-label">Prize Pool:</span>
        <span className="event-hero__prize-amount">
          <CountUp value={event.prizePool} isVisible={isActive && listPosition === 'normal'} />
        </span>
      </div>
    </li>
  )
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if these change
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.parallaxY === nextProps.parallaxY &&
    prevProps.scrollVelocity === nextProps.scrollVelocity &&
    prevProps.listPosition === nextProps.listPosition
  )
})

EventCard.displayName = 'EventCard'
