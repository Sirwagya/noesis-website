import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useInView } from "./useInView";
import { useStickyScroll } from "./hooks/useStickyScroll";
import { useScrollVelocity } from "./hooks/useScrollVelocity";
import { CompetitionCard } from "./components/CompetitionCard";
import { EventCard } from "./components/EventCard";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorEffect } from "./components/CursorEffect";
import { PageLoader } from "./components/PageLoader";
import { Particles } from "./components/Particles";
import { SCROLL_CONFIG } from "./constants/scrollConfig";
import { competitionsList, competitionBackgrounds } from "./data/competitionsData";
import { eventsList, eventBackgrounds } from "./data/eventsData";
import "./App.css";

const navLinks = [
  { label: "Competitions", id: "competitions" },
  { label: "Events", id: "events" },
  { label: "Sponsors", id: "sponsors" },
  { label: "About", id: "about" },
];

function App() {
  // Refs
  const heroRef = useRef(null);
  const blobRef = useRef(null);
  const competitionsSectionRef = useRef(null);
  const eventsSectionRef = useRef(null);
  const competitionsListRef = useRef(null);
  const eventsListRef = useRef(null);

  // Intersection observers for sections
  const competitionsRef = useInView();
  const eventsRef = useInView();
  const heroInViewRef = useInView();
  const sponsorsRef = useInView();
  const aboutRef = useInView();
  const contactRef = useInView();


  // Nav state (combined for better batching)
  const [navState, setNavState] = useState({
    atBottom: true,
    scrolled: false,
    opacity: 0.95,
  });

  // State to control competitions visibility - initialize based on scroll position
  const [showCompetitions, setShowCompetitions] = useState(() => {
    if (typeof window !== "undefined") {
      const y = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      return y >= heroHeight * SCROLL_CONFIG.HERO_SCROLL_PAST_THRESHOLD;
    }
    return false;
  });

  // Hero parallax state
  const [parallaxY, setParallaxY] = useState({ blob: 0, grid: 0 });

  // Use optimized hooks
  const scrollVelocity = useScrollVelocity();
  const competitionsScroll = useStickyScroll({
    sectionRef: competitionsSectionRef,
    listRef: competitionsListRef,
  });
  const eventsScroll = useStickyScroll({
    sectionRef: eventsSectionRef,
    listRef: eventsListRef,
  });

  // Glow configs removed - using background color effect instead

  // Initial check for competitions visibility on mount
  useEffect(() => {
    const checkInitialVisibility = () => {
      const y = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      const initialShow = y >= heroHeight * SCROLL_CONFIG.HERO_SCROLL_PAST_THRESHOLD;
      setShowCompetitions(initialShow);
    };

    // Check immediately and after a short delay to ensure DOM is ready
    checkInitialVisibility();
    const timeoutId = setTimeout(checkInitialVisibility, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Memoize background calculation to prevent unnecessary recalculations
  const activeBackground = useMemo(() => {
    const competitionsActiveIndex = competitionsScroll.activeIndex;
    const eventsActiveIndex = eventsScroll.activeIndex;
    const isInHero = heroInViewRef.isInView;

    // Determine which section is active and get background
    if (isInHero) {
      return "var(--color-noesis-black)"; // Default hero background
    } else if (
      competitionsActiveIndex !== -1 &&
      competitionsActiveIndex < competitionBackgrounds.length
    ) {
      // Use competition-specific gradient background - changes as user scrolls through each competition
      return competitionBackgrounds[competitionsActiveIndex];
    } else if (
      eventsActiveIndex !== -1 &&
      eventsActiveIndex < eventBackgrounds.length
    ) {
      // Use event-specific gradient background
      return eventBackgrounds[eventsActiveIndex];
    }
    return "var(--color-noesis-black)"; // Default fallback
  }, [
    competitionsScroll.activeIndex,
    eventsScroll.activeIndex,
    heroInViewRef.isInView,
  ]);

  // Memoize grid and gradient opacity values
  const { gridOpacity, gradientOpacity } = useMemo(() => {
    const competitionsActiveIndex = competitionsScroll.activeIndex;
    const eventsActiveIndex = eventsScroll.activeIndex;
    const isInHero = heroInViewRef.isInView;

    if (isInHero) {
      return { gridOpacity: 0.3, gradientOpacity: 0.7 }; // More visible in hero
    } else if (competitionsActiveIndex !== -1 || eventsActiveIndex !== -1) {
      return { gridOpacity: 0.15, gradientOpacity: 0.9 }; // Subtle in competitions/events
    }
    return { gridOpacity: 0.25, gradientOpacity: 0.85 }; // Default
  }, [
    competitionsScroll.activeIndex,
    eventsScroll.activeIndex,
    heroInViewRef.isInView,
  ]);

  // Apply background and opacity values to document root
  useEffect(() => {
    const root = document.documentElement;
    const currentBackground = root.style.getPropertyValue("--page-background");
    const currentGridOpacity = root.style.getPropertyValue("--grid-opacity");
    const currentGradientOpacity = root.style.getPropertyValue("--gradient-opacity");

    // Only update if values have changed to prevent unnecessary style recalculations
    if (currentBackground !== activeBackground) {
      root.style.setProperty("--page-background", activeBackground);
    }
    if (currentGridOpacity !== gridOpacity.toString()) {
      root.style.setProperty("--grid-opacity", gridOpacity.toString());
    }
    if (currentGradientOpacity !== gradientOpacity.toString()) {
      root.style.setProperty("--gradient-opacity", gradientOpacity.toString());
    }
  }, [activeBackground, gridOpacity, gradientOpacity]);

  // Scroll handler for nav and hero parallax
  useEffect(() => {
    let rafId = null;
    let isActive = true;

    const handleScroll = () => {
      if (!isActive || rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!isActive) return;

        const y = window.scrollY;
        const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;

        // Nav calculations
        const scrollProgress = Math.min(y / heroHeight, 1);
        const isAtBottom = scrollProgress < SCROLL_CONFIG.NAV_SCROLL_THRESHOLD;

        setNavState({
          atBottom: isAtBottom,
          scrolled: y > SCROLL_CONFIG.NAV_SCROLLED_THRESHOLD,
          opacity: isAtBottom ? 0.95 : 1,
        });

        // Control competitions visibility based on scroll position
        const isInHero = heroInViewRef.isInView;
        const competitionsInView = competitionsRef.isInView;

        // Show competitions when scrolled past hero (prioritize scroll position over isInHero)
        // This fixes the issue where isInHero stays true even when scrolling past hero
        // Hide when scrolling back up to hero (within threshold of hero height)
        const scrolledPastHero = y >= heroHeight * SCROLL_CONFIG.HERO_SCROLL_PAST_THRESHOLD;
        const isNearHeroTop = y < heroHeight * SCROLL_CONFIG.HERO_SCROLL_NEAR_THRESHOLD;
        const shouldShowCompetitions =
          (scrolledPastHero && !isNearHeroTop) ||
          (competitionsInView && !isInHero);

        setShowCompetitions(shouldShowCompetitions);

        // Enhanced hero parallax with smooth easing
        const parallaxFactor = isInHero ? SCROLL_CONFIG.HERO_BLOB_PARALLAX : 0;
        const smoothParallax = y * parallaxFactor * SCROLL_CONFIG.PARALLAX_INTENSITY_REDUCTION;
        
        setParallaxY({
          blob: smoothParallax,
          grid: 0, // Grid removed, no parallax needed
        });

        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [heroInViewRef.isInView, competitionsRef.isInView]);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      // Use smooth scroll with better browser compatibility
      el.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }
  }, []);

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CursorEffect />
      {!navState.atBottom && (
        <header
          className={`nav nav--at-top ${navState.scrolled ? "nav--scrolled" : ""}`}
          style={{
            opacity: navState.opacity,
          }}
        >
          <div className="nav__inner">
            <a
              href="#hero"
              className="nav__logo"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
            >
              <span className="nav__logo-wrap">
                <img
                  src="/noesis-logo.png"
                  alt="NOESIS 2026"
                  className="nav__logo-img"
                />
              </span>
            </a>
            <nav className="nav__links">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  type="button"
                  className="nav__link"
                  onClick={() => scrollToSection(id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      scrollToSection(id);
                    }
                  }}
                  aria-label={`Navigate to ${label} section`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </header>
      )}

      <main className={`main ${!navState.atBottom ? "main--nav-top" : ""}`}>
        {/* Skip to main content link for accessibility */}
        <a href="#hero" className="skip-link" aria-label="Skip to main content">
          Skip to main content
        </a>
        <section
          id="hero"
          ref={(el) => {
            heroRef.current = el;
            // Assigning ref.current is valid - refs are mutable
            if (heroInViewRef?.ref) {
              heroInViewRef.ref.current = el;
            }
          }}
          className={`section section--hero ${heroInViewRef.isInView ? "in-view" : ""}`}
        >
          <Particles />
          <div
            ref={blobRef}
            className="hero__blob"
            aria-hidden="true"
            style={{ transform: `translateY(${parallaxY.blob}px)` }}
          />
          <div className="hero__blob-secondary" aria-hidden="true" />
          <div className="hero__bg" />
          <div className="hero__content">
            <h1 className="hero__title">NOESIS</h1>
          </div>
          <button
            type="button"
            className="hero__scroll"
            onClick={() => scrollToSection("competitions")}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToSection("competitions");
              }
            }}
            aria-label="Scroll to competitions section"
          >
            <span>Scroll</span>
            <div className="hero__scroll-icon" aria-hidden="true" />
          </button>
        </section>

        <section
          id="competitions"
          className={`section section--competitions ${competitionsRef.isInView && showCompetitions ? "in-view" : ""} ${showCompetitions ? "show" : "hide"}`}
          ref={(el) => {
            if (competitionsRef?.ref) {
              competitionsRef.ref.current = el;
            }
            competitionsSectionRef.current = el;
          }}
          aria-label="Competitions"
          aria-live="polite"
          aria-atomic="false"
        >
          <div className="section__inner section__inner--competitions">
            <div
              className={`competitions__side competitions__side--${competitionsScroll.titlePosition}`}
              role="complementary"
              aria-label="Competitions navigation"
            >
              <h2 className="section__title">Competitions</h2>
            </div>
            <ul className="competitions__list" ref={competitionsListRef}>
              {competitionsList.map((comp, index) => (
                <CompetitionCard
                  key={comp.id || comp.name}
                  competition={comp}
                  index={index}
                  isActive={competitionsScroll.activeIndex === index}
                  parallaxY={competitionsScroll.parallaxData[index] || 0}
                  scrollVelocity={scrollVelocity}
                  listPosition="normal"
                />
              ))}
            </ul>
          </div>
        </section>

        <section
          id="events"
          className={`section section--events ${eventsRef.isInView ? "in-view" : ""}`}
          ref={(el) => {
            if (eventsRef?.ref) {
              eventsRef.ref.current = el;
            }
            eventsSectionRef.current = el;
          }}
          aria-label="Events"
          aria-live="polite"
          aria-atomic="false"
        >
          <div className="section__inner section__inner--events">
            <div
              className={`events__side events__side--${eventsScroll.titlePosition}`}
              role="complementary"
              aria-label="Events navigation"
            >
              <h2 className="section__title">Events</h2>
            </div>
            <ul className="events__list" ref={eventsListRef}>
              {eventsList.map((event, index) => (
                <EventCard
                  key={event.id || `${event.name}-${index}`}
                  event={event}
                  index={index}
                  isActive={eventsScroll.activeIndex === index}
                  parallaxY={eventsScroll.parallaxData[index] || 0}
                  scrollVelocity={scrollVelocity}
                  listPosition="normal"
                />
              ))}
            </ul>
          </div>
        </section>

        <section
          id="sponsors"
          className={`section section--sponsors ${sponsorsRef.isInView ? "in-view" : ""}`}
          ref={sponsorsRef.ref}
        >
          <div className="section__inner">
            <h2 className="section__title">Sponsors</h2>
            <div className="sponsors__row">
              {["Partner A", "Partner B", "Partner C"].map((name) => (
                <div key={name} className="sponsor__slot">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className={`section section--about ${aboutRef.isInView ? "in-view" : ""}`}
          ref={aboutRef.ref}
        >
          <div className="section__inner">
            <h2 className="section__title">About NOESIS</h2>
            <div className="about__content">
              <p className="about__description">
                NOESIS embodies duality — where technology meets culture, logic
                meets creativity. Join us for an extraordinary journey into the
                future of technology, innovation, and creativity.
              </p>
            </div>
            <div className="about__stats">
              <div className="about__stat">
                <div className="about__stat-number">48+</div>
                <div className="about__stat-label">Hours</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">20+</div>
                <div className="about__stat-label">Events</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">500+</div>
                <div className="about__stat-label">Participants</div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className={`section section--contact ${contactRef.isInView ? "in-view" : ""}`}
          ref={contactRef.ref}
        >
          <div className="section__inner">
            <div className="contact__logo-wrap">
              <img
                src="/noesis-logo.png"
                alt="NOESIS 2026"
                className="contact__logo"
              />
            </div>
            <h2 className="section__title">Get in Touch</h2>
            <p className="section__lead">
              Ready to be part of Vedam Tech Fest?
            </p>
            <div className="contact__cta">
              <a
                href="mailto:hello@noesis.in"
                className="contact__link contact__link--primary"
              >
                hello@noesis.in
              </a>
              <a 
                href="#" 
                className="btn btn--primary"
                aria-label="Register for NOESIS 2026"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Add registration logic here
                  }
                }}
              >
                Register
              </a>
            </div>
            <footer className="footer">
              <p>
                © 2026 NOESIS — Vedam Tech Fest. Where Innovation Meets Imagination.
              </p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
