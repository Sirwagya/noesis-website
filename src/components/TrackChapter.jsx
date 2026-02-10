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
      }}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="track-chapter__inner">
        <div className="track-chapter__atmosphere" aria-hidden="true" />

        <header className="track-chapter__header">
          <p className="track-chapter__eyebrow">Program Track</p>
          <h2 id={`${sectionId}-title`} className="track-chapter__title">
            {track.label}
          </h2>
          <p className="track-chapter__description">{track.description}</p>
        </header>

        {featured ? (
          <div className="track-chapter__featured-zone">
            <ProgramCard
              item={featured}
              variant="featured"
              depthLayer={featured.depthLayer}
              lane="feature"
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
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
