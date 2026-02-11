import { useEffect } from "react";

export function ProgramDetailsModal({ item, onClose, onNext, onPrev, hasNext, hasPrev }) {
  const details = item?.details ?? {};

  useEffect(() => {
    if (!item) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [item]);

  useEffect(() => {
    if (!item) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [item, onClose]);

  if (!item) return null;

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
    <div className="program-modal" role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="program-modal__backdrop" type="button" onClick={onClose} aria-label="Close details" />
      <div className="program-modal__panel">
        <header className="program-modal__header">
          <div>
            <p className="program-modal__eyebrow">{item.tagline}</p>
            <h3 className="program-modal__title">{item.title}</h3>
            <p className="program-modal__description">{item.description}</p>
          </div>
          <button className="program-modal__close" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        {hasDetailRows || hasPrizes ? (
          <div className="program-modal__details">
            <div className="program-modal__details-grid">
              {detailRows
                .filter((row) => row.value)
                .map((row) => (
                  <div key={row.label} className="program-modal__detail">
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                ))}
              {hasPrizes ? (
                <div className="program-modal__detail program-modal__detail--full">
                  <span>Prizes</span>
                  <ul>
                    {details.prizes.map((prize) => (
                      <li key={prize}>{prize}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            {hasNote ? <p className="program-modal__note">{details.note}</p> : null}
          </div>
        ) : (
          <p className="program-modal__empty">Full event details are available on Unstop.</p>
        )}

        <footer className="program-modal__footer">
          <div className="program-modal__nav">
            <button
              type="button"
              className="program-modal__nav-btn"
              onClick={() => onPrev?.()}
              disabled={!hasPrev}
            >
              Prev
            </button>
            <button
              type="button"
              className="program-modal__nav-btn"
              onClick={() => onNext?.()}
              disabled={!hasNext}
            >
              Next
            </button>
          </div>
          <span className="program-modal__meta">
            {item.entryType === "free" ? "Open Access" : "Competitive"} ·{" "}
            {item.source === "event" ? "Session" : "Challenge"}
          </span>
          <a
            className="btn btn--primary"
            href={item.registrationUrl}
            target="_blank"
            rel="noreferrer"
          >
            Register on Unstop
          </a>
        </footer>
      </div>
    </div>
  );
}
