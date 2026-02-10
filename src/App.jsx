import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TrackChapter } from "./components/TrackChapter";
import { TrackRail } from "./components/TrackRail";
import {
  getProgramItemsByTrack,
  programTrackIds,
  trackMeta,
} from "./data/programTracksData";
import { setupScrollScenes } from "./lib/scrollScenes";
import "./App.css";

const navLinks = [
  { id: "hero", label: "Home" },
  { id: "program-tracks", label: "Tracks" },
  { id: "sponsors", label: "Sponsors" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const staticSectionIds = ["hero", "program-tracks", "sponsors", "about", "contact"];
const allSectionIds = [
  "hero",
  "program-tracks",
  ...programTrackIds.map((trackId) => `track-${trackId}`),
  "sponsors",
  "about",
  "contact",
];

function normalizeNavSection(sectionId) {
  if (sectionId.startsWith("track-")) {
    return "program-tracks";
  }

  if (staticSectionIds.includes(sectionId)) {
    return sectionId;
  }

  return "hero";
}

function App() {
  const [activeNavSection, setActiveNavSection] = useState("hero");
  const [activeTrackId, setActiveTrackId] = useState(trackMeta[0].id);
  const [navSolid, setNavSolid] = useState(false);

  const sectionRefs = useRef(new Map());
  const heroRef = useRef(null);
  const overviewRef = useRef(null);

  const tracksWithItems = useMemo(
    () => trackMeta.map((track) => ({ track, items: getProgramItemsByTrack(track.id) })),
    []
  );

  const activeTrackMeta = useMemo(
    () => trackMeta.find((track) => track.id === activeTrackId) ?? trackMeta[0],
    [activeTrackId]
  );

  const registerSectionRef = useCallback((sectionId) => {
    return (node) => {
      if (node) {
        sectionRefs.current.set(sectionId, node);
      } else {
        sectionRefs.current.delete(sectionId);
      }
    };
  }, []);

  const setHeroSectionRef = useCallback(
    (node) => {
      heroRef.current = node;
      registerSectionRef("hero")(node);
    },
    [registerSectionRef]
  );

  const setOverviewSectionRef = useCallback(
    (node) => {
      overviewRef.current = node;
      registerSectionRef("program-tracks")(node);
    },
    [registerSectionRef]
  );

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleTrackSelect = useCallback(
    (trackId) => {
      setActiveTrackId(trackId);
      scrollToSection(`track-${trackId}`);
    },
    [scrollToSection]
  );

  useEffect(() => {
    const onScroll = () => {
      setNavSolid(window.scrollY > 24);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = allSectionIds
      .map((sectionId) => sectionRefs.current.get(sectionId))
      .filter(Boolean);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visibleEntries[0];
        if (!topEntry) return;

        const sectionId = topEntry.target.id;
        setActiveNavSection(normalizeNavSection(sectionId));

        if (sectionId.startsWith("track-")) {
          setActiveTrackId(sectionId.replace("track-", ""));
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-18% 0px -40% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const chapterElements = programTrackIds
      .map((trackId) => ({
        trackId,
        element: sectionRefs.current.get(`track-${trackId}`),
      }))
      .filter((entry) => Boolean(entry.element));

    const cleanup = setupScrollScenes({
      heroRef,
      overviewRef,
      chapterElements,
      onTrackProgress: (trackId) => {
        setActiveTrackId(trackId);
      },
    });

    return cleanup;
  }, []);

  return (
    <>
      <a href="#hero" className="skip-link">
        Skip to content
      </a>

      <header className={`site-nav ${navSolid ? "site-nav--solid" : ""}`}>
        <div className="site-nav__inner">
          <a
            href="#hero"
            className="site-nav__brand"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("hero");
            }}
          >
            NOESIS
          </a>
          <nav className="site-nav__links" aria-label="Primary">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`site-nav__link ${
                  activeNavSection === link.id ? "is-active" : ""
                }`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main
        className={`page-shell mood-${activeTrackMeta.mood}`}
        style={{
          "--active-accent-start": activeTrackMeta.accentStart,
          "--active-accent-end": activeTrackMeta.accentEnd,
        }}
      >
        <div className="story-canvas" aria-hidden="true">
          <div className="story-canvas__layer story-canvas__layer--matrix" />
          <div className="story-canvas__layer story-canvas__layer--aurora" />
          <div className="story-canvas__layer story-canvas__layer--beams" />
          <div className="story-canvas__layer story-canvas__layer--grain" />
        </div>

        <section id="hero" ref={setHeroSectionRef} className="hero chapter">
          <div className="hero__content">
            <p className="hero__eyebrow">Vedam Tech Fest 2026</p>
            <h1 className="hero__title">NOESIS</h1>
            <p className="hero__subtitle">
              India&apos;s chaptered tech-fest experience where code, culture, competition, and
              community collide.
            </p>

            <ul className="hero__meta" aria-label="Festival overview">
              <li>48+ Hours</li>
              <li>20+ Experiences</li>
              <li>500+ Participants</li>
            </ul>

            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => scrollToSection("program-tracks")}
              >
                Explore Program Tracks
              </button>
              <a className="btn btn--ghost" href="mailto:hello@noesis.in">
                Contact Organizers
              </a>
            </div>
          </div>
        </section>

        <section
          id="program-tracks"
          ref={setOverviewSectionRef}
          className="program-overview chapter"
        >
          <div className="program-overview__inner">
            <p className="program-overview__eyebrow">Core Festival Experience</p>
            <h2 className="program-overview__headline">Program Tracks</h2>
            <p className="program-overview__summary">
              Choose a track, dive into high-stakes chapters, and move through a cinematic festival
              timeline built for builders, gamers, founders, and performers.
            </p>
            <TrackRail
              tracks={trackMeta}
              activeTrackId={activeTrackId}
              onTrackSelect={handleTrackSelect}
            />
          </div>
        </section>

        {tracksWithItems.map(({ track, items }, chapterIndex) => (
          <TrackChapter
            key={track.id}
            track={track}
            items={items}
            sectionId={`track-${track.id}`}
            chapterRef={registerSectionRef(`track-${track.id}`)}
            chapterIndex={chapterIndex}
          />
        ))}

        <section id="sponsors" ref={registerSectionRef("sponsors")} className="section section--sponsors">
          <div className="section__inner">
            <p className="section__eyebrow">Partnerships</p>
            <h2 className="section__title">Sponsors</h2>
            <p className="section__lead">
              Partner with NOESIS to power the next generation of student talent, innovation, and
              campus-scale cultural energy.
            </p>
            <div className="sponsor-grid" role="list" aria-label="Sponsor slots">
              {["Title Partner", "Innovation Partner", "Experience Partner", "Community Partner"].map(
                (slot) => (
                  <article key={slot} className="sponsor-card" role="listitem">
                    <h3>{slot}</h3>
                    <p>Partner Slots Opening Soon</p>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section id="about" ref={registerSectionRef("about")} className="section section--about">
          <div className="section__inner">
            <p className="section__eyebrow">About NOESIS</p>
            <h2 className="section__title">Where Engineering Meets Culture</h2>
            <p className="section__lead">
              NOESIS is Vedam&apos;s duality-driven festival system where engineering discipline
              and creative expression operate as one.
            </p>
            <div className="about-stats" role="list" aria-label="Festival stats">
              <article className="about-stats__item" role="listitem">
                <h3>48+</h3>
                <p>Hours</p>
              </article>
              <article className="about-stats__item" role="listitem">
                <h3>5</h3>
                <p>Program Tracks</p>
              </article>
              <article className="about-stats__item" role="listitem">
                <h3>500+</h3>
                <p>Participants</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" ref={registerSectionRef("contact")} className="section section--contact">
          <div className="section__inner">
            <p className="section__eyebrow">Get Involved</p>
            <h2 className="section__title">Build With Us This Season</h2>
            <p className="section__lead">
              Registrations open soon. Connect for partnerships, speaker spots, and collaboration
              opportunities.
            </p>
            <div className="contact-actions">
              <a href="mailto:hello@noesis.in" className="btn btn--primary">
                hello@noesis.in
              </a>
              <button type="button" className="btn btn--disabled" disabled aria-disabled="true">
                Register (Coming Soon)
              </button>
            </div>
            <footer className="footer">
              <p>© 2026 NOESIS — Vedam Tech Fest. Designed for a scroll-driven festival story.</p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
