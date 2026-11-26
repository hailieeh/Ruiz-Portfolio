import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { profile } from "../data/content.js";
import { NAV } from "../data/nav.js";

export default function Header({ index }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const active = NAV[index]?.id; // undefined on the 404 page

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onDark = open ? "text-on-dark" : "text-ink group-data-[dark]/app:text-on-dark";
  return (
    <>
      <header className="relative z-60 flex items-center justify-between px-gutter">
        <NavLink
          to="/"
          end
          className={`group/brand inline-flex items-center gap-[.7rem] no-underline transition-colors duration-400 ${onDark}`}
          aria-label={`${profile.name} – home`}
        >
          <Logo
            size={30}
            className="text-accent transition-[transform,color] duration-500 ease-soft group-hover/brand:-rotate-[8deg] group-hover/brand:scale-[1.08] group-data-[dark]/app:text-mint"
          />
          <span className="font-bold tracking-[.01em]">{profile.name}</span>
        </NavLink>

        <nav className="hidden gap-[.3rem] md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <NavLink
              key={n.id}
              to={n.to}
              end
              className={`relative inline-flex min-h-11 items-center px-[.9rem] py-2 text-[.9rem] no-underline transition-colors duration-250 ${
                active === n.id
                  ? "font-bold text-ink group-data-[dark]/app:text-on-dark"
                  : "text-muted hover:text-ink group-data-[dark]/app:text-on-dark-muted group-data-[dark]/app:hover:text-on-dark"
              }`}
            >
              {n.label}
              {active === n.id && (
                <motion.i layoutId="nav-underline" className="absolute inset-x-[.9rem] bottom-[.35rem] h-0.5 bg-accent group-data-[dark]/app:bg-mint" />
              )}
            </NavLink>
          ))}
        </nav>

        <button
          className={`z-80 grid size-11 place-items-center border-0 bg-transparent md:hidden ${onDark}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-55 flex flex-col justify-center bg-dark px-gutter pt-[90px] pb-10 text-on-dark md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 36px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07, duration: 0.5 } }}
                  exit={{ opacity: 0 }}
                >
                  <NavLink
                    to={n.to}
                    end
                    className={`flex items-baseline gap-4 font-display text-[length:clamp(2.4rem,11vw,4.2rem)] leading-[1.15] uppercase no-underline ${
                      active === n.id ? "text-mint" : "text-on-dark"
                    }`}
                  >
                    <span className="font-sans text-[.8rem] tracking-[.2em] text-accent">0{i + 1}</span>
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <p className="mt-10 text-[.85rem] text-on-dark-muted">{profile.program} · {profile.year}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
