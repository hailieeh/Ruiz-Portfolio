import { useEffect, useLayoutEffect, useRef } from "react";
import { CountUp } from "countup.js";
import { gsap, prefersReducedMotion } from "../lib/smooth.js";
import { profile, toolCount } from "../data/content.js";
import portrait from "../assets/portrait-bw.webp";
import { section, inner, eyebrow, secHead, secEyebrow, secTitle, secRule, hairline } from "../lib/ui.js";

const stats = [
  { to: 3, suffix: "", label: "Languages", sub: "C · C# · Python" },
  { to: toolCount, suffix: "", label: "Tools & apps", sub: "Docs to databases" },
  { to: 2, suffix: "", label: "Digital roles", sub: "VA & social media" },
];

export default function About() {
  const root = useRef(null);
  const frame = useRef(null);

  // portrait: the frame wipes open left to right while the photo settles from a
  // zoom, then the photo drifts against the pointer inside its frame
  useLayoutEffect(() => {
    const fig = frame.current;
    if (!fig || prefersReducedMotion()) return;
    const img = fig.querySelector("img");
    let move;
    const ctx = gsap.context(() => {
      gsap.set(img, { scale: 1.12 });
      gsap.fromTo(fig, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, delay: 0.55, ease: "power4.inOut", clearProps: "clipPath" });
      gsap.fromTo(img, { scale: 1.45 }, { scale: 1.12, duration: 1.6, delay: 0.55, ease: "power3.out" });
      if (window.matchMedia("(hover: hover)").matches) {
        const opts = { duration: 0.8, ease: "power3.out" };
        const xTo = gsap.quickTo(img, "x", opts);
        const yTo = gsap.quickTo(img, "y", opts);
        move = (e) => {
          const r = fig.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width - 0.5) * -22);
          yTo(((e.clientY - r.top) / r.height - 0.5) * -22);
        };
        fig.addEventListener("pointermove", move);
        fig.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
      }
    }, fig);
    return () => {
      if (move) fig.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const counters = root.current.querySelectorAll("[data-count]");
    counters.forEach((el) => {
      new CountUp(el, Number(el.dataset.count), {
        duration: 1.6,
        suffix: el.dataset.suffix || "",
        startVal: 0,
      }).start();
    });
  }, []);

  return (
    <section className={section} ref={root}>
      <div className={inner}>
        <header className={`${secHead} rise`} style={{ "--i": 0 }}>
          <p className={secEyebrow}>01</p>
          <h2 className={secTitle}>About</h2>
          <span className={`${secRule} bg-accent`} aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 items-stretch gap-[clamp(1.4rem,4vw,4rem)] lg:grid-cols-[minmax(0,.55fr)_minmax(0,1.45fr)]">
          <figure
            className="rise relative h-[clamp(150px,23vh,210px)] overflow-hidden rounded-[4px] bg-dark md:h-[clamp(150px,26vh,240px)] lg:h-[min(56vh,460px)] lg:self-center"
            ref={frame}
            style={{ "--i": 1 }}
          >
            <img
              className="size-full object-cover object-[50%_30%] md:object-[50%_22%] lg:object-[50%_28%]"
              src={portrait}
              alt="Black and white portrait of Hailie Jade Ruiz"
              width="866"
              height="935"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex justify-between gap-4 bg-[linear-gradient(transparent,rgba(0,0,0,.72))] px-[.9rem] pt-8 pb-3 text-[.66rem] tracking-[.16em] text-white uppercase">
              <span>Hailie Jade Ruiz</span>
              <span>{profile.year}</span>
            </figcaption>
          </figure>

          <div className="flex flex-col justify-center gap-[.8rem] md:gap-[clamp(.9rem,2.6vh,1.8rem)]">
            <p
              className="rise text-[.95rem] leading-[1.4] font-medium tracking-[-.005em] md:text-[length:clamp(1.02rem,min(1.7vw,3vh),1.5rem)] md:leading-[1.45]"
              style={{ "--i": 2 }}
            >
              {profile.about}
            </p>

            <dl className="rise grid grid-cols-3 gap-2 border-t border-line pt-[.6rem] md:gap-4 md:pt-[.9rem]" style={{ "--i": 3 }}>
              {[
                ["Program", profile.program],
                ["Year level", profile.year],
                ["Birthday", profile.birthday],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[.58rem] tracking-[.12em] text-muted uppercase md:text-[.66rem] md:tracking-[.2em]">{k}</dt>
                  <dd className="text-[.8rem] font-medium md:text-[.95rem]">{v}</dd>
                </div>
              ))}
            </dl>

            <ul className={`${hairline} rise grid grid-cols-3`} style={{ "--i": 4 }}>
              {stats.map((s) => (
                <li key={s.label} className="flex flex-col gap-[.1rem] pt-[.6rem] pr-2 not-first:border-l not-first:border-line not-first:pl-2 md:pt-[.9rem] md:pr-4 md:not-first:pl-4">
                  <span
                    className="font-serif text-[1.9rem] leading-none tracking-[-.02em] lining-nums md:text-[length:clamp(2.2rem,min(4vw,7vh),3.6rem)]"
                    data-count={s.to}
                    data-suffix={s.suffix}
                  >
                    {s.to}{s.suffix}
                  </span>
                  <span className="mt-[.4rem] text-[.55rem] font-medium tracking-[.08em] uppercase md:text-[.68rem] md:tracking-[.14em]">{s.label}</span>
                  <span className="hidden text-[.82rem] text-muted md:block">{s.sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
