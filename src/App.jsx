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
import "./App.css";

const navLinks = [
  { label: "Competitions", id: "competitions" },
  { label: "Events", id: "events" },
  { label: "Sponsors", id: "sponsors" },
  { label: "About", id: "about" },
];

// Corner glow configurations removed - using background color effect instead

// Dynamic background colors - enhanced gradients with more distinct colors per competition
const competitionBackgrounds = [
  // Purple dominant - Competition 1
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(106, 0, 255, 0.45) 0%, rgba(139, 92, 246, 0.35) 25%, rgba(168, 85, 247, 0.2) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Blue-Cyan blend - Competition 2
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(96, 165, 250, 0.45) 0%, rgba(79, 209, 197, 0.35) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Purple-Pink blend - Competition 3
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(139, 92, 246, 0.35) 25%, rgba(255, 47, 146, 0.25) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Cyan-Blue blend - Competition 4
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(79, 209, 197, 0.45) 0%, rgba(96, 165, 250, 0.35) 25%, rgba(59, 130, 246, 0.2) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Purple-Violet blend - Competition 5
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(139, 92, 246, 0.45) 0%, rgba(120, 119, 198, 0.35) 25%, rgba(168, 85, 247, 0.25) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Blue-Purple blend - Competition 6
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(96, 165, 250, 0.45) 0%, rgba(168, 85, 247, 0.35) 25%, rgba(139, 92, 246, 0.25) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Deep Purple - Competition 7
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(139, 92, 246, 0.35) 25%, rgba(106, 0, 255, 0.3) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Cyan-Purple blend - Competition 8
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(79, 209, 197, 0.45) 0%, rgba(96, 165, 250, 0.35) 25%, rgba(139, 92, 246, 0.25) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Indigo-Cyan blend - Competition 9
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(120, 119, 198, 0.45) 0%, rgba(79, 209, 197, 0.35) 25%, rgba(96, 165, 250, 0.25) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Purple-Pink vibrant - Competition 10
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(139, 92, 246, 0.45) 0%, rgba(168, 85, 247, 0.35) 25%, rgba(255, 47, 146, 0.3) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Blue-Cyan fresh - Competition 11
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(96, 165, 250, 0.45) 0%, rgba(79, 209, 197, 0.35) 25%, rgba(59, 130, 246, 0.25) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Purple dominant vibrant - Competition 12
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(120, 119, 198, 0.35) 25%, rgba(139, 92, 246, 0.3) 50%, rgba(10, 10, 10, 0.95) 100%)",
  // Cyan-Purple elegant - Competition 13
  "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(79, 209, 197, 0.45) 0%, rgba(139, 92, 246, 0.35) 25%, rgba(168, 85, 247, 0.25) 50%, rgba(10, 10, 10, 0.95) 100%)",
];

const eventBackgrounds = [
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(255, 47, 146, 0.35) 0%, rgba(168, 85, 247, 0.25) 30%, rgba(10, 10, 10, 0.9) 100%)",
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(139, 92, 246, 0.35) 0%, rgba(96, 165, 250, 0.25) 30%, rgba(10, 10, 10, 0.9) 100%)",
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(168, 85, 247, 0.35) 0%, rgba(255, 47, 146, 0.25) 30%, rgba(10, 10, 10, 0.9) 100%)",
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(79, 209, 197, 0.35) 0%, rgba(168, 85, 247, 0.25) 30%, rgba(10, 10, 10, 0.9) 100%)",
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(255, 47, 146, 0.35) 0%, rgba(139, 92, 246, 0.25) 30%, rgba(10, 10, 10, 0.9) 100%)",
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(96, 165, 250, 0.35) 0%, rgba(255, 47, 146, 0.25) 30%, rgba(10, 10, 10, 0.9) 100%)",
  "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.25) 30%, rgba(10, 10, 10, 0.9) 100%)",
];

const competitionsList = [
  {
    name: "Scratch that Code",
    category: "Tech/Coding",
    tagline: "Sprintathon",
    desc: "8-hour hackathon sprint where innovation meets speed. Build, code, and create amazing projects in record time.",
    prizePool: "₹50,000",
  },
  {
    name: "CodeBlitz",
    category: "Tech/Coding",
    tagline: "ICPC Simulation",
    desc: "Experience the intensity of competitive programming. Solve complex algorithmic challenges in this ICPC-style competition.",
    prizePool: "₹45,000",
  },
  {
    name: "Peek-a-Code",
    category: "Tech/Coding",
    tagline: "Blind Coding Challenge",
    desc: "Code without seeing your screen! Test your programming skills and memory in this unique blind coding challenge.",
    prizePool: "₹30,000",
  },
  {
    name: "Minute to Win It",
    category: "Tech/Coding",
    tagline: "60 Second Coding Competition",
    desc: "Speed coding at its finest. Solve problems in 60 seconds and prove you can code under pressure.",
    prizePool: "₹25,000",
  },
  {
    name: "AlgoQuest",
    category: "Tech/Coding",
    tagline: "Coding Treasure Hunt",
    desc: "Embark on an algorithmic adventure. Solve puzzles, crack codes, and hunt for the ultimate programming treasure.",
    prizePool: "₹40,000",
  },
  {
    name: "Build or Bust",
    category: "Business",
    tagline: "B-Plan Challenge",
    desc: "Pitch your startup idea to industry experts. Transform your business plan into reality and win exciting prizes.",
    prizePool: "₹50,000",
  },
  {
    name: "Vedam Stock Exchange",
    category: "Business",
    tagline: "Buy or Bail",
    desc: "Navigate the virtual stock market. Make strategic decisions, trade smart, and emerge as the top investor.",
    prizePool: "₹35,000",
  },
  {
    name: "Run Robo Run",
    category: "Robotics",
    tagline: "Robo Race",
    desc: "Race your autonomous robot to victory. Design, build, and compete in this thrilling robotics race competition.",
    prizePool: "₹40,000",
  },
  {
    name: "ROBOCLASH",
    category: "Robotics",
    tagline: "Robo War",
    desc: "Battle of the bots! Compete in intense robot combat where strategy and engineering meet head-on.",
    prizePool: "₹45,000",
  },
  {
    name: "BGMI",
    category: "Esports",
    tagline: "Battle Royale",
    desc: "Showcase your gaming skills in India's most popular mobile battle royale. Team up and dominate the battleground.",
    prizePool: "₹30,000",
  },
  {
    name: "Valorant",
    category: "Esports",
    tagline: "Tactical FPS",
    desc: "Prove your tactical prowess in this competitive FPS. Precision, strategy, and teamwork lead to victory.",
    prizePool: "₹35,000",
  },
  {
    name: "Chess",
    category: "Esports",
    tagline: "Mind Games",
    desc: "Master the 64 squares. Compete in intense chess matches where every move counts and strategy reigns supreme.",
    prizePool: "₹20,000",
  },
  {
    name: "FIFA",
    category: "Esports",
    tagline: "Virtual Football",
    desc: "Score goals and win championships in the virtual football arena. Show off your FIFA skills and claim glory.",
    prizePool: "₹25,000",
  },
];

const eventsList = [
  {
    name: "Tech Insiders",
    category: "Tech Talks",
    tagline: "ICPC Finalist / GSOC",
    desc: "Learn from the best! Join ICPC finalists and Google Summer of Code contributors as they share their journey, insights, and tips for competitive programming success.",
    prizePool: "Free Entry",
  },
  {
    name: "Tech Insiders",
    category: "Tech Talks",
    tagline: "YTD",
    desc: "Discover the latest tech trends and innovations. Industry leaders share their experiences and vision for the future of technology.",
    prizePool: "Free Entry",
  },
  {
    name: "Unplugged",
    category: "Cultural",
    tagline: "Jamming Session",
    desc: "Let the music flow! Join fellow participants for an acoustic jamming session where creativity meets rhythm.",
    prizePool: "Free Entry",
  },
  {
    name: "Spotlight",
    category: "Cultural",
    tagline: "Talent Show",
    desc: "Step into the spotlight! Showcase your hidden talents - singing, dancing, magic, comedy, or anything that makes you shine.",
    prizePool: "Free Entry",
  },
  {
    name: "Stand Up Comedy",
    category: "Cultural",
    tagline: "Laugh Out Loud",
    desc: "Get ready to laugh! Enjoy hilarious stand-up performances from talented comedians. A night filled with humor and entertainment.",
    prizePool: "Free Entry",
  },
  {
    name: "Step Up Showdown",
    category: "Cultural",
    tagline: "Dance Competition",
    desc: "Move to the beat! Compete in this electrifying dance competition where rhythm, style, and passion take center stage.",
    prizePool: "Free Entry",
  },
  {
    name: "After Hours",
    category: "Cultural",
    tagline: "DJ Night",
    desc: "End the fest with a bang! Dance the night away at our electrifying DJ night featuring the best beats and vibes.",
    prizePool: "Free Entry",
  },
];

function App() {
  // Refs
  const heroRef = useRef(null);
  const blobRef = useRef(null);
  const gridRef = useRef(null);
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
    transform: 0,
    opacity: 0.95,
    scale: 1,
  });

  // State to control competitions visibility - initialize based on scroll position
  const [showCompetitions, setShowCompetitions] = useState(() => {
    if (typeof window !== "undefined") {
      const y = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight;
      return y >= heroHeight * 0.9;
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
      const initialShow = y >= heroHeight * 0.9;
      setShowCompetitions(initialShow);
    };

    // Check immediately and after a short delay to ensure DOM is ready
    checkInitialVisibility();
    const timeoutId = setTimeout(checkInitialVisibility, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Dynamic background color based on active card - changes smoothly as user scrolls through competitions
  useEffect(() => {
    const competitionsActiveIndex = competitionsScroll.activeIndex;
    const eventsActiveIndex = eventsScroll.activeIndex;
    const isInHero = heroInViewRef.isInView;

    // Determine which section is active and get background
    let activeBackground = "var(--color-noesis-black)"; // Default hero background

    // If in hero section, always use default black background for smooth transition
    if (isInHero) {
      activeBackground = "var(--color-noesis-black)";
    } else if (
      competitionsActiveIndex !== -1 &&
      competitionsActiveIndex < competitionBackgrounds.length
    ) {
      // Use competition-specific gradient background - changes as user scrolls through each competition
      activeBackground = competitionBackgrounds[competitionsActiveIndex];
    } else if (
      eventsActiveIndex !== -1 &&
      eventsActiveIndex < eventBackgrounds.length
    ) {
      // Use event-specific gradient background
      activeBackground = eventBackgrounds[eventsActiveIndex];
    }

    // Apply background to document root - CSS transition handles smooth color changes
    // Background will smoothly transition between different gradient colors as user scrolls
    document.documentElement.style.setProperty(
      "--page-background",
      activeBackground,
    );

    // Control grid visibility based on section
    // More visible in hero, subtle in competitions/events
    let gridOpacity = 0.25;
    let gradientOpacity = 0.85;

    if (isInHero) {
      gridOpacity = 0.3; // More visible in hero
      gradientOpacity = 0.7; // Less gradient overlay
    } else if (competitionsActiveIndex !== -1 || eventsActiveIndex !== -1) {
      gridOpacity = 0.15; // Subtle in competitions/events
      gradientOpacity = 0.9; // More gradient overlay
    }

    document.documentElement.style.setProperty("--grid-opacity", gridOpacity.toString());
    document.documentElement.style.setProperty("--gradient-opacity", gradientOpacity.toString());
  }, [
    competitionsScroll.activeIndex,
    eventsScroll.activeIndex,
    heroInViewRef.isInView,
  ]);

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
        const competitionsSection = competitionsSectionRef.current;

        // Nav calculations
        const scrollProgress = Math.min(y / heroHeight, 1);
        const isAtBottom = scrollProgress < SCROLL_CONFIG.NAV_SCROLL_THRESHOLD;

        setNavState({
          atBottom: isAtBottom,
          scrolled: y > SCROLL_CONFIG.NAV_SCROLLED_THRESHOLD,
          transform: isAtBottom ? 0 : 0,
          opacity: isAtBottom ? 0.95 : 1,
          scale: isAtBottom ? 1 : 1,
        });

        // Control competitions visibility based on scroll position
        const isInHero = heroInViewRef.isInView;
        const competitionsInView = competitionsRef.isInView;

        // Show competitions when scrolled past hero (prioritize scroll position over isInHero)
        // This fixes the issue where isInHero stays true even when scrolling past hero
        // Hide when scrolling back up to hero (within 80% of hero height)
        const scrolledPastHero = y >= heroHeight * 0.9;
        const isNearHeroTop = y < heroHeight * 0.8;
        const shouldShowCompetitions =
          (scrolledPastHero && !isNearHeroTop) ||
          (competitionsInView && !isInHero);

        setShowCompetitions(shouldShowCompetitions);

        // Enhanced hero parallax with smooth easing
        const parallaxFactor = isInHero ? SCROLL_CONFIG.HERO_BLOB_PARALLAX : 0;
        const smoothParallax = y * parallaxFactor * 0.5; // Reduced intensity for smoother effect
        
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
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
            transform: `translateY(${navState.transform}px) scale(${navState.scale})`,
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
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </header>
      )}

      <main className={`main ${!navState.atBottom ? "main--nav-top" : ""}`}>
        <section
          id="hero"
          ref={(el) => {
            heroRef.current = el;
            heroInViewRef.ref.current = el;
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
          <div
            className="hero__scroll"
            onClick={() => scrollToSection("competitions")}
          >
            <span>Scroll</span>
            <div className="hero__scroll-icon" />
          </div>
        </section>

        <section
          id="competitions"
          className={`section section--competitions ${competitionsRef.isInView && showCompetitions ? "in-view" : ""} ${showCompetitions ? "show" : "hide"}`}
          ref={(el) => {
            competitionsRef.ref.current = el;
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
                  key={comp.name}
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
            eventsRef.ref.current = el;
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
            <ul 
              className="events__list" 
              ref={eventsListRef}
              style={{ '--total-events': eventsList.length }}
            >
              {eventsList.map((event, index) => {
                const position = eventsScroll.cardPositions[index] || 'hidden'
                return (
                  <EventCard
                    key={`${event.name}-${index}`}
                    event={event}
                    index={index}
                    isActive={eventsScroll.activeIndex === index}
                    position={position}
                    parallaxY={eventsScroll.parallaxData[index] || 0}
                    scrollVelocity={scrollVelocity}
                  />
                )
              })}
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
              Ready to be part of Vedam tech fest?
            </p>
            <div className="contact__cta">
              <a
                href="mailto:hello@noesis.in"
                className="contact__link contact__link--primary"
              >
                hello@noesis.in
              </a>
              <a href="#" className="btn btn--primary">
                Register
              </a>
            </div>
            <footer className="footer">
              <p>
                © 2026 NOESIS Vedam tech fest. Where Innovation Meets
                Imagination.
              </p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
