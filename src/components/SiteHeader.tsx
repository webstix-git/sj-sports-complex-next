"use client";

import { useEffect, useRef, useState } from "react";

type SiteHeaderProps = {
  /** When true, nav uses #anchors and scroll-solid behavior. When false, links go to /# and header stays solid. */
  home?: boolean;
};

const nav = [
  { href: "about", label: "About" },
  { href: "programs", label: "Sports" },
  { href: "park", label: "The Park" },
  { href: "gallery", label: "Gallery" },
  { href: "location", label: "Location" },
  { href: "contact", label: "Contact" },
] as const;

export default function SiteHeader({ home = false }: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const headInnerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(!home);

  useEffect(() => {
    if (!home) {
      setSolid(true);
      const lg = logoRef.current;
      const hi = headInnerRef.current;
      if (lg) {
        lg.style.height = "64px";
        lg.style.filter = "none";
      }
      if (hi) hi.style.minHeight = "88px";
      return;
    }

    let raf = 0;
    const tick = () => {
      raf = 0;
      const hero = document.getElementById("top");
      const top = hero ? hero.getBoundingClientRect().top : 0;
      const nextSolid = top < -60;
      setSolid(nextSolid);
      const lg = logoRef.current;
      const hi = headInnerRef.current;
      if (lg) {
        lg.style.height = nextSolid ? "64px" : "clamp(72px,18vw,143px)";
        lg.style.filter = nextSolid ? "none" : "drop-shadow(0 8px 18px rgba(0,0,0,.45))";
      }
      if (hi) hi.style.minHeight = nextSolid ? "72px" : "clamp(88px,22vw,151px)";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    tick();
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true } as AddEventListenerOptions);
      window.removeEventListener("resize", onScroll);
    };
  }, [home]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const link = (id: string) => (home ? `#${id}` : `/#${id}`);
  const homeHref = home ? "#top" : "/";
  const headerSolid = solid || menuOpen;
  const ink = headerSolid ? "#00214D" : "#fff";

  return (
    <header
      ref={headerRef}
      className="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        background: headerSolid ? "#fff" : "transparent",
        color: ink,
        borderBottom: headerSolid ? "1px solid rgba(0,33,77,.08)" : "0",
        boxShadow: headerSolid ? "0 8px 24px rgba(0,33,77,.08)" : "none",
        transition: "background .3s ease,box-shadow .3s ease,border-color .3s ease,color .3s ease",
      }}
    >
      <div
        ref={headInnerRef}
        className="site-header-inner"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 20px",
          minHeight: home && !solid ? "clamp(88px,22vw,151px)" : "72px",
          transition: "min-height .3s ease",
          display: "grid",
          gridTemplateColumns: "auto minmax(0,1fr)",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <a
          href={homeHref}
          aria-label="St. Joseph Youth Sports Foundation home"
          style={{ position: "relative", display: "block", padding: "8px 0", zIndex: 2 }}
          data-hover='{"opacity": ".95"}'
          onClick={() => setMenuOpen(false)}
        >
          <img
            ref={logoRef}
            src="/images/logo.png"
            alt="St. Joseph Youth Sports Foundation logo"
            style={{
              height: home && !solid ? "clamp(72px,18vw,143px)" : "56px",
              width: "auto",
              display: "block",
              filter: home && !solid ? "drop-shadow(0 8px 18px rgba(0,0,0,.45))" : "none",
              transition: "height .3s ease,filter .3s ease",
              boxSizing: "content-box",
            }}
          />
        </a>

        <div className="site-header-right">
          <nav className="site-nav-desktop" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.href} href={link(item.href)} data-hover='{"color": "#E7BA22"}'>
                {item.label}
              </a>
            ))}
            <a
              href="tel:2694146048"
              className="site-nav-cta"
              data-cta="1"
              data-hover='{"background": "#00214D", "color": "#E7BA22"}'
            >
              <span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
                </svg>
                269-414-6048
              </span>
            </a>
          </nav>

          <div className="site-header-actions">
            <a
              href="tel:2694146048"
              className="site-nav-cta site-nav-cta-mobile"
              data-cta="1"
              aria-label="Call 269-414-6048"
              data-hover='{"background": "#00214D", "color": "#E7BA22"}'
            >
              <span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
                </svg>
              </span>
            </a>
            <button
              type="button"
              className="site-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="site-mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              style={{ color: ink }}
            >
              <span className={menuOpen ? "is-open" : undefined} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="site-mobile-nav"
        className={`site-mobile-nav${menuOpen ? " is-open" : ""}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={link(item.href)}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="tel:2694146048"
            className="site-mobile-phone"
            onClick={() => setMenuOpen(false)}
          >
            269-414-6048
          </a>
        </nav>
      </div>
    </header>
  );
}
