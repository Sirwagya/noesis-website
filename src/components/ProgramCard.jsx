export function ProgramCard({ item, variant = "default", depthLayer = 2, lane = "deck" }) {
  return (
    <article
      className={`program-card program-card--${variant} program-card--layer-${depthLayer}`}
      aria-label={item.title}
      data-depth={String(depthLayer)}
      data-lane={lane}
    >
      <span className="program-card__accent" aria-hidden="true" />
      <div className="program-card__meta">
        <span className="program-card__badge">{item.tagline}</span>
        <span className={`program-card__entry program-card__entry--${item.entryType}`}>
          {item.entryType === "free" ? "Open Access" : "Competitive"}
        </span>
      </div>
      <h3 className="program-card__title">{item.title}</h3>
      <p className="program-card__description">{item.description}</p>
      <div className="program-card__footer">
        <span className="program-card__prize">{item.prizeText}</span>
        <span className="program-card__source">{item.source === "event" ? "Session" : "Challenge"}</span>
      </div>
    </article>
  );
}
