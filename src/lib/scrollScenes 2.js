import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}

export function setupScrollScenes({ heroRef, overviewRef, chapterElements, onTrackProgress }) {
  if (typeof window === "undefined") {
    return () => {};
  }

  if (prefersReducedMotion()) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    const hero = heroRef?.current;
    if (hero) {
      gsap.to(hero, {
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
        "--chapter-parallax": "-140px",
        "--hero-atmos-opacity": 0.35,
        ease: "none",
      });
    }

    const overview = overviewRef?.current;
    if (overview) {
      gsap.to(overview, {
        scrollTrigger: {
          trigger: overview,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
        "--overview-parallax": "-120px",
        "--overview-atmos-opacity": 0.9,
        ease: "none",
      });
    }

    chapterElements?.forEach(({ trackId, element }) => {
      if (!element) return;

      ScrollTrigger.create({
        trigger: element,
        start: "top 40%",
        end: "bottom 30%",
        onEnter: () => onTrackProgress?.(trackId),
        onEnterBack: () => onTrackProgress?.(trackId),
        toggleClass: { targets: element, className: "is-active-chapter" },
      });

      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
        "--chapter-parallax": "-120px",
        ease: "none",
      });
    });
  });

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
