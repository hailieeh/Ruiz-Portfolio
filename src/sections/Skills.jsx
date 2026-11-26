import { useLayoutEffect, useRef } from "react";
import { Code2, Palette, Clapperboard, Headset, Megaphone } from "lucide-react";
import { gsap, prefersReducedMotion } from "../lib/smooth.js";
import { skills, toolGroups } from "../data/content.js";
import { section, inner, secHead, secEyebrow, secTitle, secRule, colTitle, hairline } from "../lib/ui.js";

const icons = { code: Code2, palette: Palette, film: Clapperboard, headset: Headset, megaphone: Megaphone };

const SPARKS = 10;
const STEP = 0.6; // seconds between hops

// Ported from the /minimalistic-graphics skill: one dot hops up the "steps"
// (here, the skill rows), squashing and stretching as it lands, and at the top
// an orbit ring draws around it and a few sparks burst out.
// After the intro the dot follows whichever row you hover.
export default function Skills() {
  const list = useRef(null);

  useLayoutEffect(() => {
    const ul = list.current;
    const hop = ul.querySelector("[data-hop]");
    const rows = [...ul.querySelectorAll("[data-row]")];
    const idxs = rows.map((r) => r.querySelector("[data-idx]"));
    const centerOf = (row) => row.offsetTop + row.offsetHeight / 2;

    if (prefersReducedMotion()) {
      gsap.set(hop, { display: "none" });
      return;
    }

    let ready = false;
    const cleanups = [];

    const ctx = gsap.context(() => {
      const dot = hop.querySelector("[data-dot]");
      const ring = hop.querySelector("[data-ring]");
      const orbit = hop.querySelector("[data-orbit]");
      const orbitLine = orbit.querySelector("circle");
      const sparks = [...hop.querySelectorAll("[data-spark]")];

      gsap.set(hop, { y: () => centerOf(rows[0]), x: 0 });
      gsap.set(dot, { scale: 0 });
      gsap.set(ring, { opacity: 0 });
      gsap.set(sparks, { opacity: 0 });
      gsap.set(orbitLine, { strokeDashoffset: 100 });
      gsap.set(idxs, { transformOrigin: "0% 50%" });

      const tl = gsap.timeline({ delay: 1.3, onComplete: () => (ready = true) });
      const pulse = (t) =>
        tl.fromTo(ring, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 3.2, duration: 0.5, ease: "power2.out", immediateRender: false }, t);
      const bump = (k, t) =>
        tl.fromTo(idxs[k], { scale: 1.6 }, { scale: 1, duration: 0.45, ease: "back.out(3)", immediateRender: false }, t);

      // the dot arrives as a big dot that settles, a hairline ring breathes out of it
      tl.to(dot, { scale: 2.1, duration: 0.16, ease: "power2.out" }, 0);
      tl.to(dot, { scale: 1, duration: 0.26, ease: "power3.inOut" }, 0.16);
      pulse(0.2);
      bump(0, 0.2);

      // each hop: squash, leap, stretch, land with a little overshoot
      for (let k = 1; k < rows.length; k++) {
        const th = 0.5 + STEP * (k - 1);
        tl.to(dot, { scaleY: 0.78, scaleX: 1.18, duration: 0.05, ease: "power1.out" }, th - 0.05);
        tl.to(hop, { y: () => centerOf(rows[k]), duration: 0.3, ease: "power1.inOut" }, th);
        tl.to(hop, { x: 12, duration: 0.15, ease: "power2.out" }, th);
        tl.to(hop, { x: 0, duration: 0.15, ease: "power2.in" }, th + 0.15);
        tl.to(dot, { scaleY: 1.12, scaleX: 0.9, duration: 0.1, ease: "power1.out" }, th);
        tl.to(dot, { scaleY: 1, scaleX: 1, duration: 0.1, ease: "power1.in" }, th + 0.1);
        tl.to(dot, { scaleY: 0.74, scaleX: 1.22, duration: 0.05, ease: "power1.out" }, th + 0.3);
        tl.to(dot, { scaleY: 1, scaleX: 1, duration: 0.18, ease: "back.out(3)" }, th + 0.35);
        pulse(th + 0.3);
        bump(k, th + 0.3);
      }

      // the payoff on the last row: orbit draws, ring pulses, sparks burst
      const TP = 0.5 + STEP * (rows.length - 2) + 0.62;
      pulse(TP);
      tl.to(orbitLine, { strokeDashoffset: 0, duration: 0.55, ease: "power2.inOut" }, TP + 0.05);
      tl.fromTo(orbit, { rotation: 0 }, { rotation: 40, duration: 1.6, ease: "none" }, TP);
      sparks.forEach((s, i) => {
        const a = (i / SPARKS) * Math.PI * 2 + (i % 2) * 0.12;
        const d = 30 + (i % 4) * 9;
        tl.fromTo(s, { x: 0, y: 0, opacity: 0 }, { x: Math.cos(a) * d, y: Math.sin(a) * d, opacity: 1, duration: 0.5, ease: "power3.out" }, TP + 0.05);
        tl.to(s, { opacity: 0, duration: 0.5, ease: "power1.out" }, TP + 0.55);
      });

      // after the intro the dot hops to whichever row you hover
      rows.forEach((row, k) => {
        const onEnter = () => {
          if (!ready) return;
          gsap.to(hop, { y: () => centerOf(row), duration: 0.45, ease: "back.out(1.7)", overwrite: "auto" });
          gsap.fromTo(idxs[k], { scale: 1.5 }, { scale: 1, duration: 0.4, ease: "back.out(3)", overwrite: "auto" });
        };
        row.addEventListener("pointerenter", onEnter);
        cleanups.push(() => row.removeEventListener("pointerenter", onEnter));
      });
    }, ul);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section className={section}>
      <div className={inner}>
        <header className={`${secHead} rise`} style={{ "--i": 0 }}>
          <p className={secEyebrow}>02</p>
          <h2 className={secTitle}>Skills &amp; tools</h2>
          <span className={`${secRule} bg-accent`} aria-hidden="true" />
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(1.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h3 className={`${colTitle} rise`} style={{ "--i": 1 }}>What I do</h3>
            <ul className={hairline} ref={list}>
              <li data-hop className="pointer-events-none absolute top-0 -left-[15px] z-3 size-0" aria-hidden="true" role="presentation">
                <span data-ring className="absolute top-0 left-0 -mt-[4.5px] -ml-[4.5px] size-[9px] rounded-full border border-accent opacity-0" />
                <svg data-orbit className="absolute top-0 left-0 -mt-5 -ml-5 hidden size-10 overflow-visible md:block [&_circle]:fill-none [&_circle]:stroke-accent [&_circle]:stroke-1" viewBox="-20 -20 40 40">
                  <circle r="18" pathLength="100" strokeDasharray="100" />
                </svg>
                {Array.from({ length: SPARKS }, (_, i) => (
                  <span data-spark className="absolute top-0 left-0 -mt-0.5 -ml-0.5 hidden size-1 rounded-full bg-accent opacity-0 md:block" key={i} />
                ))}
                <span data-dot className="absolute top-0 left-0 -mt-[4.5px] -ml-[4.5px] size-[9px] rounded-full bg-accent" />
              </li>
              {skills.map((s, i) => {
                const Icon = icons[s.icon];
                return (
                  <li
                    data-row
                    className="rise group/row relative isolate grid grid-cols-[1.6rem_36px_1fr] items-center gap-[.9rem] overflow-hidden border-b border-line px-[.4rem] py-[clamp(.55rem,1.7vh,1rem)] transition-[color,padding] duration-[450ms] ease-soft hover:px-[.9rem] hover:text-white sm:grid-cols-[2rem_40px_1fr_auto]"
                    key={s.id}
                    style={{ "--i": 2 + i }}
                  >
                    <span data-idx className="text-[.7rem] font-bold tracking-[.15em] text-accent">0{i + 1}</span>
                    <span className="grid size-9 place-items-center rounded-full border border-current sm:size-10"><Icon size={20} strokeWidth={1.6} /></span>
                    <div>
                      <h4 className="text-[1.02rem] leading-[1.25] font-bold">{s.title}</h4>
                      <p className="text-[.86rem] text-muted transition-colors duration-400 group-hover/row:text-on-dark-muted">{s.items.join(" · ")}</p>
                    </div>
                    <span className="col-start-3 text-left text-[.68rem] tracking-[.12em] text-muted uppercase transition-colors duration-400 group-hover/row:text-on-dark-muted sm:col-auto sm:max-w-40 sm:text-right">{s.note}</span>
                    <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-soft group-hover/row:scale-y-100" aria-hidden="true" />
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className={`${colTitle} rise`} style={{ "--i": 1 }}>Tools &amp; applications</h3>
            <div className="grid grid-cols-1 gap-x-[1.4rem] gap-y-[clamp(.7rem,2vh,1.3rem)] sm:grid-cols-2">
              {toolGroups.map((g, gi) => (
                <div className="rise" key={g.title} style={{ "--i": 2 + gi }}>
                  <h4 className="mb-[.45rem] flex items-center gap-[.6rem] text-[.8rem] font-bold after:h-px after:flex-1 after:bg-line after:content-['']">{g.title}</h4>
                  <ul className="flex flex-wrap gap-[.4rem]">
                    {g.items.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-ink bg-transparent px-3 py-[.3rem] text-[.8rem] transition-[background-color,color,transform,border-color] duration-300 ease-soft hover:-translate-y-[3px] hover:-rotate-[1.5deg] hover:border-accent hover:bg-accent hover:text-white"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
