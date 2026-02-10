export function TrackRail({ tracks, activeTrackId, onTrackSelect }) {
  return (
    <div className="track-rail" role="list" aria-label="Program tracks">
      {tracks.map((track, index) => {
        const active = activeTrackId === track.id;

        return (
          <button
            key={track.id}
            type="button"
            role="listitem"
            className={`track-rail__item ${active ? "is-active" : ""}`}
            onClick={() => onTrackSelect(track.id)}
            aria-pressed={active}
            aria-label={`Open ${track.label} chapter`}
          >
            <span className="track-rail__index">{String(index + 1).padStart(2, "0")}</span>
            <span className="track-rail__label">{track.label}</span>
          </button>
        );
      })}
    </div>
  );
}
