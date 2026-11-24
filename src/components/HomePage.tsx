"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import SiteChrome from "@/components/SiteChrome";

type Sport = {
  num: string;
  tall: boolean;
  short: boolean;
  img: string;
  slot: string;
  tag: string;
  name: string;
  fields: string;
  desc: string;
  ph: string;
};

function ScoreboardCount({
  value,
  size = "lg",
}: {
  value: number;
  size?: "lg" | "sm";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [tick, setTick] = useState(false);
  const rafRef = useRef(0);
  const timeoutRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      rafRef.current = 0;
      timeoutRef.current = 0;
    };

    const run = () => {
      stop();
      setDisplay(0);
      setTick(false);

      if (reduced || value <= 0) {
        setDisplay(value);
        return;
      }

      // Slow enough that each digit change reads clearly; replays on scroll-in.
      const duration = Math.max(2200, value * 320);
      const start = performance.now();
      let last = -1;

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 2.2);
        const next = Math.round(eased * value);
        if (next !== last) {
          last = next;
          setDisplay(next);
          setTick(true);
        }
        if (t < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setDisplay(value);
          rafRef.current = 0;
        }
      };

      // Brief beat on 0 so the restart is noticeable when re-entering.
      timeoutRef.current = window.setTimeout(() => {
        rafRef.current = requestAnimationFrame(step);
      }, 180);
    };

    const reset = () => {
      stop();
      setDisplay(0);
      setTick(false);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) run();
        else reset();
      },
      { threshold: 0.4, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      stop();
      io.disconnect();
    };
  }, [value]);

  useEffect(() => {
    if (!tick) return;
    const id = window.setTimeout(() => setTick(false), 160);
    return () => window.clearTimeout(id);
  }, [tick]);

  const isLg = size === "lg";

  return (
    <span
      ref={ref}
      className={`sj-score-digit${tick ? " is-tick" : ""}${isLg ? " is-lg" : ""}`}
      aria-label={String(value)}
    >
      <span className="sj-score-digit-value">{display}</span>
    </span>
  );
}

export default function HomePage() {
  const [sent, setSent] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: { src: string; alt: string }[]; index: number } | null>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const sports: Sport[] = [
    {
      num: "1",
      tall: false,
      short: true,
      img: "/images/sport-rocket.jpg",
      slot: "sport-rocket",
      tag: "Football",
      name: "Rocket Football",
      fields: "Game field + practice field",
      desc: "Rocket Football gets a home of its own: one field for games, one for practice, and no more juggling the schedule.",
      ph: "Rocket football photo",
    },
    {
      num: "2",
      tall: true,
      short: false,
      img: "/images/sport-flag.jpg",
      slot: "sport-flag",
      tag: "Football",
      name: "Flag Football",
      fields: "3 flag football fields",
      desc: "Three fields where our youngest players learn the game, with steady practice times parents can plan around.",
      ph: "Flag football photo",
    },
    {
      num: "3",
      tall: true,
      short: false,
      img: "/images/sport-baseball.jpg",
      slot: "sport-baseball",
      tag: "Diamond",
      name: "Baseball",
      fields: "2 fields + indoor batting cages",
      desc: "Two diamonds for SJBSA, plus indoor batting cages for early-season reps.",
      ph: "Baseball photo",
    },
    {
      num: "4",
      tall: false,
      short: true,
      img: "/images/sport-softball.jpg",
      slot: "sport-softball",
      tag: "Diamond",
      name: "Softball",
      fields: "2 softball fields",
      desc: "Two fields for softball, including one that doubles as the Miracle League field.",
      ph: "Softball photo",
    },
  ];

  const mission = [
    { n: "1", h: "Room for every player", t: "Local programs won’t have to cap sign-ups because they’ve run out of fields." },
    { n: "2", h: "Fees families can manage", t: "When field costs stay low for leagues, registration stays affordable at home." },
    { n: "3", h: "Fields coaches want to use", t: "Good, dependable practice space makes volunteering an easier yes." },
    { n: "4", h: "Designed for athletes with disabilities", t: "Accessible fields and dugouts, planned in from the very first drawing." },
    { n: "5", h: "A park that belongs to St. Joseph", t: "Welcoming to everyone, and shaped by the people who live here." },
  ];

  const parkStats = [
    { n: 9, l: ["Athletic", "fields"] as const },
    { n: 5, l: ["Football", "fields"] as const },
    { n: 4, l: ["Baseball & softball", "diamonds"] as const },
    { n: 1, l: ["Miracle League", "field"] as const },
  ];

  const featureGroups = [
    {
      title: "Fields",
      sub: "9 total",
      items: [
        { q: "2", t: "Baseball Fields" },
        { q: "2", t: "Softball Fields*" },
        { q: "1", t: "Rocket Football Game Field" },
        { q: "1", t: "Rocket Football Practice Field" },
        { q: "3", t: "Flag Football Fields" },
      ],
    },
    {
      title: "Facilities",
      sub: "Behind the scenes",
      items: [
        { q: "1", t: "Locker Rooms" },
        { q: "2", t: "Medical Room" },
        { q: "3", t: "Indoor Batting Cages" },
        { q: "4", t: "Concession Stands" },
      ],
    },
    {
      title: "Community",
      sub: "For families",
      items: [
        { q: "1", t: "Accessible Playground and Splash Pad" },
        { q: "2", t: "1.5-Mile Walking and Fitness Trail" },
        { q: "3", t: "Sufficient Parking" },
      ],
    },
  ];

  const board = [
    { no: "1", i: "NS", n: "Nicole Schmitt", r: "President" },
    { no: "2", i: "VJ", n: "Veronica Jackson", r: "Vice President" },
    { no: "3", i: "NF", n: "Nanci Fenrick", r: "Secretary / Treasurer" },
    { no: "4", i: "RC", n: "Ryan Cheevers", r: "Strategic Content Director" },
    { no: "5", i: "PK", n: "Paul Knapp", r: "Community Outreach" },
    { no: "6", i: "MF", n: "Michael Fernandez", r: "Fundraising Director" },
  ];

  const notSent = !sent;
  const parkMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Maiden+Ln+%26+Hollywood+Rd,+St.+Joseph,+MI";
  const mailMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=1816+Nash+Dr,+St.+Joseph,+MI+49085";
  const parkDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Maiden+Ln+and+Hollywood+Rd,+St.+Joseph,+MI";

  const parkLightbox = [
    { src: "/images/img-1.jpg", alt: "Rendering of the rocket football field and park" },
    { src: "/images/img-3.jpg", alt: "Aerial rendering of the baseball and softball fields" },
  ];

  const galleryLightbox = [
    { src: "/images/img-12.jpg", alt: "Athletes celebrating on the field" },
    { src: "/images/img-6.jpg", alt: "Kids catching a pass" },
    { src: "/images/img-11.jpg", alt: "Flag football matchup" },
    { src: "/images/img-9.jpg", alt: "Player running with the football" },
    { src: "/images/img-10.jpg", alt: "Open-field flag pull" },
    { src: "/images/img-13.jpg", alt: "Kids tracking a pass" },
    { src: "/images/img-8.jpg", alt: "Bears paw prints on the trail" },
    { src: "/images/img-5.jpg", alt: "Championship trophy circle" },
  ];

  const openLightbox = (items: { src: string; alt: string }[], index: number) => {
    setLightbox({ items, index });
  };

  const stepLightbox = (dir: -1 | 1) => {
    setLightbox((current) => {
      if (!current || current.items.length < 2) return current;
      const next = (current.index + dir + current.items.length) % current.items.length;
      return { ...current, index: next };
    });
  };

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = 0;
      const hb = heroBgRef.current;
      if (hb && hb.parentElement) {
        const r = hb.parentElement.getBoundingClientRect();
        hb.style.transform = `translate3d(0,${-r.top * 0.35}px,0)`;
      }
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
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <SiteChrome home>
      <section
        id="top"
        data-screen-label="Hero"
        className="sj-hero"
        style={{
          position: 'relative',
          background: '#00214D',
          color: '#fff',
          overflow: 'hidden',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'flex-end',
          borderRadius: '0 0 48px 48px',
        }}
      >
        <div ref={heroBgRef} style={{position: 'absolute', left: '0', right: '0', top: '-14%', bottom: '-14%', willChange: 'transform'}}>
          <img src="/images/img-7.jpg" alt="Hero action photo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(100deg,rgba(0,33,77,.97) 0%,rgba(0,33,77,.85) 38%,rgba(0,33,77,.15) 75%),linear-gradient(0deg,rgba(0,33,77,.9) 0%,rgba(0,33,77,0) 40%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 2px,transparent 2px 160px)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="sj-section-pad"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(180px,24vh,220px) 28px 0',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '.18em',
              textTransform: 'uppercase',
              color: '#E7BA22',
            }}
          >
            St. Joseph, Michigan · Ages 5–18
          </div>
          <h1
            style={{
              fontWeight: 900,
              fontStyle: 'italic',
              textTransform: 'uppercase',
              fontSize: 'clamp(38px,7.6vw,114px)',
              lineHeight: 0.88,
              letterSpacing: '-.035em',
              margin: '26px 0 0',
            }}
          >
            <span style={{ display: 'block' }}>One Park.</span>
            <span style={{ display: 'block', color: '#E7BA22' }}>Many Sports.</span>
            <span style={{ display: 'block', color: 'transparent', WebkitTextStroke: '2px #fff' }}>
              Every Kid.
            </span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(17px,1.5vw,20px)',
              lineHeight: 1.55,
              color: '#E4E9F2',
              maxWidth: '560px',
              margin: '28px 0 0',
              whiteSpace: 'pre-line',
            }}
          >
            {`Bringing football, baseball, softball, and more together.
A place for St. Joseph kids to play, grow, and thrive.
Built for ages 5–18 and every ability.`}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              marginTop: '34px',
              pointerEvents: 'auto',
            }}
          >
            <a
              href="#park"
              style={{
                display: 'inline-block',
                background: '#E7BA22',
                color: '#00214D',
                padding: '18px 34px',
                transform: 'skewX(-12deg)',
                borderRadius: '10px',
                fontWeight: 900,
                fontSize: '15px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
              data-hover='{"background": "#fff", "color": "#00214D"}'
            >
              <span style={{ display: 'inline-block', transform: 'skewX(12deg)' }}>
                See the Plan
              </span>
            </a>
          </div>
          <div style={{ height: 'clamp(56px,8vh,96px)' }} />
        </div>
      </section>
      <section id="about" data-screen-label="About" className="sj-section-pad sj-section-y" style={{position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '110px 28px'}}>
        <div style={{display: 'block'}}>
          <div style={{position: 'relative', maxWidth: '820px'}}>
            <div style={{position: 'relative', fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#00214D', display: 'flex', alignItems: 'center', gap: '12px'}}>
              About the Foundation
            </div>
            <h2 className="sj-nowrap-safe" style={{position: 'relative', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(32px,4.6vw,64px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '16px 0 0', color: '#00214D', whiteSpace: 'nowrap'}}>
              Room for every
              <br />
              kid on the roster.
            </h2>
            <p style={{fontSize: '19px', lineHeight: 'calc(1em + 10px)', margin: '20px 0 0', maxWidth: '620px', textWrap: 'pretty'}}>
              St. Joseph Youth Sports Foundation is working toward a simple promise: a family’s budget or a child’s physical ability should never decide who gets to play.
            </p>
          </div>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: '56px', marginTop: '64px', alignItems: 'start'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {mission.map((m, mIdx) => (
              <React.Fragment key={mIdx}>
                <div style={{display: 'grid', gridTemplateColumns: '52px minmax(0,1fr)', gap: '18px', padding: mIdx === 0 ? '0 0 20px' : '20px 0', borderBottom: '1px solid #D4D0C4', alignItems: 'start'}}>
                  <span style={{width: '44px', height: '44px', borderRadius: '50%', background: '#00214D', color: '#E7BA22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontStyle: 'italic', fontSize: '18px', lineHeight: '1', marginTop: '2px'}}>
                    {m.n}
                  </span>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                    <h3 style={{margin: '0', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '19px', lineHeight: 'calc(1em + 10px)', color: '#00214D'}}>
                      {m.h}
                    </h3>
                    <p style={{margin: '0', fontSize: '16px', lineHeight: 'calc(1em + 10px)', textWrap: 'pretty'}}>
                      {m.t}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
            <a
              href="#park"
              style={{
                display: 'inline-block',
                alignSelf: 'start',
                marginTop: '28px',
                background: '#E7BA22',
                color: '#00214D',
                padding: '16px 30px',
                transform: 'skewX(-12deg)',
                borderRadius: '10px',
                fontWeight: 900,
                fontSize: '14px',
                letterSpacing: '.08em',
                textTransform: 'uppercase',
              }}
              data-hover='{"background": "#00214D", "color": "#E7BA22"}'
            >
              <span style={{ display: 'inline-block', transform: 'skewX(12deg)' }}>
                See the Plan
              </span>
            </a>
          </div>
          <div style={{position: 'relative', aspectRatio: '4/5', borderRadius: '18px', overflow: 'hidden', borderBottom: '6px solid #E7BA22', boxShadow: '16px 16px 0 #00214D'}}>
            <img src="/images/img-about.jpg" alt="Kids playing flag football" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          </div>
        </div>
      </section>
      <section id="story" data-screen-label="Our Story" style={{position: 'relative', background: '#00214D', color: '#fff', overflow: 'hidden'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))'}}>
          <div style={{position: 'relative', minHeight: '560px'}}>
            <img src="/images/img-12.jpg" alt="Families on the sidelines photo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(0deg,rgba(0,33,77,.92) 0%,rgba(0,33,77,0) 55%)', pointerEvents: 'none'}}>
            </div>
            <div style={{position: 'absolute', left: '32px', right: '32px', bottom: '32px', pointerEvents: 'none'}}>
              <div style={{fontWeight: '900', fontStyle: 'italic', fontSize: 'clamp(72px,9vw,128px)', lineHeight: '1', color: '#E7BA22', letterSpacing: '-.03em'}}>
                2021
              </div>
              <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.2em', textTransform: 'uppercase', marginTop: '6px'}}>
                The year SJYSF was founded
              </div>
            </div>
          </div>
          <div style={{padding: '96px clamp(28px,5vw,80px)'}}>
            <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#E7BA22', display: 'flex', alignItems: 'center', gap: '12px'}}>
              Our Story
            </div>
            <h2 style={{fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(34px,4vw,54px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '16px 0 36px'}}>
              It started in
              <br />
              the parking lot.
            </h2>
            {[
              {
                label: 'The problem',
                title: 'Too many kids, not enough fields',
                body: 'Like a lot of St. Joseph parents, we spent our evenings circling crowded lots, chasing practice times that changed week to week and making do at fields with few amenities. Our Flag and Rocket Football programs needed a home, and baseball and softball needed more room to grow.',
                src: '/icons/story/football-field.png',
              },
              {
                label: 'What we found',
                title: 'No accessible field for 55 miles',
                body: 'When we talked with local youth sports organizations, we heard the same thing again and again: programs were growing faster than the fields could handle. We also learned there isn’t a single accessible field or dugout within 55 miles of our community.',
                src: '/icons/story/accessibility.png',
              },
              {
                label: 'What we did',
                title: 'We started building it ourselves',
                body: 'In 2021 we founded the St. Joseph Youth Sports Foundation, a 501(c)(3) nonprofit that leads the planning, fundraising and construction of the park. Once it’s complete, St. Joseph Charter Township will maintain it as a public park, and SJYSF will continue to oversee it and raise funds for future improvements.',
                src: '/icons/story/construction.png',
              },
            ].map((row) => (
              <div className="sj-story-row" key={row.label}>
                <span
                  aria-label={row.label}
                  title={row.label}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid #E7BA22',
                    background: 'rgba(231,186,34,.18)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={row.src}
                    alt=""
                    aria-hidden="true"
                    width={36}
                    height={36}
                    style={{ width: '36px', height: '36px', display: 'block', objectFit: 'contain' }}
                  />
                </span>
                <div>
                  <h3 style={{margin: '0', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: '22px', lineHeight: 'calc(1em + 10px)'}}>
                    {row.title}
                  </h3>
                  <p style={{margin: '8px 0 0', fontSize: '16px', lineHeight: 'calc(1em + 10px)', color: '#D9E1EE', textWrap: 'pretty'}}>
                    {row.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background: '#F3F1EA', color: '#1A1F21', padding: '80px 0'}}>
          <div className="sj-section-pad" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 28px'}}>
            <div style={{maxWidth: '560px'}}>
              <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#00214D'}}>
                Leadership
              </div>
              <h3 style={{margin: '14px 0 0', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(30px,3.4vw,46px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', color: '#00214D'}}>
                Meet the board
              </h3>
              <p style={{margin: '16px 0 0', fontSize: '17px', lineHeight: 'calc(1em + 10px)', maxWidth: '480px'}}>
                Our volunteer board leads the planning, fundraising and construction of the park. Have a question for the board? Reach us here.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px'}}>
                <a href="tel:2694146048" style={{display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: '800', color: '#00214D', width: 'fit-content'}} data-hover='{"color": "#1A1F21"}'>
                  <span style={{width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(231,186,34,.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00214D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                  </span>
                  269-414-6048
                </a>
                <a href="mailto:sjyouthsports@gmail.com" style={{display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '16px', fontWeight: '800', color: '#00214D', width: 'fit-content'}} data-hover='{"color": "#1A1F21"}'>
                  <span style={{width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(231,186,34,.18)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00214D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </span>
                  sjyouthsports@gmail.com
                </a>
              </div>
            </div>

            <div className="sj-team-grid">
              {board.map((b) => (
                <article key={b.n} className="sj-team-member">
                  <div className="sj-team-photo" aria-hidden="true">
                    <span>{b.i}</span>
                  </div>
                  <div className="sj-team-meta">
                    <h4>{b.n}</h4>
                    <p>{b.r}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="programs" data-screen-label="Sports" className="sj-section-y" style={{position: 'relative', background: '#2F7E2E', color: '#fff', overflow: 'hidden', borderRadius: '0', margin: '0', padding: '120px 0 110px'}}>
        <div style={{position: 'absolute', inset: '0', overflow: 'hidden', pointerEvents: 'none'}}>
          <div ref={fieldRef} className="sj-fixed-bg" style={{position: 'absolute', left: '0', right: '0', top: '0', bottom: '0', backgroundColor: '#1F5A22', backgroundImage: 'url(/images/img-programs.jpg)', backgroundSize: 'cover', backgroundPosition: 'center 30%', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
          </div>
        </div>
        <div style={{position: 'absolute', inset: '0', background: 'linear-gradient(180deg,rgba(0,33,77,.85) 0%,rgba(0,33,77,.6) 30%,rgba(0,33,77,.45) 60%,rgba(0,20,10,.55) 100%)', pointerEvents: 'none'}}>
        </div>
        <div className="sj-section-pad" style={{position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '0 28px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '24px', flexWrap: 'wrap'}}>
            <div>
              <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#E7BA22', display: 'flex', alignItems: 'center', gap: '12px'}}>
                Programs
              </div>
              <h2 className="sj-nowrap-safe" style={{fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(34px,4.6vw,64px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '16px 0 0', textShadow: '0 4px 24px rgba(0,0,0,.45)', whiteSpace: 'nowrap'}}>
                Pick your <span style={{color: '#E7BA22'}}>game.</span>
              </h2>
              <p style={{maxWidth: '620px', fontSize: '18px', lineHeight: 'calc(1em + 10px)', color: '#FFFFFF', margin: '20px 0 0', textShadow: '0 2px 12px rgba(0,0,0,.45)'}}>
                Football in the fall and ball fields all summer. The park is planned around the sports St. Joseph kids already love, for ages 5–18 and every skill level.
              </p>
            </div>
          </div>
          <div className="sj-sports-grid">
            {sports.map((p) => (
              <a key={p.num} href="#contact" className="sj-sports-card">
                <img src={p.img} alt={p.ph} />
                <span className="sj-sports-shade" aria-hidden="true" />
                <span className="sj-sports-num" aria-hidden="true">
                  {p.num}
                </span>
                <h3>{p.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section id="park" data-screen-label="Facilities & Amenities" className="sj-fixed-bg sj-section-y" style={{position: 'relative', backgroundColor: '#0F2A12', backgroundImage: 'url(/images/img-15.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', color: '#fff', padding: '0 0 110px', overflow: 'hidden', marginTop: '0', borderTop: '6px solid #E7BA22'}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(8,18,10,.82) 0%,rgba(8,18,10,.68) 45%,rgba(8,18,10,.88) 100%)', pointerEvents: 'none'}} aria-hidden="true" />
        <div className="sj-section-pad" style={{position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '90px 28px 0'}}>
          <div>
            <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#E7BA22', display: 'flex', alignItems: 'center', gap: '12px'}}>
              The Park
            </div>
            <h2 className="sj-park-headline" style={{fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(32px,4.6vw,64px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '16px 0 0', maxWidth: '11em'}}>
              <span className="sj-park-headline-line">Nearly 40 acres.</span>{' '}
              <span className="sj-park-headline-line" style={{ color: '#E7BA22' }}>Built for game day.</span>
            </h2>
            <p style={{fontSize: '18px', lineHeight: 'calc(1em + 10px)', color: '#FFFFFF', margin: '18px 0 0', maxWidth: '620px'}}>
              Fields, facilities and family space, all planned for the corner of Maiden Lane and Hollywood Road in St. Joseph Charter Township.
            </p>
          </div>
          <div className="sj-park-scoreboards" aria-label="Park scoreboard stats">
            {parkStats.map((s) => (
              <div key={s.l.join(" ")} className="sj-park-scoreboard">
                <span className="sj-park-scoreboard-hang" aria-hidden="true" />
                <span className="sj-park-scoreboard-hang sj-park-scoreboard-hang-right" aria-hidden="true" />
                <div className="sj-park-scoreboard-face">
                  <ScoreboardCount value={s.n} size="lg" />
                  <div className="sj-park-scoreboard-label">
                    {s.l[0]}
                    <br />
                    {s.l[1]}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '22px', marginTop: '40px', alignItems: 'start'}}>
            {featureGroups.map((g, gIdx) => (
              <React.Fragment key={gIdx}>
                <div style={{position: 'relative', background: '#000', border: '5px solid #E7BA22', borderRadius: '14px', padding: '10px', boxShadow: '0 0 0 3px #1A1F21,0 30px 60px rgba(0,0,0,.5)'}}>
                  <span style={{position: 'absolute', top: '-18px', left: '28px', width: '10px', height: '18px', background: '#3A3F42', borderRadius: '2px 2px 0 0'}}>
                  </span>
                  <span style={{position: 'absolute', top: '-18px', right: '28px', width: '10px', height: '18px', background: '#3A3F42', borderRadius: '2px 2px 0 0'}}>
                  </span>
                  <div style={{background: '#1A1F21', borderRadius: '6px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px'}}>
                    <span style={{fontWeight: '900', fontSize: '22px', textTransform: 'uppercase', letterSpacing: '.1em', color: '#fff', lineHeight: '1.2'}}>
                      {g.title}
                    </span>
                    <span style={{background: '#000', border: '1px solid #3A3F42', padding: '5px 10px', fontSize: '11px', fontWeight: '900', letterSpacing: '.18em', textTransform: 'uppercase', color: '#E7BA22', textShadow: '0 0 8px rgba(231,186,34,.6)', lineHeight: '1.2', whiteSpace: 'nowrap'}}>
                      {g.sub}
                    </span>
                  </div>
                  <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px'}}>
                    {g.items.map((it, itIdx) => (
                      <React.Fragment key={itIdx}>
                        <div style={{display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 58px', alignItems: 'center', gap: '12px', background: 'radial-gradient(rgba(255,255,255,.06) 1px,transparent 1.4px) 0 0/6px 6px,#0B0D0E', borderRadius: '4px', padding: '8px 8px 8px 14px'}}>
                          <span style={{fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '.05em', lineHeight: '1.3', color: '#fff'}}>
                            {it.t}
                          </span>
                          <ScoreboardCount value={Number(it.q)} size="sm" />
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div className="sj-park-media">
            <div className="sj-park-media-hero sj-park-video">
              <iframe
                src="https://www.youtube.com/embed/M_XnO_lXDUs?rel=0&modestbranding=1"
                title="Fly-over video of the park"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <span className="sj-park-video-label">Fly-over video</span>
            </div>
            <div className="sj-park-side">
              <button
                type="button"
                className="sj-park-side-item"
                onClick={() => openLightbox(parkLightbox, 0)}
                aria-label="View larger rendering of the rocket football field and park"
              >
                <img src="/images/img-1.jpg" alt="Rendering of the rocket football field and park" />
              </button>
              <button
                type="button"
                className="sj-park-side-item"
                onClick={() => openLightbox(parkLightbox, 1)}
                aria-label="View larger aerial rendering of the baseball and softball fields"
              >
                <img src="/images/img-3.jpg" alt="Aerial rendering of the baseball and softball fields" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="gallery" data-screen-label="Photo & Video Gallery" className="sj-section-y" style={{background: '#00214D', color: '#fff', padding: '100px 0'}}>
        <div className="sj-section-pad" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 28px'}}>
          <div>
            <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#E7BA22', display: 'flex', alignItems: 'center', gap: '12px'}}>
              Gallery
            </div>
            <h2 style={{fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(38px,4.6vw,64px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '16px 0 0'}}>
              From the
              <span style={{color: '#E7BA22'}}>
                sidelines
              </span>
            </h2>
            <p style={{margin: '14px 0 0', maxWidth: '520px', fontSize: '16px', lineHeight: 'calc(1em + 10px)', color: '#D9E1EE'}}>
              Follow along for more game-day photos, highlights, and community moments.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '22px'}}>
              <a href="https://www.instagram.com/sjyouthsports/" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#E7BA22', color: '#00214D', padding: '14px 26px', transform: 'skewX(-12deg)', borderRadius: '10px', fontWeight: '900', fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase', overflow: 'visible'}} data-hover='{"background": "#fff", "color": "#00214D"}'>
                <span style={{display: 'inline-flex', alignItems: 'center', gap: '10px', transform: 'skewX(12deg)', overflow: 'visible'}}>
                  <span style={{width: '20px', height: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'visible', lineHeight: 0}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display: 'block', overflow: 'visible'}}>
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  Instagram
                </span>
              </a>
              <a href="https://www.facebook.com/SJYouthSports/" target="_blank" rel="noopener noreferrer" style={{display: 'inline-flex', alignItems: 'center', gap: '10px', border: '2px solid #fff', color: '#fff', padding: '14px 22px', transform: 'skewX(-12deg)', borderRadius: '10px', fontWeight: '900', fontSize: '13px', letterSpacing: '.08em', textTransform: 'uppercase'}} data-hover='{"background": "#E7BA22", "borderColor": "#E7BA22", "color": "#00214D"}'>
                <span style={{display: 'inline-flex', alignItems: 'center', gap: '10px', transform: 'skewX(12deg)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14 13.5h2.5l1-4H14v-2.3c0-1.1.3-1.9 2-1.9h1.7V1.5C17.1 1.4 15.8 1 14.3 1 11.1 1 9 3 9 6.4V9.5H6.5v4H9V23h5v-9.5z" />
                  </svg>
                  Facebook
                </span>
              </a>
            </div>
          </div>
          <div className="sj-gallery-grid">
            {[
              { src: '/images/img-12.jpg', alt: 'Athletes celebrating on the field', style: { gridColumn: '1', gridRow: '1 / span 2' } },
              { src: '/images/img-6.jpg', alt: 'Kids catching a pass', style: { gridColumn: '2', gridRow: '1' } },
              { src: '/images/img-11.jpg', alt: 'Flag football matchup', style: { gridColumn: '3', gridRow: '1' } },
              { src: '/images/img-9.jpg', alt: 'Player running with the football', style: { gridColumn: '3', gridRow: '2' } },
              { src: '/images/img-10.jpg', alt: 'Open-field flag pull', style: { gridColumn: '4', gridRow: '1' } },
              { src: '/images/img-13.jpg', alt: 'Kids tracking a pass', style: { gridColumn: '2', gridRow: '2' } },
              { src: '/images/img-8.jpg', alt: 'Bears paw prints on the trail', style: { gridColumn: '4', gridRow: '2' } },
              { src: '/images/img-5.jpg', alt: 'Championship trophy circle', style: { gridColumn: '5', gridRow: '1 / span 2' } },
            ].map((g, gIdx) => (
              <button
                key={g.src}
                type="button"
                onClick={() => openLightbox(galleryLightbox, gIdx)}
                aria-label={`View larger: ${g.alt}`}
                style={{
                  ...g.style,
                  position: 'relative',
                  padding: 0,
                  border: 0,
                  background: 'transparent',
                  cursor: 'zoom-in',
                  overflow: 'hidden',
                }}
              >
                <img src={g.src} alt={g.alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section id="location" data-screen-label="Location & Google Maps" className="sj-fixed-bg sj-section-y" style={{position: 'relative', backgroundColor: '#1F5A22', backgroundImage: 'url(/images/img-location-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', color: '#fff', overflow: 'hidden', padding: '80px 0'}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,33,77,.48) 0%,rgba(0,33,77,.36) 45%,rgba(0,33,77,.52) 100%)', pointerEvents: 'none'}} aria-hidden="true" />
        <div className="sj-section-pad" style={{position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: '24px', alignItems: 'stretch'}}>
          <div style={{display: 'flex', alignItems: 'center', minWidth: '0'}}>
            <div style={{background: '#00214D', borderRadius: '18px', padding: '36px 34px 30px', borderBottom: '6px solid #E7BA22', boxShadow: '0 30px 70px rgba(0,0,0,.45)', position: 'relative', zIndex: '1'}}>
              <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#E7BA22'}}>
                Find Us
              </div>
              <h2 style={{fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(32px,3.6vw,48px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '12px 0 22px'}}>
                Coming to{" "}
                <span style={{color: '#E7BA22'}}>
                  Maiden Lane.
                </span>
              </h2>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.14)'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 22V4">
                    </path>
                    <path d="M4 4h13l-2 4 2 4H4">
                    </path>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.2em', textTransform: 'uppercase', color: '#E7BA22', lineHeight: '1.4'}}>
                    Park Site
                  </div>
                  <a href={parkMapsUrl} target="_blank" rel="noopener noreferrer" style={{display: 'block', marginTop: '4px', fontSize: '17px', fontWeight: '800', lineHeight: '1.4', color: '#fff'}} data-hover='{"color": "#E7BA22"}'>
                    {'Corner of Maiden Lane & Hollywood Roads'}
                  </a>
                  <a href={parkMapsUrl} target="_blank" rel="noopener noreferrer" style={{display: 'block', marginTop: '2px', fontSize: '14px', color: '#C9D3E3', lineHeight: '1.5'}} data-hover='{"color": "#E7BA22"}'>
                    St. Joseph Charter Township, MI
                  </a>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.14)'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z">
                    </path>
                    <circle cx="12" cy="10" r="3">
                    </circle>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.2em', textTransform: 'uppercase', color: '#E7BA22', lineHeight: '1.4'}}>
                    Site Size
                  </div>
                  <div style={{marginTop: '4px', fontSize: '17px', fontWeight: '800', lineHeight: '1.4'}}>
                    Nearly 40 acres
                  </div>
                  <div style={{marginTop: '2px', fontSize: '14px', color: '#C9D3E3', lineHeight: '1.5'}}>
                    Will become a St. Joseph Charter Township park
                  </div>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,.14)'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2">
                    </rect>
                    <path d="m22 6-10 7L2 6">
                    </path>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.2em', textTransform: 'uppercase', color: '#E7BA22', lineHeight: '1.4'}}>
                    Mailing Address
                  </div>
                  <a href={mailMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open mailing address in Google Maps" style={{display: 'block', marginTop: '4px', fontSize: '17px', fontWeight: '800', lineHeight: '1.45', color: '#fff', textDecoration: 'underline', textUnderlineOffset: '3px'}} data-hover='{"color": "#E7BA22"}'>
                    1816 Nash Dr.
                    <br />
                    St. Joseph, MI 49085
                  </a>
                </div>
              </div>
              <div className="sj-amenities">
                {[
                  { src: '/icons/parking.png', label: ['Ample', 'Parking'] },
                  { src: '/icons/spectator.png', label: ['Spectator', 'Areas'] },
                  { src: '/icons/restroom.png', label: ['Restrooms', '& Concessions'] },
                  { src: '/icons/accessible.png', label: ['Accessible', 'Facility'] },
                ].map((item) => (
                  <div key={item.src} style={{display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,.06)', borderRadius: '12px', padding: '14px 16px'}}>
                    <span style={{width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(231,186,34,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}} aria-hidden="true">
                      <img
                        src={item.src}
                        alt=""
                        width={30}
                        height={30}
                        style={{
                          display: 'block',
                          width: '30px',
                          height: '30px',
                          objectFit: 'contain',
                          filter: 'brightness(0) saturate(100%) invert(79%) sepia(61%) saturate(746%) hue-rotate(359deg) brightness(97%) contrast(92%)',
                        }}
                      />
                    </span>
                    <span style={{fontSize: '16px', fontWeight: '900', lineHeight: '1.25', color: '#fff', textTransform: 'uppercase', letterSpacing: '.02em'}}>
                      {item.label[0]}
                      <br />
                      {item.label[1]}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '22px'}}>
                <a href={parkDirectionsUrl} target="_blank" rel="noopener noreferrer" style={{display: 'inline-block', background: '#E7BA22', color: '#00214D', padding: '16px 30px', transform: 'skewX(-12deg)', borderRadius: '10px', fontWeight: '900', fontSize: '14px', letterSpacing: '.08em', textTransform: 'uppercase'}} data-hover='{"background": "#fff", "color": "#00214D"}'>
                  <span style={{display: 'inline-block', transform: 'skewX(12deg)'}}>
                    Get Directions
                  </span>
                </a>
                <a href="tel:2694146048" style={{display: 'inline-block', background: '#fff', color: '#00214D', padding: '16px 30px', transform: 'skewX(-12deg)', borderRadius: '10px', fontWeight: '900', fontSize: '14px', letterSpacing: '.08em', textTransform: 'uppercase'}} data-hover='{"background": "#E7BA22", "color": "#00214D"}'>
                  <span style={{display: 'inline-flex', alignItems: 'center', gap: '10px', transform: 'skewX(12deg)'}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
                    </svg>
                    269-414-6048
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div style={{position: 'relative', minHeight: '420px', minWidth: '0', borderRadius: '18px', overflow: 'hidden', border: '6px solid #E7BA22'}}>
            <iframe title="SJ Sports Park location" src="https://maps.google.com/maps?q=Maiden%20Ln%20%26%20Hollywood%20Rd%2C%20St.%20Joseph%2C%20MI&z=14&output=embed" style={{position: 'absolute', inset: '0', border: '0', width: '100%', height: '100%', display: 'block', filter: 'grayscale(.35) contrast(1.05)'}} loading="lazy">
            </iframe>
          </div>
        </div>
      </section>
      <section id="contact" data-screen-label="Contact" className="sj-section-y" style={{background: '#fff', padding: '110px 0'}}>
        <div className="sj-section-pad" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: '48px'}}>
          <div>
            <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#00214D', display: 'flex', alignItems: 'center', gap: '12px'}}>
              Contact
            </div>
            <h2 style={{fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(34px,4vw,54px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '16px 0 0', color: '#00214D'}}>
              Let’s talk.
            </h2>
            <p style={{fontSize: '17px', lineHeight: 'calc(1em + 10px)', margin: '18px 0 32px', maxWidth: '480px'}}>
              Want to sponsor, volunteer or just learn more about the park? Reach out and someone from our board will be in touch.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: '26px 24px'}}>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z">
                    </path>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A6880', lineHeight: '1.4'}}>
                    Phone
                  </div>
                  <a href="tel:2694146048" style={{display: 'block', marginTop: '4px', fontSize: '18px', fontWeight: '800', color: '#00214D', lineHeight: '1.4'}} data-hover='{"color": "#1A1F21"}'>
                    269-414-6048
                  </a>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2">
                    </rect>
                    <path d="m22 6-10 7L2 6">
                    </path>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A6880', lineHeight: '1.4'}}>
                    Email
                  </div>
                  <a href="mailto:sjyouthsports@gmail.com" className="sj-nowrap-safe" style={{display: 'block', marginTop: '4px', fontSize: '15px', fontWeight: '800', color: '#00214D', lineHeight: '1.4', whiteSpace: 'nowrap', wordBreak: 'break-word'}} data-hover='{"color": "#1A1F21"}'>
                    sjyouthsports@gmail.com
                  </a>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z">
                    </path>
                    <circle cx="12" cy="10" r="3">
                    </circle>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A6880', lineHeight: '1.4'}}>
                    Mailing Address
                  </div>
                  <a href={mailMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open mailing address in Google Maps" style={{display: 'block', marginTop: '4px', fontSize: '16px', fontWeight: '600', lineHeight: '1.5', color: '#00214D', textDecoration: 'underline', textUnderlineOffset: '3px'}} data-hover='{"color": "#1A1F21"}'>
                    1816 Nash Dr.
                    <br />
                    St. Joseph, MI 49085
                  </a>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 22V4">
                    </path>
                    <path d="M4 4h13l-2 4 2 4H4">
                    </path>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A6880', lineHeight: '1.4'}}>
                    Park Site
                  </div>
                  <a href={parkMapsUrl} target="_blank" rel="noopener noreferrer" style={{display: 'block', marginTop: '4px', fontSize: '16px', fontWeight: '600', lineHeight: '1.5', color: '#00214D'}} data-hover='{"color": "#1A1F21"}'>
                    {'Maiden Lane & Hollywood Rd.'}
                    <br />
                    St. Joseph Charter Township
                  </a>
                </div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '14px', alignItems: 'start'}}>
                <span style={{width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(231,186,34,.14)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7BA22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10">
                    </circle>
                    <path d="M12 6v6l4 2">
                    </path>
                  </svg>
                </span>
                <div>
                  <div style={{fontSize: '11px', fontWeight: '900', letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A6880', lineHeight: '1.4'}}>
                    Hours
                  </div>
                  <div style={{marginTop: '4px', fontSize: '16px', fontWeight: '600', lineHeight: '1.5'}}>
                    Mon–Fri, 9 AM – 5 PM
                    <br />
                    Messages answered within 2 business days
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="sj-contact-form" style={{background: '#00214D', color: '#fff', display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '6px solid #E7BA22'}}>
            <div style={{fontWeight: '900', fontStyle: 'italic', fontSize: '28px', textTransform: 'uppercase'}}>
              Contact Us
            </div>
            {sent ? (
              <div style={{padding: '40px 0', fontSize: '18px', fontWeight: '700', lineHeight: '1.5', color: '#E7BA22'}}>
                Got it, thank you! We’ll be in touch soon.
              </div>
            ) : null}
            {notSent ? (
              <>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px'}}>
                  <input placeholder="Name" required style={{background: '#E8EDF3', border: '1px solid #C5CEDA', padding: '15px 16px', color: '#00214D', font: 'inherit', fontSize: '15px'}} />
                  <input placeholder="Email" type="email" required style={{background: '#E8EDF3', border: '1px solid #C5CEDA', padding: '15px 16px', color: '#00214D', font: 'inherit', fontSize: '15px'}} />
                </div>
                <select style={{background: '#E8EDF3', border: '1px solid #C5CEDA', padding: '15px 16px', color: '#00214D', font: 'inherit', fontSize: '15px'}}>
                  <option>
                    General question
                  </option>
                  <option>
                    Sponsorship
                  </option>
                  <option>
                    Facility rentals
                  </option>
                  <option>
                    Tournaments
                  </option>
                  <option>
                    Miracle League
                  </option>
                </select>
                <textarea placeholder="Message" rows={5} style={{background: '#E8EDF3', border: '1px solid #C5CEDA', padding: '15px 16px', color: '#00214D', font: 'inherit', fontSize: '15px', resize: 'vertical'}} />
                <button type="submit" style={{alignSelf: 'start', background: '#E7BA22', color: '#00214D', border: '0', padding: '17px 32px', transform: 'skewX(-12deg)', borderRadius: '10px', font: 'inherit', fontWeight: '900', fontSize: '14px', letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer'}} data-hover='{"background": "#fff"}'>
                  <span style={{display: 'inline-block', transform: 'skewX(12deg)'}}>
                    Send Message
                  </span>
                </button>
              </>
            ) : null}
          </form>
        </div>
      </section>
      <section id="sponsors" data-screen-label="Sponsors" className="sj-section-y" style={{background: '#EEF1F5', padding: '100px 0'}}>
        <div className="sj-section-pad" style={{maxWidth: '1280px', margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,400px),1fr))', gap: '56px', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: '12px', fontWeight: '900', letterSpacing: '.22em', textTransform: 'uppercase', color: '#00214D', display: 'flex', alignItems: 'center', gap: '12px'}}>
              Our Sponsors
            </div>
            <h2 style={{fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', fontSize: 'clamp(34px,4vw,54px)', lineHeight: 'calc(1em + 10px)', letterSpacing: '-.02em', margin: '16px 0 0', color: '#00214D'}}>
              Partners behind every play.
            </h2>
            <p style={{fontSize: '17px', lineHeight: 'calc(1em + 10px)', margin: '22px 0 0', maxWidth: '460px', color: '#3A4554'}}>
              Every fundraiser we host is made possible by businesses right here in Southwest Michigan. Want to put your name behind an event or part of the park? Let’s talk.
            </p>
            <a href="#contact" style={{display: 'inline-block', marginTop: '28px', background: '#00214D', color: '#fff', padding: '16px 30px', transform: 'skewX(-12deg)', borderRadius: '10px', fontWeight: '900', fontSize: '14px', letterSpacing: '.08em', textTransform: 'uppercase'}} data-hover='{"background": "#E7BA22", "color": "#00214D"}'>
              <span style={{display: 'inline-block', transform: 'skewX(12deg)'}}>
                Sponsor the Park
              </span>
            </a>
          </div>
          <div style={{border: '2px solid #00214D', padding: '20px', background: '#fff', boxShadow: '12px 12px 0 #E7BA22'}}>
            <img src="/images/img-2.jpg" alt="Event sponsors: North Pier Brewing, LeValley, DK Boutique, Silver Beach Pizza, Ravitron, L&M Fab Tech, RMB, CPM Construction, M Squared, Honor Credit Union, Abonmarche, Hanson International" style={{display: 'block', width: '100%', maxHeight: '620px', objectFit: 'contain'}} />
          </div>
        </div>
      </section>
      {lightbox ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.items[lightbox.index]?.alt || "Image preview"}
          onClick={() => setLightbox(null)}
          style={{position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,12,28,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'zoom-out'}}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              maxWidth: 'min(1200px, 96vw)',
              maxHeight: '88vh',
            }}
          >
            {lightbox.items.length > 1 ? (
              <button
                type="button"
                onClick={() => stepLightbox(-1)}
                aria-label="Previous image"
                style={{flexShrink: 0, width: '44px', height: '44px', borderRadius: '50%', border: '0', background: '#E7BA22', color: '#00214D', fontSize: '26px', fontWeight: 900, cursor: 'pointer', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                ‹
              </button>
            ) : null}
            <div style={{position: 'relative', maxWidth: '100%', maxHeight: '88vh', lineHeight: 0}}>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close image preview"
                style={{position: 'absolute', top: '10px', right: '10px', width: '40px', height: '40px', borderRadius: '50%', border: '0', background: '#E7BA22', color: '#00214D', fontSize: '24px', fontWeight: 900, cursor: 'pointer', lineHeight: 1, zIndex: 2}}
              >
                ×
              </button>
              <img
                src={lightbox.items[lightbox.index].src}
                alt={lightbox.items[lightbox.index].alt}
                style={{display: 'block', maxWidth: 'min(1080px, calc(96vw - 120px))', maxHeight: '88vh', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 24px 80px rgba(0,0,0,.55)'}}
              />
            </div>
            {lightbox.items.length > 1 ? (
              <button
                type="button"
                onClick={() => stepLightbox(1)}
                aria-label="Next image"
                style={{flexShrink: 0, width: '44px', height: '44px', borderRadius: '50%', border: '0', background: '#E7BA22', color: '#00214D', fontSize: '26px', fontWeight: 900, cursor: 'pointer', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
              >
                ›
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </SiteChrome>
  );
}
