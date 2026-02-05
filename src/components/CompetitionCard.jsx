import React from 'react'
import { CountUp } from './CountUp'

/**
 * Memoized Competition Card Component
 * Only re-renders when props actually change
 */
export const CompetitionCard = React.memo(({
  competition,
  index,
  isActive,
  parallaxY,
  glowConfig,
  scrollVelocity,
  listPosition,
}) => {
  const velocityClass = scrollVelocity > 500 ? 'high' : 'normal'

  return (
    <li
      key={competition.name}
      className={`competition-hero ${isActive ? 'competition-hero--active' : ''}`}
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
      <div className="competition-hero__glow competition-hero__glow--top-left" />
      <div className="competition-hero__glow competition-hero__glow--top-right" />
      <div className="competition-hero__glow competition-hero__glow--bottom-left" />
      <div className="competition-hero__glow competition-hero__glow--bottom-right" />
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
