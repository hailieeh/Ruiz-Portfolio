import { useCallback, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Hero from "../sections/Hero.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import Projects from "../sections/Projects.jsx";
import Contact from "../sections/Contact.jsx";
import { NAV } from "../data/nav.js";
import { gsap, prefersReducedMotion } from "../lib/smooth.js";
import { panel } from "../lib/ui.js";

const PANELS = [Hero, About, Skills, Projects, Contact];

// Page swap: a green and an ink circle grow out of the spot you clicked until they
// cover the stage, the panel is swapped while it is fully covered, then the circles
// close back down onto the same spot, revealing the new page.
const EASE = "power4.inOut";
const DUR = 0.55;
const LAG = 0.1; // second layer trails the first
const circle = (r, o) => `circle(${r}% at ${o.x}px ${o.y}px)`;
// one circle layer growing or shrinking; resolves when it has finished
const run = (el, from, to, delay = 0) =>
  new Promise((done) =>
    gsap.fromTo(el, { clipPath: from }, { clipPath: to, duration: DUR, delay, ease: EASE, overwrite: true, onComplete: done })
  );
const nextPaint = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

export default function Home() {
  const { ready, index } = useOutletContext();
  const [shown, setShown] = useState(index);
  const shownRef = useRef(index);
  const latest = useRef(index);
  const busy = useRef(false);
  const scope = useRef(null);
  const [hold, setHold] = useState(false);
  const origin = useRef({ x: 0, y: 0, set: false });
  latest.current = index;

  // remember where the person clicked, so the circle opens from there
  useEffect(() => {
    const onDown = (e) => {
      const el = scope.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      origin.current = { x: e.clientX - r.left, y: e.clientY - r.top, set: true };
    };
    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, [scope]);

  const show = useCallback((i) => {
    shownRef.current = i;
    setShown(i);
  }, []);

  const swap = useCallback(async () => {
    busy.current = true;
    // keeps going if the person clicks another page while a swap is running
    while (latest.current !== shownRef.current) {
      if (prefersReducedMotion()) {
        show(latest.current);
        break;
      }
      // keyboard or script navigation has no click: open from the middle of the stage
      const box = scope.current.getBoundingClientRect();
      const o = origin.current.set ? origin.current : { x: box.width / 2, y: box.height / 2 };
      const a = scope.current.querySelector("[data-cur=a]");
      const b = scope.current.querySelector("[data-cur=b]");
      await Promise.all([
        run(a, circle(0, o), circle(150, o)),
        run(b, circle(0, o), circle(150, o), LAG),
      ]);
      // the new page mounts paused (hold), so its text animations start when the circles open
      setHold(true);
      show(latest.current);
      await nextPaint();
      setHold(false);
      await Promise.all([
        run(b, circle(150, o), circle(0, o)),
        run(a, circle(150, o), circle(0, o), LAG),
      ]);
      origin.current.set = false;
    }
    busy.current = false;
  }, [show]);

  useEffect(() => {
    if (!ready) {
      show(index); // nothing is on screen yet, no curtain needed
      return;
    }
    if (!busy.current && index !== shownRef.current) swap();
  }, [index, ready, swap, show]);

  if (!ready) return null;
  const Panel = PANELS[shown];

  return (
    <>
      <div key={NAV[shown].id} id={NAV[shown].id} className={panel} data-hold={hold ? "" : undefined}>
        <Panel />
      </div>
      <div ref={scope} className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
        <div data-cur="a" className="absolute inset-0 bg-accent will-change-[clip-path] [clip-path:circle(0%_at_50%_50%)]" />
        <div data-cur="b" className="absolute inset-0 bg-dark will-change-[clip-path] [clip-path:circle(0%_at_50%_50%)]" />
      </div>
    </>
  );
}
