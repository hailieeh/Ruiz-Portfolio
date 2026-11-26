import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../components/Magnetic.jsx";
import heroPhoto from "../assets/hero-cutout-bw.webp";
import { gsap, prefersReducedMotion } from "../lib/smooth.js";
import { profile, typedStrings } from "../data/content.js";
import { section, eyebrow, btnSolid, btnGhost } from "../lib/ui.js";

// each letter gets its own span so it can slide up on load
function Letters({ text, start = 0 }) {
  return (
    <span className="block overflow-hidden pt-[.04em] pr-[.12em]">
      <span className="block whitespace-nowrap" aria-hidden="true">
        {[...text].map((c, i) => (
          <span className="letter-in inline-block" key={i} style={{ "--i": start + i }}>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const typedEl = useRef(null);
  const photo = useRef(null);
  const [engineReady, setEngineReady] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, [reduced]);

  const particleOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      interactivity: {
        detectsOn: "window",
        events: { onHover: { enable: true, mode: ["grab", "repulse"] }, resize: { enable: true } },
        modes: {
          grab: { distance: 170, links: { opacity: 0.55 } },
          repulse: { distance: 90, duration: 0.4 },
        },
      },
      particles: {
        number: { value: 46, density: { enable: true, area: 900 } },
        color: { value: ["#0E7C5A", "#111111"] },
        links: { enable: true, color: "#0E7C5A", distance: 140, opacity: 0.22, width: 1 },
        move: { enable: true, speed: 0.55, outModes: { default: "out" } },
        opacity: { value: { min: 0.25, max: 0.6 } },
        size: { value: { min: 1.2, max: 3 } },
      },
    }),
    []
  );

  // photo: wipes up from the bottom as the page is revealed, then follows the pointer
  // with a soft 3D tilt and a little parallax
  useLayoutEffect(() => {
    const el = photo.current;
    if (!el || reduced) return;
    let move;
    const ctx = gsap.context(() => {
      gsap.set(el, { transformOrigin: "50% 100%", transformPerspective: 900 });
      gsap.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)", y: 70, scale: 1.05 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, scale: 1, duration: 1.3, delay: 0.55, ease: "power4.out", clearProps: "clipPath" }
      );
      if (window.matchMedia("(hover: hover)").matches) {
        const opts = { duration: 0.9, ease: "power3.out" };
        const rotY = gsap.quickTo(el, "rotationY", opts);
        const rotX = gsap.quickTo(el, "rotationX", opts);
        const xTo = gsap.quickTo(el, "x", opts);
        move = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          rotY(nx * 8);
          rotX(-ny * 5);
          xTo(nx * -18);
        };
        window.addEventListener("pointermove", move);
      }
    });
    return () => {
      if (move) window.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      typedEl.current.textContent = typedStrings[0];
      return;
    }
    const typed = new Typed(typedEl.current, {
      strings: typedStrings,
      typeSpeed: 42,
      backSpeed: 22,
      backDelay: 1600,
      startDelay: 700,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, [reduced]);

  return (
    <section className={`${section} relative overflow-hidden`}>
      {engineReady && (
        <Particles
          id="hero-particles"
          className="pointer-events-none absolute inset-0 z-0 [&_canvas]:pointer-events-none!"
          options={particleOptions}
        />
      )}

      <div className="relative z-1 flex min-h-0 flex-1 items-start md:items-center">
        <div className="relative mx-auto w-full max-w-page px-gutter pt-[clamp(1rem,5vh,2.4rem)] pb-4 md:pt-4">
          <p className={`${eyebrow} rise`} style={{ "--i": 0 }}>{profile.program}</p>

          <h1
            className="mt-[.7rem] mb-4 font-display text-[length:clamp(3.2rem,min(21vw,14vh),9rem)] leading-[.98] font-normal tracking-[-.005em] uppercase lg:text-[length:clamp(3rem,min(14.5vw,17vh),12rem)]"
            aria-label={profile.name}
          >
            <Letters text={profile.firstLine} start={1} />
            <Letters text={profile.secondLine} start={5} />
          </h1>

          <p className={`${eyebrow} rise text-accent`} style={{ "--i": 9 }}>Open to opportunities</p>
          <span className="rise mt-4 mb-[.9rem] block h-0.5 w-[78px] bg-accent short:mt-[.7rem] short:mb-[.6rem]" style={{ "--i": 10 }} aria-hidden="true" />
          <p
            className="rise flex min-h-[1.6em] gap-[.45rem] text-[length:clamp(1rem,1.6vw,1.25rem)] font-medium [&_.typed-cursor]:font-bold [&_.typed-cursor]:text-accent"
            style={{ "--i": 11 }}
            aria-live="off"
          >
            <span className="font-bold text-accent">›</span> <span ref={typedEl} />
          </p>
          <p className="rise mt-[.4rem] hidden max-w-[30rem] text-muted md:tall:block" style={{ "--i": 12 }}>{profile.tagline}</p>
          <div className="rise mt-[1.3rem] flex flex-wrap gap-[.8rem] short:mt-[.9rem]" style={{ "--i": 13 }}>
            <Magnetic>
              <Link to="/projects" className={btnSolid}>
                View my projects <ArrowUpRight size={18} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className={btnGhost}>Contact me</Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <img
        ref={photo}
        className="pointer-events-none absolute right-[-4%] bottom-0 z-0 h-[42%] w-auto max-w-full object-contain object-bottom-right drop-shadow-[0_20px_30px_rgba(0,0,0,.18)] will-change-transform md:right-0 md:h-[46%] md:max-w-[70%] md:opacity-30 lg:right-[max(var(--spacing-gutter),calc((100%_-_1320px)/2_+_var(--spacing-gutter)))] lg:h-[min(94%,760px)] lg:max-w-[48%] lg:opacity-100"
        src={heroPhoto}
        alt="Hailie Jade Ruiz in a camo cap and varsity jacket, black and white photo"
        width="794"
        height="764"
      />
    </section>
  );
}
