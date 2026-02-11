import React from 'react'
import { CountUp } from './CountUp'

/**
 * Memoized Competition Card Component
 * Only re-renders when props actually change
 */
export const CompetitionCard = React.memo(({
  competition,
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
      key={competition.name}
      className={`competition-hero ${isActive ? 'competition-hero--active' : ''}`}
      style={{
        '--parallax-y': `${parallaxY}px`,
        '--velocity-factor': velocityFactor,
        transform: `translate3d(0, ${parallaxY}px, 0)`,
        filter: `brightness(${1 + velocityFactor * 0.2})`,
      }}
    >
      <div className="competition-hero__badge">{competition.category}</div>
      <h3 className="competition-hero__title">{competition.name}</h3>
      <p className="competition-hero__tagline">{competition.tagline}</p>
      <p className="competition-hero__desc">{competition.desc}</p>
      <div className="competition-hero__prize">
        <span className="competition-hero__prize-label">Prize Pool:</span>
        <span className="competition-hero__prize-amount">
          <CountUp value={competition.prizePool} isVisible={isActive && listPosition === 'normal'} />
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

CompetitionCard.displayName = 'CompetitionCard'
