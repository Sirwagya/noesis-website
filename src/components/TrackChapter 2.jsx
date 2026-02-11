import { ProgramCard } from "./ProgramCard";
import { getFeaturedProgramItem } from "../data/programTracksData";

export function TrackChapter({ track, items, sectionId, chapterRef, chapterIndex }) {
  const featured = getFeaturedProgramItem(track.id);
  const deckItems = items.filter((item) => item.id !== featured?.id).slice(0, 4);

  return (
    <section
      id={sectionId}
      ref={chapterRef}
      className="track-chapter chapter"
      style={{
        "--track-accent-start": track.accentStart,
        "--track-accent-end": track.accentEnd,
      }}
    >
      <div className="track-chapter__inner">
        <div className="track-chapter__atmosphere" aria-hidden="true" />
        <div className="track-chapter__layout">
          <div className="track-chapter__title-tower">
            <p className="track-chapter__index">Chapter {String(chapterIndex + 1).padStart(2, "0")}</p>
            <div className="track-chapter__header">
              <p className="track-chapter__eyebrow">{track.label}</p>
              <h2 className="track-chapter__title">{track.label}</h2>
              <p className="track-chapter__description">{track.description}</p>
              <div className="track-chapter__pulse" aria-hidden="true" />
            </div>
          </div>
          <div className="track-chapter__deck-shell">
            {featured && (
              <div className="track-chapter__featured-zone">
                <ProgramCard item={featured} variant={["featured", "slot-deck"]} />
              </div>
            )}
            <div className="track-chapter__deck">
              {deckItems.map((item, index) => (
                <ProgramCard
                  key={item.id}
                  item={item}
                  variant="slot-deck"
                  className={index % 2 === 0 ? "program-card--lane-left" : "program-card--lane-right"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
