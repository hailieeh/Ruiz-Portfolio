import { useCallback, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Preloader from "./Preloader.jsx";
import { NAV, indexForPath } from "../data/nav.js";

// Shared shell: Preloader, Header, Footer. Pages change only by clicking the header
// menu or the buttons on Home. idx is -1 on the 404 page.
export default function Layout() {
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const handleReveal = useCallback(() => setReady(true), []);
  const handleDone = useCallback(() => setDone(true), []);
  const { pathname } = useLocation();
  const idx = indexForPath(pathname);
  const section = idx === -1 ? "notfound" : NAV[idx].id;

  return (
    <div
      data-dark={section === "contact" ? "" : undefined}
      data-section={section}
      className={`group/app grid h-svh grid-rows-[60px_minmax(0,1fr)_68px] bg-bg text-ink transition-[background-color,color] duration-500 ease-soft data-[dark]:bg-dark data-[dark]:text-on-dark data-[section=skills]:bg-bg-2 ${ready ? "" : "invisible"}`}
    >
      {!done && <Preloader onReveal={handleReveal} onDone={handleDone} />}
      <Header index={idx} />
      <main className="relative min-h-0 overflow-hidden">
        <Outlet context={{ ready, index: idx }} />
      </main>
      <Footer />
    </div>
  );
}
