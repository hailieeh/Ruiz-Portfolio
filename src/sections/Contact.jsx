import { useState } from "react";
import { Mail, Phone, Copy, Check, ArrowUpRight } from "lucide-react";
import Magnetic from "../components/Magnetic.jsx";
import { profile } from "../data/content.js";
import { section, inner, eyebrow, secHead, secTitleBig, secRule } from "../lib/ui.js";

function CopyBtn({ text, label }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard unavailable – ignore */
    }
  };
  return (
    <button className="col-start-2 inline-flex min-h-11 items-center gap-[.4rem] justify-self-start rounded-full border border-dark-line-2 bg-transparent px-4 text-[.8rem] text-on-dark transition-[background-color,border-color] duration-300 hover:border-accent hover:bg-accent sm:col-auto sm:justify-self-auto" onClick={copy} aria-label={`Copy ${label}`}>
      {done ? <Check size={16} /> : <Copy size={16} />}
      <span aria-live="polite">{done ? "Copied" : "Copy"}</span>
    </button>
  );
}

export default function Contact() {
  return (
    <section className={`${section} relative`}>
      <div className={`${inner} relative`}>
        <header className={`${secHead} rise`} style={{ "--i": 0 }}>
          <p className={`${eyebrow} basis-full text-on-dark md:basis-auto`}>04</p>
          <h2 className={secTitleBig}>Get in touch</h2>
          <span className={`${secRule} bg-mint`} aria-hidden="true" />
        </header>

        <div className="grid grid-cols-1 items-start gap-[clamp(1.2rem,4vw,4rem)] lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">
          <p className="rise max-w-[28rem] text-[length:clamp(1.02rem,min(1.7vw,3vh),1.35rem)] text-on-dark-muted" style={{ "--i": 1 }}>
            Open to opportunities. Send an email or give me a call.
          </p>

          <ul className="grid border-t border-dark-line">
            <li className="rise grid grid-cols-[44px_1fr] items-center gap-4 border-b border-dark-line py-[clamp(.7rem,2vh,1.2rem)] sm:grid-cols-[44px_1fr_auto]" style={{ "--i": 2 }}>
              <span className="grid size-11 place-items-center rounded-full border border-dark-line-2 text-mint"><Mail size={20} /></span>
              <div>
                <span className="block text-[.68rem] tracking-[.2em] text-on-dark-muted uppercase">Email</span>
                <a href={`mailto:${profile.email}`} className="text-[length:clamp(1rem,1.8vw,1.25rem)] font-medium [word-break:break-word] no-underline transition-[background-size,color] duration-400 ease-soft [background:linear-gradient(currentColor,currentColor)_0_100%/0_1px_no-repeat] hover:text-mint hover:[background-size:100%_1px]">{profile.email}</a>
              </div>
              <CopyBtn text={profile.email} label="email" />
            </li>
            <li className="rise grid grid-cols-[44px_1fr] items-center gap-4 border-b border-dark-line py-[clamp(.7rem,2vh,1.2rem)] sm:grid-cols-[44px_1fr_auto]" style={{ "--i": 3 }}>
              <span className="grid size-11 place-items-center rounded-full border border-dark-line-2 text-mint"><Phone size={20} /></span>
              <div>
                <span className="block text-[.68rem] tracking-[.2em] text-on-dark-muted uppercase">Contact number</span>
                <a href={`tel:${profile.phoneHref}`} className="text-[length:clamp(1rem,1.8vw,1.25rem)] font-medium [word-break:break-word] no-underline transition-[background-size,color] duration-400 ease-soft [background:linear-gradient(currentColor,currentColor)_0_100%/0_1px_no-repeat] hover:text-mint hover:[background-size:100%_1px]">{profile.phoneDisplay}</a>
              </div>
              <CopyBtn text={profile.phone} label="number" />
            </li>
          </ul>

          <div className="rise col-span-full mt-[clamp(.2rem,1.5vh,1.2rem)]" style={{ "--i": 4 }}>
            <Magnetic strength={0.25} className="block">
              <a
                href={`mailto:${profile.email}`}
                className="group/cta flex items-center justify-between gap-6 rounded-md border border-dark-line-2 px-[clamp(1.1rem,3vw,2.4rem)] py-[clamp(1rem,3.4vh,2.4rem)] font-display text-[length:clamp(1.4rem,min(4.4vw,7vh),3.4rem)] leading-[1.05] text-on-dark uppercase no-underline transition-[background-color,color,border-color] duration-400 hover:border-accent hover:bg-accent"
              >
                <span>Send an email</span>
                <ArrowUpRight size={30} strokeWidth={1.4} className="h-auto w-[clamp(30px,4.4vw,58px)] flex-none transition-transform duration-500 ease-soft group-hover/cta:translate-x-2 group-hover/cta:-translate-y-2 group-hover/cta:rotate-[8deg]" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
