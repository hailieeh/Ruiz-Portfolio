import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../data/content.js";
import { panel, section, inner, eyebrow, secTitleBig, btnSolid } from "../lib/ui.js";

export default function NotFound() {
  useEffect(() => {
    const previous = document.title;
    document.title = `Page not found | ${profile.name}`;
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className={panel}>
      <section className={section}>
        <div className={inner}>
          <p className={`${eyebrow} rise text-accent`} style={{ "--i": 0 }}>Error 404</p>
          <h1 className={`${secTitleBig} rise`} style={{ "--i": 1 }}>Page not found</h1>
          <p className="rise mt-4 mb-[1.6rem] max-w-[36rem] text-muted" style={{ "--i": 2 }}>
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="rise" style={{ "--i": 3 }}>
            <Link to="/" className={btnSolid}>
              Back to home <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
