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
  glowConfig,
  scrollVelocity,
}) => {
  const velocityClass = scrollVelocity > 500 ? 'high' : 'normal'

  return (
    <li
      key={`${event.name}-${index}`}
      className={`event-hero ${isActive ? 'event-hero--active' : ''}`}
      data-velocity={velocityClass}
      style={{
        '--parallax-y': `${parallaxY}px`,
        '--glow-top-left': glowConfig.topLeft,
        '--glow-top-right': glowConfig.topRight,
        '--glow-bottom-left': glowConfig.bottomLeft,
        '--glow-bottom-right': glowConfig.bottomRight,
        transform: `translate3d(0, ${parallaxY}px, 0)`,
      }}
    >
      <div className="event-hero__glow event-hero__glow--top-left" />
      <div className="event-hero__glow event-hero__glow--top-right" />
      <div className="event-hero__glow event-hero__glow--bottom-left" />
      <div className="event-hero__glow event-hero__glow--bottom-right" />
      <div className="event-hero__badge">{event.category}</div>
      <h3 className="event-hero__title">{event.name}</h3>
      <p className="event-hero__tagline">{event.tagline}</p>
      <p className="event-hero__desc">{event.desc}</p>
      <div className="event-hero__prize">
        <span className="event-hero__prize-label">{event.prizePool}</span>
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
