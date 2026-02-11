import { ProgramCard } from "./ProgramCard";

export function TrackChapter({ track, items, sectionId, chapterRef, chapterIndex }) {
  const [featured, ...others] = items;

  return (
    <section
      id={sectionId}
      ref={chapterRef}
      className="track-chapter chapter"
      data-mood={track.mood}
      data-parallax-preset={track.parallaxPreset}
      data-chapter-index={chapterIndex + 1}
      style={{
        "--track-accent-start": track.accentStart,
        "--track-accent-end": track.accentEnd,
        "--track-surface-a": track.palette?.surfaceA,
        "--track-surface-b": track.palette?.surfaceB,
        "--track-border": track.palette?.border,
        "--track-glow": track.palette?.glow,
      }}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="track-chapter__inner">
        <div className="track-chapter__atmosphere" aria-hidden="true" />

        <div className="track-chapter__layout">
          <aside className="track-chapter__title-tower" aria-label={`${track.label} chapter title`}>
            <span className="track-chapter__index">{String(chapterIndex + 1).padStart(2, "0")}</span>
            <header className="track-chapter__header">
              <p className="track-chapter__eyebrow">Program Track</p>
              <h2 id={`${sectionId}-title`} className="track-chapter__title">
                {track.label}
              </h2>
              <p className="track-chapter__description">{track.description}</p>
            </header>
            <span className="track-chapter__pulse" aria-hidden="true" />
          </aside>

          <div className="track-chapter__deck-shell track-chapter__deck-beat">
            {featured ? (
              <div className="track-chapter__featured-zone">
                <ProgramCard
                  item={featured}
                  variant="featured"
                  depthLayer={featured.depthLayer}
                  lane="feature"
                  beatIndex={0}
                />
              </div>
            ) : null}

            {others.length > 0 ? (
              <div className="track-chapter__deck" role="list" aria-label={`${track.label} programs`}>
                {others.map((item, index) => (
                  <ProgramCard
                    key={item.id}
                    item={item}
                    depthLayer={item.depthLayer}
                    lane={index % 2 === 0 ? "left" : "right"}
                    beatIndex={index + 1}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
