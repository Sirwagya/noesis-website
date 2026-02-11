import { trackMeta } from "../data/programTracksData";

const iconPaths = {
  terminal: "M5 6h10v2H5zM5 10h6v2H5zM5 14h10v2H5zM2 4h16v14H2z",
  mic: "M9 3a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V3zm-3 6a5 5 0 0 0 10 0h2a7 7 0 0 1-6 6.92V20H10v-4.08A7 7 0 0 1 4 9h2z",
  briefcase: "M6 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h4v12H2V6h4zm2 0h4V4H8v2z",
  sparkles: "M12 2l1.6 4.1L18 8l-4.4 1.9L12 14l-1.6-4.1L6 8l4.4-1.9L12 2zm-7 8l1 2.6L9 14l-3 1.4L5 18l-1-2.6L1 14l3-1.4L5 10zm12 4l1 2.6 3 1.4-3 1.4L17 22l-1-2.6L13 18l3-1.4L17 14z",
  gamepad: "M7 8h10l2 6a3 3 0 0 1-2.8 4H15l-1-2h-4l-1 2H6.8A3 3 0 0 1 4 14l3-6zm2 3v2h2v-2H9zm5 0h2v2h-2v-2z",
  bot: "M8 3h4l1 2h3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h3l0-2zm2 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
};

function TrackIcon({ iconKey }) {
  const path = iconPaths[iconKey];
  if (!path) return null;

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  );
}

export function TrackRail({ tracks = trackMeta, activeTrackId, onTrackSelect }) {
  return (
    <div className="track-rail" role="tablist" aria-label="Program tracks">
      {tracks.map((track, index) => (
        <button
          key={track.id}
          type="button"
          className={`track-rail__item ${activeTrackId === track.id ? "is-active" : ""}`}
          onClick={() => onTrackSelect?.(track.id)}
          role="tab"
          aria-selected={activeTrackId === track.id}
          aria-controls={`track-${track.id}`}
          style={{
            "--track-accent-start": track.accentStart,
            "--track-accent-end": track.accentEnd,
          }}
        >
          <div className="track-rail__meta">
            <span className="track-rail__index">Track {String(index + 1).padStart(2, "0")}</span>
            <span className="track-rail__label">{track.label}</span>
          </div>
          <p className="track-rail__description">{track.description}</p>
          <span className="track-rail__icon" aria-hidden="true">
            <TrackIcon iconKey={track.iconKey} />
          </span>
        </button>
      ))}
    </div>
  );
}
