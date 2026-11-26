import { Mail, Phone } from "lucide-react";
import Logo from "./Logo.jsx";
import { profile } from "../data/content.js";

const link =
  "inline-flex min-h-[38px] w-[38px] items-center justify-center gap-[.45rem] rounded-full border border-current px-0 font-medium text-inherit no-underline transition-[background-color,color,border-color] duration-300 hover:border-accent hover:bg-accent hover:text-white group-data-[dark]/app:hover:border-mint group-data-[dark]/app:hover:bg-mint group-data-[dark]/app:hover:text-dark sm:w-auto sm:px-[.95rem]";

// Info bar only - it never changes the page. Navigation lives in the header menu
// and the buttons on Home.
export default function Footer() {
  return (
    <footer className="relative z-5 grid grid-cols-[1fr_auto] items-center gap-4 border-t border-line px-gutter text-[.82rem] text-muted transition-[border-color,color] duration-500 group-data-[dark]/app:border-dark-line group-data-[dark]/app:text-on-dark-muted lg:grid-cols-[1fr_auto_1fr]">
      <div className="flex min-w-0 items-center gap-[.8rem]">
        <span className="grid size-[38px] flex-none place-items-center rounded-[10px] bg-ink text-white transition-colors duration-400 group-data-[dark]/app:bg-mint group-data-[dark]/app:text-dark">
          <Logo size={22} />
        </span>
        <span className="grid min-w-0 leading-[1.25]">
          <strong className="text-[.88rem] font-bold text-ink transition-colors duration-400 group-data-[dark]/app:text-on-dark">{profile.name}</strong>
          <small className="hidden truncate text-[.72rem] tracking-[.04em] whitespace-nowrap sm:block">{profile.program} &middot; {profile.year}</small>
        </span>
      </div>

      <p className="hidden text-[.68rem] tracking-[.26em] whitespace-nowrap uppercase lg:block">Open to opportunities</p>

      <div className="flex items-center justify-end gap-2">
        <a className={link} href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}>
          <Mail size={16} />
          <span className="hidden sm:inline">Email</span>
        </a>
        <a className={link} href={`tel:${profile.phoneHref}`} aria-label={`Call ${profile.phoneDisplay}`}>
          <Phone size={16} />
          <span className="hidden sm:inline">Call</span>
        </a>
        <span className="ml-[.7rem] hidden tracking-[.08em] lg:inline">&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
