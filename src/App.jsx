import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TrackChapter } from "./components/TrackChapter";
import { TrackRail } from "./components/TrackRail";
import { ProgramDetailsModal } from "./components/ProgramDetailsModal";
import {
  getProgramItemsByTrack,
  programTrackIds,
  trackMeta,
  UNSTOP_MAIN_URL,
} from "./data/programTracksData";
import {
  sponsorshipMetrics,
  sponsorshipPillars,
  sponsorshipSections,
  sponsorshipTiers,
} from "./data/sponsorshipData";
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
  const [activeProgram, setActiveProgram] = useState(null);

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

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    section.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }, []);

  const handleTrackSelect = useCallback(
    (trackId) => {
      setActiveTrackId(trackId);
      scrollToSection(`track-${trackId}`);
    },
    [scrollToSection]
  );

  const handleProgramOpen = useCallback((item, list = []) => {
    const index = list.findIndex((entry) => entry.id === item.id);
    setActiveProgram({ item, list, index });
  }, []);

  const handleProgramClose = useCallback(() => {
    setActiveProgram(null);
  }, []);

  const handleProgramNavigate = useCallback((direction) => {
    setActiveProgram((current) => {
      if (!current) return current;
      const nextIndex = current.index + direction;
      if (nextIndex < 0 || nextIndex >= current.list.length) {
        return current;
      }
      return {
        item: current.list[nextIndex],
        list: current.list,
        index: nextIndex,
      };
    });
  }, []);

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
      <a href="#program-tracks" className="skip-link">
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
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`site-nav__link ${
                  activeNavSection === link.id ? "is-active" : ""
                }`}
                aria-current={activeNavSection === link.id ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="site-nav__cta">
            <a
              className="btn btn--nav"
              href={UNSTOP_MAIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              Join Waitlist
            </a>
          </div>
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
        <div className="wipe-transition" aria-hidden="true" />

        <section id="hero" ref={setHeroSectionRef} className="hero chapter">
          <div className="hero__content hero__stacked">
            <div className="hero__left">
              <p className="hero__eyebrow">NOESIS 2026 · Vedam Tech Fest</p>
              <img className="hero__logo" src="/noesis-logo.png" alt="NOESIS" />
              <div className="hero__tagline-shell">
                <h1 className="hero__title hero__tagline">Build the Future. Own the Stage.</h1>
                <p className="hero__tagline hero__tagline--reflection" aria-hidden="true">
                  Build the Future. Own the Stage.
                </p>
              </div>
              <p className="hero__summary hero__subtitle">
                India’s immersive student tech‑fest.
              </p>
              <div className="hero__actions">
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => scrollToSection("program-tracks")}
                >
                  Explore Program Tracks
                </button>
                <a
                  className="btn btn--ghost"
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  Contact Organizers
                </a>
              </div>
            </div>
            <div className="hero__ambient" aria-hidden="true">
              <img className="hero__ambient-image" src="/hero-circuit.svg" alt="" />
            </div>
          </div>
          <a
            className="hero__scroll-hint"
            href="#program-tracks"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("program-tracks");
            }}
          >
            Scroll to explore tracks <span aria-hidden="true">↓</span>
          </a>
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
            <div className="program-overview__actions">
              <a
                className="btn btn--ghost btn--compact"
                href={UNSTOP_MAIN_URL}
                target="_blank"
                rel="noreferrer"
              >
                View all events on Unstop
              </a>
            </div>
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
            onOpen={handleProgramOpen}
          />
        ))}

        <section id="sponsors" ref={registerSectionRef("sponsors")} className="section section--sponsors">
          <div className="section__inner">
            <p className="section__eyebrow">Partnerships</p>
            <h2 className="section__title">Sponsors</h2>
            <p className="section__lead">
              Partner with NOESIS to reach high-signal builders, creators, and early founders across
              India&apos;s fastest-growing tech ecosystem.
            </p>
            <div className="sponsor-metrics" role="list">
              {sponsorshipMetrics.map((metric) => (
                <article key={metric.label} className="sponsor-metric-card" role="listitem">
                  <span className="sponsor-metric-card__label">{metric.label}</span>
                  <strong className="sponsor-metric-card__value">{metric.value}</strong>
                  <span className="sponsor-metric-card__note">{metric.note}</span>
                </article>
              ))}
            </div>

            <div className="sponsor-pillars">
              {sponsorshipPillars.map((pillar) => (
                <article key={pillar.title} className="sponsor-pillar">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </article>
              ))}
            </div>

            <div className="sponsor-accordion sponsor-accordion--tiers" role="list">
              {sponsorshipTiers.map((tier) => (
                <details key={tier.id} className="sponsor-panel" role="listitem">
                  <summary className="sponsor-panel__summary">
                    <div>
                      <span className="sponsor-panel__title">{tier.name}</span>
                      <span className="sponsor-panel__price">{tier.price}</span>
                    </div>
                    <span className="sponsor-panel__summary-text">{tier.summary}</span>
                  </summary>
                  <div className="sponsor-panel__content">
                    <ul>
                      {tier.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            <div className="sponsor-accordion sponsor-accordion--secondary" role="list">
              {sponsorshipSections.map((section) => (
                <details key={section.id} className="sponsor-panel" role="listitem">
                  <summary className="sponsor-panel__summary">
                    <div>
                      <span className="sponsor-panel__title">{section.title}</span>
                    </div>
                    <span className="sponsor-panel__summary-text">{section.summary}</span>
                  </summary>
                  <div className="sponsor-panel__content">
                    <ul>
                      {section.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>

            <div className="sponsor-cta">
              <a
                className="btn btn--primary"
                href="mailto:hello@noesis.in?subject=NOESIS%202026%20Sponsorship"
              >
                Request Sponsorship Deck
              </a>
              <a
                className="btn btn--ghost btn--compact"
                href="mailto:hello@noesis.in?subject=NOESIS%202026%20Sponsor%20Call"
              >
                Schedule a Call
              </a>
              <span>Custom packages for tech, gaming, and culture partners.</span>
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
            <div className="about-grid">
              <article>
                <h3>Festival Format</h3>
                <p>Five tracks, curated challenges, and an always-on stage for founders and performers.</p>
              </article>
              <article>
                <h3>Community</h3>
                <p>Student-led organization with mentors, alumni, and partner ecosystems.</p>
              </article>
              <article>
                <h3>Outcomes</h3>
                <p>Real product demos, team tryouts, portfolio showcases, and hiring-ready talent.</p>
              </article>
            </div>
            <div className="about-stats" role="list" aria-label="Festival stats">
              <article className="about-stats__item" role="listitem">
                <h3>48+</h3>
                <p>Hours</p>
              </article>
              <article className="about-stats__item" role="listitem">
                <h3>6</h3>
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
            <div className="contact-grid">
              <article>
                <h3>Students</h3>
                <p>Compete, create, and showcase your work across tech, culture, and esports tracks.</p>
              </article>
              <article>
                <h3>Partners</h3>
                <p>Bring brand activations, mentorship, and prize pools to the NOESIS floor.</p>
              </article>
              <article>
                <h3>Speakers</h3>
                <p>Share founder journeys, engineering playbooks, and creative sessions.</p>
              </article>
            </div>
            <div className="contact-actions">
              <a href="mailto:hello@noesis.in" className="btn btn--primary">
                Email Organizers
              </a>
              <a
                href="mailto:hello@noesis.in?subject=NOESIS%202026%20Interest"
                className="btn btn--ghost"
              >
                Join the Waitlist
              </a>
            </div>
            <div className="contact-info">
              <span>Partnerships · Speakers · Community</span>
              <span>hello@noesis.in</span>
            </div>
            <footer className="footer">
              <p>© 2026 NOESIS — Vedam Tech Fest. Designed for a scroll-driven festival story.</p>
            </footer>
          </div>
        </section>
      </main>
      <ProgramDetailsModal
        item={activeProgram?.item ?? null}
        hasPrev={Boolean(activeProgram && activeProgram.index > 0)}
        hasNext={
          Boolean(activeProgram && activeProgram.list.length - 1 > activeProgram.index)
        }
        onPrev={() => handleProgramNavigate(-1)}
        onNext={() => handleProgramNavigate(1)}
        onClose={handleProgramClose}
      />
    </>
  );
}

export default App;
