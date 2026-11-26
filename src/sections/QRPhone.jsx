import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/smooth.js";

// deterministic pseudo-random QR-style matrix (decorative)
function buildMatrix(n = 25) {
  let seed = 20040722;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const m = Array.from({ length: n }, () => Array.from({ length: n }, () => rnd() > 0.52));
  const finder = (r0, c0) => {
    for (let r = -1; r <= 7; r++)
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r, cc = c0 + c;
        if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue;
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const core = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        m[rr][cc] = r >= 0 && r <= 6 && c >= 0 && c <= 6 && (edge || core);
      }
  };
  finder(0, 0);
  finder(0, n - 7);
  finder(n - 7, 0);
  return m;
}

// [selector, assembled z, exploded z] - the glass leaves first, like the
// "exploded view" in the /breakdown skill.
const LAYERS = [
  ["[data-layer=glass]", 3, 64],
  ["[data-layer=notch]", 2, 34],
  ["[data-layer=screen]", 1, 14],
  ["[data-layer=frame]", 0, -26],
  ["[data-layer=back]", -1, -70],
];

// labels come straight from the project's own points (content.js)
const TAGS = [
  { n: "01", text: "QR check-in", top: "14%" },
  { n: "02", text: "Attendance", top: "46%" },
  { n: "03", text: "Events", top: "80%" },
];

export default function QRPhone() {
  const m = useMemo(() => buildMatrix(), []);
  const n = m.length;
  const wrap = useRef(null);

  // Ported from the /breakdown skill: the phone turns, comes apart layer by
  // layer, each part gets a leader line and a label, then it snaps back together.
  // Hover pauses it so you can read the labels.
  useLayoutEffect(() => {
    const root = wrap.current;
    if (prefersReducedMotion()) {
      root.querySelectorAll("[data-tag]").forEach((t) => (t.style.display = "none"));
      return;
    }

    const ctx = gsap.context(() => {
      const rig = root.querySelector("[data-rig]");
      const tags = gsap.utils.toArray("[data-tag]");
      const lines = gsap.utils.toArray("[data-line]");

      gsap.set(rig, { transformPerspective: 900 });
      LAYERS.forEach(([sel, z0]) => gsap.set(sel, { z: z0 }));
      gsap.set(tags, { autoAlpha: 0, x: -8 });
      gsap.set(lines, { scaleX: 0, transformOrigin: "0% 50%" });

      const tl = gsap.timeline({ repeat: -1, delay: 1.5 });
      // apart
      tl.to(rig, { rotationY: -32, rotationX: 6, x: -40, scale: 0.9, duration: 1.1, ease: "power3.inOut" }, 0);
      LAYERS.forEach(([sel, , z1], i) => tl.to(sel, { z: z1, duration: 1, ease: "power3.inOut" }, i * 0.08));
      tl.to(tags, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.8);
      tl.to(lines, { scaleX: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }, 0.8);
      // hold, then back together
      tl.to(tags, { autoAlpha: 0, duration: 0.3, ease: "power1.in" }, 3.9);
      tl.to(rig, { rotationY: 0, rotationX: 0, x: 0, scale: 1, duration: 1, ease: "power3.inOut" }, 4.2);
      LAYERS.forEach(([sel, z0], i) => tl.to(sel, { z: z0, duration: 1, ease: "power3.inOut" }, 4.2 + (LAYERS.length - 1 - i) * 0.08));
      tl.to({}, { duration: 2.2 }, 5.6); // rest while assembled, so the scan animation reads

      const pause = () => tl.pause();
      const play = () => tl.play();
      root.addEventListener("pointerenter", pause);
      root.addEventListener("pointerleave", play);
      return () => {
        root.removeEventListener("pointerenter", pause);
        root.removeEventListener("pointerleave", play);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative z-1 [--u:min(clamp(7px,1.7vh,14px),10.5px)] [font-size:var(--u)] md:[--u:clamp(7px,1.7vh,14px)]"
      ref={wrap}
      aria-hidden="true"
    >
      <div data-rig className="[transform-style:preserve-3d] will-change-transform">
        <div className="relative aspect-[9/18] w-[15.6em] rounded-[2.1em] [transform-style:preserve-3d] animate-[floaty_6s_ease-in-out_infinite]">
          <div data-layer="back" className="pointer-events-none absolute inset-0 rounded-[2.1em] bg-[#1d1d1b] shadow-[0_0_0_2px_#2a2a28,0_40px_70px_-20px_rgba(0,0,0,.7)]" />
          <div data-layer="frame" className="pointer-events-none absolute inset-0 rounded-[2.1em] bg-black shadow-[0_0_0_2px_#2a2a28]" />
          <div data-layer="screen" className="absolute inset-[.55em] flex flex-col items-center gap-[.35em] rounded-[1.6em] bg-bg px-[1em] pt-[2.4em] pb-[1em] text-center text-ink">
            <p className="text-[.62em] font-bold tracking-[.24em] text-accent uppercase">FaithEvents</p>
            <p className="mb-[.5em] font-display text-[1.5em] leading-[1.05] uppercase">Scan to check in</p>
            <div className="relative aspect-square w-full rounded-[.65em] bg-white p-[.75em]">
              <svg viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges" className="size-full fill-ink">
                {m.map((row, r) =>
                  row.map((on, c) => on && <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" />)
                )}
              </svg>
              <span className="absolute inset-x-[.4em] top-[.5em] h-[.2em] rounded-[3px] bg-accent animate-[scan_3.6s_ease-in-out_infinite]" />
              <i className="absolute size-[1em] border-[.2em] border-accent top-0 left-0 rounded-tl-[.5em] border-r-0 border-b-0" />
              <i className="absolute size-[1em] border-[.2em] border-accent top-0 right-0 rounded-tr-[.5em] border-b-0 border-l-0" />
              <i className="absolute size-[1em] border-[.2em] border-accent bottom-0 left-0 rounded-bl-[.5em] border-t-0 border-r-0" />
              <i className="absolute size-[1em] border-[.2em] border-accent right-0 bottom-0 rounded-br-[.5em] border-t-0 border-l-0" />
            </div>
            <p className="mt-auto inline-flex gap-[.4em] rounded-full bg-accent px-[.9em] py-[.5em] text-[.68em] font-bold tracking-[.04em] text-white animate-[ok_3.6s_ease-in-out_infinite]">
              <span>✓</span> Attendance recorded
            </p>
          </div>
          <div data-layer="notch" className="absolute top-[.85em] left-1/2 h-[1.05em] w-[34%] -translate-x-1/2 rounded-[.75em] bg-black" />
          <div data-layer="glass" className="pointer-events-none absolute inset-0 rounded-[2.1em] border border-white/20 bg-[linear-gradient(115deg,rgba(255,255,255,.16),rgba(255,255,255,0)_38%,rgba(255,255,255,.05)_72%)]" />
        </div>
      </div>

      {TAGS.map((t) => (
        <span
          data-tag
          className="absolute left-[calc(100%_+_.3em)] flex items-center gap-[.55em] text-[length:max(9px,.66em)] tracking-[.16em] whitespace-nowrap text-on-dark uppercase"
          key={t.n}
          style={{ top: t.top }}
        >
          <i data-line className="block h-px w-[1.8em] bg-white/50" />
          <b className="-mr-[.2em] font-bold text-mint">{t.n}</b> {t.text}
        </span>
      ))}
    </div>
  );
}
