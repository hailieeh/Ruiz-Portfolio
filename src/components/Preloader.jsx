import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

// The "hr" lettermark (same shape as Logo.jsx / logo/*.svg), already solid. A pen
// line traces the letters (the h's stem, then its arch and shared leg, finishing on
// the r's arm) and reveals the solid logo as it goes. Then the camera zooms into the
// foot of the shared leg until the screen is full of the logo colour.
import { LOGO_PATH } from "./Logo.jsx";

// Centre lines of the logo's strokes: the pen that reveals the logo through a mask.
// One path per stroke, each drawn once and never retraced, so the pen never
// stalls on ground it already covered. len is the stroke length in logo units.
const PEN = [
  { id: "stem", d: "M90.5 44V346", len: 302, at: 0 }, // h stem, top to bottom
  { id: "arch", d: "M90.5 202A80.5 80.5 0 0 1 251.5 202", len: 253, at: 302 }, // h arch
  { id: "leg", d: "M251.5 202V346", len: 144, at: 555 }, // shared leg
  { id: "arm", d: "M251.5 202A80.5 80.5 0 0 1 332 121.5", len: 126.5, at: 555 }, // r arm
];
const LOGO_H = 302; // logo height in logo units (width is 267)
const CENTER = { x: 198.5, y: 195 }; // middle of the logo
const TIP = { x: 251.5, y: 335 }; // a point inside the shared leg, near its foot
const END = 10; // when the view is this many logo units across, it sits inside the leg

const lerp = (a, b, t) => a + (b - a) * t;

export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null);
  const svg = useRef(null);
  const logo = useRef(null);

  useLayoutEffect(() => {
    let cancelled = false;

    // The svg fills the screen; the viewBox decides how big the logo looks and
    // lets us zoom with pure vector maths, so the line stays sharp at any zoom.
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const logoPx = Math.min(240, Math.max(150, Math.min(vw, vh) * 0.3));
    const ppu = logoPx / LOGO_H; // screen pixels per logo unit
    const vbW = vw / ppu;
    const vbH = vh / ppu;

    // zoom until the view fits inside the leg, so the screen is all logo colour
    const zEnd = Math.log(Math.hypot(vbW, vbH) / END);

    const cam = { z: 0, s: 0 }; // z = log zoom, s = 0..1 pan from centre to tip
    const apply = () => {
      const k = Math.exp(cam.z);
      const w = vbW / k;
      const h = vbH / k;
      const cx = lerp(CENTER.x, TIP.x, cam.s);
      const cy = lerp(CENTER.y, TIP.y, cam.s);
      svg.current.setAttribute("viewBox", `${cx - w / 2} ${cy - h / 2} ${w} ${h}`);
    };
    apply();

    const ctx = gsap.context(() => {
      const strokes = [...root.current.querySelectorAll("[data-pen]")];
      gsap.set(strokes, { strokeDashoffset: 100 });

      // 1. the pen traces the logo. Every stroke is drawn at the same speed (duration
      // follows its length), back to back, and the whole timeline is then eased once,
      // so the line speeds up and settles smoothly instead of lurching between strokes.
      const draw = gsap.timeline({ paused: true });
      PEN.forEach((seg, i) => {
        draw.to(strokes[i], { strokeDashoffset: 0, autoRound: false, duration: seg.len, ease: "none" }, seg.at);
      });

      const tl = gsap.timeline({ onComplete: () => !cancelled && onDone() });
      tl
        .to(draw, { progress: 1, duration: 2.4, ease: "sine.inOut" }, 0.5)
        // the mask is only needed while drawing; dropping it makes the zoom a plain
        // filled shape, which is what keeps the zoom at full frame rate
        .call(() => gsap.set(logo.current, { attr: { mask: "none" } }))
        .addLabel("zoom", ">0.25")
        // 2. zoom into the foot of the shared leg: pan and zoom share one curve
        .to(cam, { s: 1, duration: 1.9, ease: "power2.inOut", onUpdate: apply }, "zoom")
        .to(cam, { z: zEnd, duration: 1.9, ease: "power2.inOut", onUpdate: apply }, "zoom")
        // 3. as the screen fills with the line, the site is revealed underneath
        .call(() => !cancelled && onReveal(), null, "zoom+1.75")
        .to(root.current, { opacity: 0, duration: 0.6, ease: "power1.out" }, "zoom+1.9");
    }, root);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [onReveal, onDone]);

  return (
    <div ref={root} className="visible fixed inset-0 z-100 bg-bg" role="status" aria-label="Loading portfolio">
      <svg ref={svg} className="absolute inset-0 block size-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <mask id="pre-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
            {PEN.map((seg) => (
              <path key={seg.id} data-pen="" className="fill-none stroke-white stroke-[56] [stroke-dasharray:100_120] [stroke-dashoffset:100] [stroke-linecap:round] [stroke-linejoin:round]" pathLength="100" d={seg.d} />
            ))}
          </mask>
        </defs>
        <g ref={logo} mask="url(#pre-reveal)">
          <path className="fill-dark stroke-none [shape-rendering:geometricPrecision]" d={LOGO_PATH} />
        </g>
      </svg>
    </div>
  );
}
