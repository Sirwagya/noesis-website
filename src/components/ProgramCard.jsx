export function ProgramCard({ item, variant = "default", className = "", onOpen }) {
  const variants = Array.isArray(variant) ? variant : [variant];
  const variantClass = variants.map((entry) => `program-card--${entry}`).join(" ");

  return (
    <button
      type="button"
      className={`program-card ${variantClass} ${className}`.trim()}
      aria-label={`${item.title} details`}
      aria-haspopup="dialog"
      role="listitem"
      onClick={() => onOpen?.(item)}
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
      <span className="program-card__toggle" aria-hidden="true">
        View details
      </span>
    </button>
  );
}
