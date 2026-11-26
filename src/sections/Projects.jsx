import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import QRPhone from "./QRPhone.jsx";
import dashboard from "../assets/faithevents-dashboard.webp";
import { projects } from "../data/content.js";
import { section, inner, secHead, secEyebrow, secTitle, secRule } from "../lib/ui.js";

const VIEWS = [
  { id: "checkin", label: "Check-in" },
  { id: "events", label: "Events page" },
];

const tabBase = "rounded-full px-[.9rem] py-[.3rem] text-[.68rem] font-medium tracking-[.14em] uppercase transition-colors duration-300";

export default function Projects() {
  const [view, setView] = useState("checkin");

  return (
    <section className={section}>
      <div className={inner}>
        <header className={`${secHead} rise`} style={{ "--i": 0 }}>
          <p className={secEyebrow}>03</p>
          <h2 className={secTitle}>Projects</h2>
          <span className={`${secRule} bg-accent`} aria-hidden="true" />
        </header>

        {projects.map((p, i) => (
          <article
            key={p.id}
            className="rise grid grid-cols-1 overflow-hidden rounded-md border border-line bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)] lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]"
            style={{ "--i": 1 }}
          >
            <div className="relative grid place-items-center overflow-hidden bg-dark p-[1.4rem] pb-[3.4rem] lg:p-[clamp(1rem,3vh,2rem)] lg:pb-[3.6rem]">
              <span
                className="absolute aspect-square w-[70%] rounded-full bg-[radial-gradient(circle,rgba(14,124,90,.9),rgba(14,124,90,0)_68%)] blur-[10px] animate-[glow_5s_ease-in-out_infinite]"
                aria-hidden="true"
              />
              {view === "checkin" ? (
                <QRPhone />
              ) : (
                <img
                  src={dashboard}
                  alt="FaithEvents Events page: a form to add an event with title, date, time, venue and type, and a Sunday Worship Service entry showing 0 checked in with Open check-in and Delete buttons."
                  className="relative z-1 w-full max-w-[26rem] rounded-md border border-dark-line-2 object-contain shadow-[0_24px_50px_-20px_rgba(0,0,0,.8)] max-h-[min(46vh,24rem)]"
                  width="916"
                  height="828"
                />
              )}
              <div className="absolute bottom-[.9rem] z-2 flex gap-[.35rem] rounded-full border border-dark-line-2 bg-dark/80 p-[.2rem]" role="group" aria-label="Project view">
                {VIEWS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    aria-pressed={view === v.id}
                    onClick={() => setView(v.id)}
                    className={`${tabBase} ${view === v.id ? "bg-accent text-white" : "text-on-dark-muted hover:text-white"}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center gap-[.55rem] px-[clamp(1.2rem,3vw,3rem)] py-[clamp(1.1rem,3.4vh,2.6rem)] shorter:py-[.8rem]">
              <p className="text-[.7rem] tracking-[.22em] text-muted uppercase">
                <span className="mr-2 font-serif text-[1.3rem] tracking-normal text-accent lining-nums">0{i + 1}</span>
              </p>
              <h3 className="font-display text-[length:clamp(2.2rem,min(5vw,8vh),3.8rem)] leading-none font-normal uppercase">{p.title}</h3>
              <p className="font-medium text-accent">{p.subtitle}</p>
              <p className="max-w-[38rem] text-[.95rem] text-ink-2 shorter:text-[.88rem]">{p.description}</p>
              <ul className="grid gap-[.3rem] shorter:gap-[.15rem]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-[.6rem] text-[.92rem]">
                    <ArrowUpRight size={16} className="flex-none text-accent" /> {pt}
                  </li>
                ))}
              </ul>
              <ul className="mt-[.3rem] flex flex-wrap gap-[.4rem]">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full bg-accent-soft px-[.7rem] py-[.3rem] text-[.68rem] font-medium tracking-[.12em] text-accent uppercase">{t}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
