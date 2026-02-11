export function ProgramCard({ item, variant = "default", className = "" }) {
  const variants = Array.isArray(variant) ? variant : [variant];
  const variantClass = variants.map((entry) => `program-card--${entry}`).join(" ");
  const details = item.details ?? {};

  const detailRows = [
    { label: "Team Size", value: details.teamSize },
    { label: "Location", value: details.location },
    { label: "Date", value: details.date },
    { label: "Time", value: details.time },
    { label: "Deadline", value: details.deadline },
    { label: "Eligibility", value: details.eligibility },
    { label: "Format", value: details.format },
    { label: "Stages", value: details.stages },
    { label: "Fee", value: details.fee },
    { label: "Total Prize", value: details.totalPrize },
  ];

  const hasDetailRows = detailRows.some((row) => row.value);
  const hasPrizes = Array.isArray(details.prizes) && details.prizes.length > 0;
  const hasNote = Boolean(details.note);

  return (
    <details className={`program-card ${variantClass} ${className}`.trim()} aria-label={item.title}>
      <summary className="program-card__summary">
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
          <span className="program-card__source">
            {item.source === "event" ? "Session" : "Challenge"}
          </span>
        </div>
        <span className="program-card__toggle" aria-hidden="true">
          View details
        </span>
      </summary>

      <div className="program-card__details">
        {hasDetailRows || hasPrizes ? (
          <div className="program-card__details-grid">
            {detailRows
              .filter((row) => row.value)
              .map((row) => (
                <div key={row.label} className="program-card__detail">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              ))}
            {hasPrizes ? (
              <div className="program-card__detail program-card__detail--full">
                <span>Prizes</span>
                <ul>
                  {details.prizes.map((prize) => (
                    <li key={prize}>{prize}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="program-card__details-empty">
            Full event details are available on Unstop.
          </p>
        )}
        {hasNote ? <p className="program-card__note">{details.note}</p> : null}
        <div className="program-card__actions">
          <a
            className="btn btn--primary btn--compact program-card__cta"
            href={item.registrationUrl}
            target="_blank"
            rel="noreferrer"
          >
            Register on Unstop
          </a>
        </div>
      </div>
    </details>
  );
}
