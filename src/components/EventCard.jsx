import React from "react";

/**
 * Memoized Event Card Component
 * Only re-renders when props actually change
 */
export const EventCard = React.memo(
  ({
    event,
    index,
    isActive,
    position = "hidden",
    parallaxY,
    scrollVelocity,
  }) => {
    // Apply scroll velocity effect (brightness only, no blur)
    const velocityFactor = Math.min(scrollVelocity / 1000, 0.3); // Normalize to 0-0.3

    return (
      <li
        key={`${event.name}-${index}`}
        className={`event-hero event-hero--${position} ${isActive ? "event-hero--active" : ""}`}
        style={{
          "--card-index": index,
          "--parallax-y": `${parallaxY}px`,
          "--velocity-factor": velocityFactor,
          filter: `brightness(${1 + velocityFactor * 0.2})`,
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
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison - only re-render if these change
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.position === nextProps.position &&
      prevProps.parallaxY === nextProps.parallaxY &&
      prevProps.scrollVelocity === nextProps.scrollVelocity
    );
  },
);

EventCard.displayName = "EventCard";
