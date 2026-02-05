import React from 'react'

/**
 * Memoized Event Card Component
 * Only re-renders when props actually change
 */
export const EventCard = React.memo(({
  event,
  index,
  isActive,
  parallaxY,
  scrollVelocity,
}) => {
  return (
    <li
      key={`${event.name}-${index}`}
      className={`event-hero ${isActive ? 'event-hero--active' : ''}`}
      style={{
        '--parallax-y': `${parallaxY}px`,
        transform: `translate3d(0, ${parallaxY}px, 0)`,
      }}
    >
      <div className="event-hero__badge">{event.category}</div>
      <h3 className="event-hero__title">{event.name}</h3>
      <p className="event-hero__tagline">{event.tagline}</p>
      <p className="event-hero__desc">{event.desc}</p>
      <div className="event-hero__prize">
        <span className="event-hero__prize-label">Prize Pool:</span>
        <span className="event-hero__prize-amount">{event.prizePool}</span>
      </div>
    </li>
  )
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if these change
  return (
    prevProps.isActive === nextProps.isActive &&
    prevProps.parallaxY === nextProps.parallaxY &&
    prevProps.scrollVelocity === nextProps.scrollVelocity
  )
})

EventCard.displayName = 'EventCard'
