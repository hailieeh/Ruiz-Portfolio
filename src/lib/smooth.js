import { gsap } from "gsap";

// Set to true to switch the animations off for visitors whose device asks for
// reduced motion (the OS "show animations" / "reduce motion" setting). It is
// false so the animations always play, the same way the preloader always plays.
export const RESPECT_REDUCED_MOTION = false;

export const prefersReducedMotion = () =>
  RESPECT_REDUCED_MOTION &&
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// lets the CSS follow the same switch
if (typeof document !== "undefined") {
  document.documentElement.classList.toggle("reduce-motion", prefersReducedMotion());
}

export { gsap };
