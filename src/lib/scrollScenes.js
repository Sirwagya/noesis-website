import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

const MOTION_PROFILE = {
  desktop: {
    nav: { end: "+=420", scrub: 0.32 },
    wipe: { scrub: 0.24 },
    overview: {
      start: "top+=10% top",
      endFactor: 92,
      scrub: 0.28,
      parallax: { from: -28, to: 24, scrub: 0.45 },
    },
    chapter: {
      revealScrub: 0.34,
      parallaxScrub: 0.45,
      stageScrub: 0.34,
      microPinEnd: "+=20%",
      microPinScrub: 0.46,
      layerShift: {
        deep: { from: -28, to: 26 },
        mid: { from: -22, to: 20 },
        soft: { from: -16, to: 14 },
      },
    },
    featured: { fromY: -5, toY: 9, scrub: 0.36 },
    cards: {
      fromYFactor: -4,
      toYFactor: 8,
      fromXBase: 1.8,
      fromXDepth: 1.2,
      toXBase: 3,
      toXDepth: 1.6,
      scrub: 0.36,
    },
    section: {
      from: -18,
      to: 16,
      scrub: 0.4,
      innerFromY: 24,
      innerScrub: 0.38,
    },
    canvas: {
      scrub: 0.55,
      cityY: 9,
      cityScale: 1.06,
      cityOpacity: 0.54,
      roadsY: -24,
      roadsOpacity: 0.58,
      matrixY: 18,
      auroraY: -10,
      auroraX: 6,
      auroraScale: 1.05,
      beamsY: 14,
      beamsRotate: 5,
      grainY: 20,
      matrixOpacity: 0.34,
      beamsOpacity: 0.58,
      grainOpacity: 0.22,
    },
    pulse: { start: "top 66%", end: "top 34%" },
  },
  mobile: {
    nav: { end: "+=320", scrub: 0.32 },
    wipe: { scrub: 0.2 },
    overview: {
      start: "top+=8% top",
      endFactor: 76,
      scrub: 0.26,
      parallax: { from: -14, to: 12, scrub: 0.4 },
    },
    chapter: {
      revealScrub: 0.3,
      parallax: { from: -12, to: 10, scrub: 0.4 },
    },
    cards: {
      fromYFactor: -2,
      toYFactor: 5,
      fromXBase: 0.8,
      fromXDepth: 0.8,
      toXBase: 1.8,
      toXDepth: 1.1,
      scrub: 0.35,
    },
    section: { from: -10, to: 9, scrub: 0.4 },
    canvas: {
      scrub: 0.45,
      cityY: 6,
      cityScale: 1.03,
      cityOpacity: 0.44,
      roadsY: -14,
      roadsOpacity: 0.46,
      matrixY: 10,
      auroraY: -7,
      auroraX: 4,
      auroraScale: 1.03,
      beamsY: 8,
      beamsRotate: 3,
      grainY: 12,
      matrixOpacity: 0.3,
      beamsOpacity: 0.54,
      grainOpacity: 0.2,
    },
    pulse: { start: "top 72%", end: "top 40%" },
  },
};

function ensureRegistered() {
  if (!isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
}

function getDesktopLayerShift(preset) {
  const shift = MOTION_PROFILE.desktop.chapter.layerShift[preset];
  return shift ?? MOTION_PROFILE.desktop.chapter.layerShift.mid;
}

function createNavScene(nav, config) {
  if (!nav) {
    return;
  }

  gsap.fromTo(
    nav,
    {
      "--nav-bg-alpha": 0.18,
      "--nav-blur": "8px",
      "--nav-border-alpha": 0.08,
      "--nav-shadow-alpha": 0.08,
    },
    {
      "--nav-bg-alpha": 0.66,
      "--nav-blur": "18px",
      "--nav-border-alpha": 0.22,
      "--nav-shadow-alpha": 0.28,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: config.end,
        scrub: config.scrub,
      },
    }
  );
}

function createCanvasScene(layers, config) {
  const hasAnyLayer = Object.values(layers).some(Boolean);
  if (!hasAnyLayer) {
    return;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: config.scrub,
    },
  });

  if (layers.city) {
    timeline.to(
      layers.city,
      {
        yPercent: config.cityY,
        scale: config.cityScale,
        opacity: config.cityOpacity,
        ease: "none",
      },
      0
    );
  }

  // Roads move slightly faster than skyline to create depth separation.
  if (layers.roads) {
    timeline.to(
      layers.roads,
      { yPercent: config.roadsY, opacity: config.roadsOpacity, ease: "none" },
      0
    );
  }

  if (layers.matrix) {
    timeline.to(
      layers.matrix,
      { yPercent: config.matrixY, opacity: config.matrixOpacity, ease: "none" },
      0
    );
  }

  if (layers.aurora) {
    timeline.to(
      layers.aurora,
      {
        yPercent: config.auroraY,
        xPercent: config.auroraX,
        scale: config.auroraScale,
        ease: "none",
      },
      0
    );
  }

  if (layers.beams) {
    timeline.to(
      layers.beams,
      {
        yPercent: config.beamsY,
        rotate: config.beamsRotate,
        opacity: config.beamsOpacity,
        ease: "none",
      },
      0
    );
  }

  if (layers.grain) {
    timeline.to(
      layers.grain,
      { yPercent: config.grainY, opacity: config.grainOpacity, ease: "none" },
      0
    );
  }
}

function createChapterPulseToggles(chapters, pulseConfig) {
  chapters.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: pulseConfig.start,
      end: pulseConfig.end,
      toggleClass: { targets: section, className: "is-active-chapter" },
    });
  });
}

function createWipeScene({ hero, overview, wipeElement, scrub }) {
  if (!hero || !overview || !wipeElement) {
    return;
  }

  gsap.set(wipeElement, { autoAlpha: 0, yPercent: 100 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: overview,
        start: "top 96%",
        end: "top 36%",
        scrub,
      },
    })
    .to(
      hero,
      {
        "--hero-atmos-opacity": 0.38,
        ease: "none",
      },
      0
    )
    .to(
      overview,
      {
        "--overview-atmos-opacity": 0.88,
        ease: "none",
      },
      0
    )
    .to(
      wipeElement,
      {
        autoAlpha: 0.8,
        yPercent: 0,
        ease: "none",
      },
      0.08
    )
    .to(
      wipeElement,
      {
        autoAlpha: 0,
        yPercent: -104,
        ease: "none",
      },
      0.56
    );
}

export function setupScrollScenes({
  heroRef,
  overviewRef,
  chapterElements,
  onTrackProgress,
}) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    return () => {};
  }

  ensureRegistered();

  const mm = gsap.matchMedia();
  const nav = document.querySelector(".site-nav");
  const pageShell = document.querySelector(".page-shell");
  const staticSections = Array.from(document.querySelectorAll(".section"));
  const allChapters = Array.from(document.querySelectorAll(".chapter, .section"));
  const storyCanvasLayers = {
    matrix: document.querySelector(".story-canvas__layer--matrix"),
    city: document.querySelector(".story-canvas__layer--city"),
    roads: document.querySelector(".story-canvas__layer--roads"),
    aurora: document.querySelector(".story-canvas__layer--aurora"),
    beams: document.querySelector(".story-canvas__layer--beams"),
    grain: document.querySelector(".story-canvas__layer--grain"),
  };

  mm.add("(min-width: 1024px)", () => {
    const config = MOTION_PROFILE.desktop;
    const hero = heroRef.current;
    const overview = overviewRef.current;
    const wipeElement = document.querySelector(".wipe-transition");

    if (!hero || !overview) {
      return;
    }

    if (pageShell) {
      gsap.set(pageShell, {
        "--hero-atmos-opacity": 1,
        "--overview-atmos-opacity": 0.48,
      });
    }

    createNavScene(nav, config.nav);
    createChapterPulseToggles(allChapters, config.pulse);
    createCanvasScene(storyCanvasLayers, config.canvas);
    createWipeScene({
      hero,
      overview,
      wipeElement,
      scrub: config.wipe.scrub,
    });

    const heroScrollHint = hero.querySelector(".hero__scroll-hint");
    const overviewHeadline = overview.querySelector(".program-overview__headline");
    const overviewSummary = overview.querySelector(".program-overview__summary");
    const railItems = overview.querySelectorAll(".track-rail__item");
    gsap.set([overviewHeadline, overviewSummary], { y: 16, autoAlpha: 0 });
    gsap.set(railItems, { y: 14, autoAlpha: 0 });

    // hero entry is static; no pin or scroll-driven reveal for hero content

    if (heroScrollHint) {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top+=2",
        end: "bottom top",
        onEnter: () => gsap.to(heroScrollHint, { autoAlpha: 0, duration: 0.2, ease: "none" }),
        onLeaveBack: () => gsap.to(heroScrollHint, { autoAlpha: 1, duration: 0.2, ease: "none" }),
      });
    }

    const trackCount = Math.max(chapterElements.length, 1);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: overview,
          start: config.overview.start,
          end: `+=${trackCount * config.overview.endFactor}%`,
          scrub: config.overview.scrub,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const activeIndex = Math.min(
              trackCount - 1,
              Math.floor(self.progress * trackCount)
            );
            const activeTrack = chapterElements[activeIndex];

            if (activeTrack && onTrackProgress) {
              onTrackProgress(activeTrack.trackId, self.progress);
            }
          },
        },
      })
      .fromTo(
        overviewHeadline,
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.18, ease: "none" },
        0.02
      )
      .fromTo(
        overviewSummary,
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.2, ease: "none" },
        0.08
      )
      .fromTo(
        railItems,
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.2, ease: "none" },
        0.18
      );

    gsap.fromTo(
      overview,
      { "--overview-parallax": `${config.overview.parallax.from}px` },
      {
        "--overview-parallax": `${config.overview.parallax.to}px`,
        ease: "none",
        scrollTrigger: {
          trigger: overview,
          start: "top bottom",
          end: "bottom top",
          scrub: config.overview.parallax.scrub,
        },
      }
    );

    chapterElements.forEach(({ trackId, element }) => {
      if (!element) {
        return;
      }

      const cards = Array.from(element.querySelectorAll(".program-card"));
      const shift = getDesktopLayerShift(element.dataset.parallaxPreset);

      ScrollTrigger.create({
        trigger: element,
        start: "top 56%",
        end: "bottom 56%",
        onEnter: () => onTrackProgress?.(trackId, 1),
        onEnterBack: () => onTrackProgress?.(trackId, 1),
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 76%",
            end: "top 42%",
            scrub: config.chapter.revealScrub,
          },
        })
        .fromTo(
          element.querySelectorAll(
            ".track-chapter__eyebrow, .track-chapter__title, .track-chapter__description"
          ),
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.32, ease: "none" },
          0
        )
        .fromTo(
          cards,
          { y: 16, opacity: 0.16 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.26, ease: "none" },
          0.08
        );

      gsap.fromTo(
        element,
        { "--chapter-parallax": `${shift.from}px` },
        {
          "--chapter-parallax": `${shift.to}px`,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: config.chapter.parallaxScrub,
          },
        }
      );

    });

    staticSections.forEach((section) => {
      gsap.fromTo(
        section,
        { "--section-parallax": `${config.section.from}px` },
        {
          "--section-parallax": `${config.section.to}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: config.section.scrub,
          },
        }
      );

      const sectionInner = section.querySelector(".section__inner");
      if (sectionInner) {
        gsap.fromTo(
          sectionInner,
          { y: config.section.innerFromY, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "top 42%",
              scrub: config.section.innerScrub,
            },
          }
        );
      }
    });
  });

  mm.add("(max-width: 1023px)", () => {
    const config = MOTION_PROFILE.mobile;
    const hero = heroRef.current;
    const overview = overviewRef.current;
    const wipeElement = document.querySelector(".wipe-transition");

    if (!hero || !overview) {
      return;
    }

    if (pageShell) {
      gsap.set(pageShell, {
        "--hero-atmos-opacity": 1,
        "--overview-atmos-opacity": 0.48,
      });
    }

    createNavScene(nav, config.nav);
    createChapterPulseToggles(allChapters, config.pulse);
    createCanvasScene(storyCanvasLayers, config.canvas);
    createWipeScene({
      hero,
      overview,
      wipeElement,
      scrub: config.wipe.scrub,
    });

    const heroScrollHint = hero.querySelector(".hero__scroll-hint");
    const mobileOverviewHeadline = overview.querySelector(".program-overview__headline");
    const mobileOverviewSummary = overview.querySelector(".program-overview__summary");
    const mobileRailItems = overview.querySelectorAll(".track-rail__item");
    gsap.set([mobileOverviewHeadline, mobileOverviewSummary], { y: 12, autoAlpha: 0 });
    gsap.set(mobileRailItems, { y: 10, autoAlpha: 0 });

    if (heroScrollHint) {
      ScrollTrigger.create({
        trigger: hero,
        start: "top top+=2",
        end: "bottom top",
        onEnter: () => gsap.to(heroScrollHint, { autoAlpha: 0, duration: 0.2, ease: "none" }),
        onLeaveBack: () => gsap.to(heroScrollHint, { autoAlpha: 1, duration: 0.2, ease: "none" }),
      });
    }

    const trackCount = Math.max(chapterElements.length, 1);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: overview,
          start: config.overview.start,
          end: `+=${trackCount * config.overview.endFactor}%`,
          scrub: config.overview.scrub,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const activeIndex = Math.min(
              trackCount - 1,
              Math.floor(self.progress * trackCount)
            );
            const activeTrack = chapterElements[activeIndex];

            if (activeTrack && onTrackProgress) {
              onTrackProgress(activeTrack.trackId, self.progress);
            }
          },
        },
      })
      .fromTo(
        [mobileOverviewHeadline, mobileOverviewSummary],
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.18, ease: "none" },
        0.02
      )
      .fromTo(
        mobileRailItems,
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.18, ease: "none" },
        0.12
      );

    gsap.fromTo(
      overview,
      { "--overview-parallax": `${config.overview.parallax.from}px` },
      {
        "--overview-parallax": `${config.overview.parallax.to}px`,
        ease: "none",
        scrollTrigger: {
          trigger: overview,
          start: "top bottom",
          end: "bottom top",
          scrub: config.overview.parallax.scrub,
        },
      }
    );

    chapterElements.forEach(({ trackId, element }) => {
      if (!element) {
        return;
      }

      ScrollTrigger.create({
        trigger: element,
        start: "top 68%",
        end: "bottom 50%",
        onEnter: () => onTrackProgress?.(trackId, 1),
        onEnterBack: () => onTrackProgress?.(trackId, 1),
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            end: "top 44%",
            scrub: config.chapter.revealScrub,
          },
        })
        .fromTo(
          element.querySelectorAll(".track-chapter__title-tower, .program-card"),
          { y: 18, opacity: 0.2 },
          { y: 0, opacity: 1, stagger: 0.04, duration: 0.18, ease: "none" },
          0
        );

      gsap.fromTo(
        element,
        { "--chapter-parallax": `${config.chapter.parallax.from}px` },
        {
          "--chapter-parallax": `${config.chapter.parallax.to}px`,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: config.chapter.parallax.scrub,
          },
        }
      );

    });

    staticSections.forEach((section) => {
      gsap.fromTo(
        section,
        { "--section-parallax": `${config.section.from}px` },
        {
          "--section-parallax": `${config.section.to}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: config.section.scrub,
          },
        }
      );
    });
  });

  return () => {
    mm.revert();
    ScrollTrigger.refresh();
  };
}
