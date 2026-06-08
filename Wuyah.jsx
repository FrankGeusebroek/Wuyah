import { useState, useEffect, useRef } from "react";

/* ============================================================
   WUYAH — Daily Mental Fitness
   Brand Design System (official):
   SKY FAMILY (dominant):
     Sky Light    #B8D4F0  — background dominant, calm, space
     Sky Mid      #8FBCE8  — interactive elements, accents
     Sky Deep     #5A9AD4  — primary buttons, strong accents
     Sky Ink      #2E6FA8  — gradient end, text on light
   SUNRISE FAMILY (supporting):
     Sunrise Rose #F4A8C0  — soft emotional accents
     Rose Deep    #EF7FA4  — Sofia moments, emotional highlights
     Sunrise Orng #F9C07A  — energy, warmth, streak moments
     Orange Deep  #F4A040  — milestones, progressive energy
   NEUTRAL:
     Ink          #18182A  — primary text
     White        #FFFFFF  — cards, surfaces
   ============================================================ */

/* ============================================================
   FORM ENDPOINTS — powered by Formspree (https://formspree.io)
   Setup: create a free account at formspree.io, make two forms,
   and paste your endpoint IDs below.
   ============================================================ */
const FORMS = {
  earlyAccess: "https://formspree.io/f/mgoddrlk",
  contact:     "https://formspree.io/f/mqeoqywl",
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* Sky family */
      --sky-light: #B8D4F0;
      --sky-mid: #8FBCE8;
      --sky-deep: #5A9AD4;
      --sky-ink: #2E6FA8;
      /* Sunrise family */
      --sunrise-rose: #F4A8C0;
      --rose-deep: #EF7FA4;
      --sunrise-orange: #F9C07A;
      --orange-deep: #F4A040;
      /* Neutrals */
      --ink: #18182A;
      --ink-60: rgba(24,24,42,0.60);
      --ink-40: rgba(24,24,42,0.40);
      --ink-15: rgba(24,24,42,0.15);
      --ink-08: rgba(24,24,42,0.08);
      --white: #FFFFFF;
      /* Gradients */
      --bg-hero: linear-gradient(160deg, #C8DFF5 0%, #B8D4F0 40%, #D4C8E8 70%, #E8C8D4 100%);
      --bg-light: linear-gradient(160deg, #D4E8F8 0%, #C0D8F0 100%);
      --bg-warm: linear-gradient(160deg, #EDD8F0 0%, #F0D4E0 50%, #F0E0C8 100%);
      --bg-white: #FFFFFF;
      --sunrise-gradient: linear-gradient(135deg, #B8D4F0 0%, #8FBCE8 30%, #F4A8C0 65%, #F9C07A 100%);
      --font-head: 'Poppins', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--sky-light);
      color: var(--ink);
      font-family: var(--font-body);
      font-weight: 400;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    .fade-up {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
    }
    .fade-up.in-view { opacity: 1; transform: translateY(0); }
    .fade-up.delay-1 { transition-delay: 0.1s; }
    .fade-up.delay-2 { transition-delay: 0.22s; }
    .fade-up.delay-3 { transition-delay: 0.35s; }
    .fade-up.delay-4 { transition-delay: 0.50s; }
    .fade-up.delay-5 { transition-delay: 0.65s; }

    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: var(--font-body); font-weight: 500;
      font-size: 0.95rem; letter-spacing: 0.01em;
      border: none; cursor: pointer; border-radius: 100px;
      padding: 14px 28px;
      transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
      text-decoration: none;
    }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: translateY(0); }

    .btn-primary {
      background: var(--sky-deep);
      color: var(--white);
      box-shadow: 0 8px 24px rgba(90,154,212,0.35);
    }
    .btn-primary:hover {
      background: var(--sky-ink);
      box-shadow: 0 12px 32px rgba(90,154,212,0.45);
    }

    .btn-ghost {
      background: rgba(255,255,255,0.55);
      color: var(--sky-ink);
      border: 1.5px solid rgba(255,255,255,0.8);
      backdrop-filter: blur(12px);
    }
    .btn-ghost:hover {
      background: rgba(255,255,255,0.75);
    }

    .btn-outline {
      background: transparent;
      color: var(--sky-deep);
      border: 1.5px solid var(--sky-deep);
    }
    .btn-outline:hover { background: rgba(90,154,212,0.08); }

    section { position: relative; }

    .input-field {
      background: rgba(255,255,255,0.7);
      border: 1.5px solid rgba(255,255,255,0.9);
      border-radius: 100px; padding: 14px 24px;
      font-family: var(--font-body); font-size: 0.95rem;
      color: var(--ink); outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      width: 100%;
    }
    .input-field::placeholder { color: var(--ink-40); }
    .input-field:focus {
      border-color: var(--sky-deep);
      box-shadow: 0 0 0 3px rgba(90,154,212,0.15);
      background: rgba(255,255,255,0.9);
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--sky-light); }
    ::-webkit-scrollbar-thumb { background: var(--sky-mid); border-radius: 3px; }

    .nav-menu-open { display: flex !important; }
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .mobile-full { width: 100% !important; }
    }
    @media (min-width: 769px) {
      .show-mobile-only { display: none !important; }
    }
  `}</style>
);

/* ── Nav ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <style>{`
        .nav-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 5vw;
          transition: all 0.4s var(--ease-out);
        }
        .nav-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 0;
          border-bottom: 1px solid transparent;
          transition: all 0.4s var(--ease-out);
        }
        .nav-wrap.scrolled {
          background: rgba(184,212,240,0.88);
          backdrop-filter: blur(20px);
        }
        .nav-wrap.scrolled .nav-inner {
          padding: 14px 0;
          border-bottom-color: rgba(90,154,212,0.15);
        }
        .nav-logo {
          font-family: var(--font-head); font-weight: 900;
          font-size: 1.5rem; letter-spacing: -0.02em;
          background: var(--sunrise-gradient);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; cursor: pointer;
        }
        .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; }
        .nav-links a {
          font-size: 0.875rem; font-weight: 400; color: var(--sky-ink);
          text-decoration: none; letter-spacing: 0.01em; transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--ink); }
        .nav-actions { display: flex; align-items: center; gap: 12px; }
        .hamburger {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          background: none; border: none; padding: 4px;
        }
        .hamburger span {
          width: 22px; height: 2px; background: var(--sky-ink); border-radius: 2px;
          transition: all 0.3s;
        }
        @media (max-width: 768px) {
          .nav-links, .nav-actions .btn { display: none; }
          .hamburger { display: flex; }
        }
        .mobile-menu {
          display: none; flex-direction: column;
          background: rgba(184,212,240,0.97); backdrop-filter: blur(20px);
          border-top: 1px solid rgba(90,154,212,0.15);
          padding: 24px 5vw 32px;
        }
        .mobile-menu button {
          font-size: 1.1rem; padding: 16px 0;
          border-bottom: 1px solid rgba(90,154,212,0.15);
          color: var(--sky-ink); background: none;
          border-left: none; border-right: none; border-top: none;
          font-family: var(--font-body); cursor: pointer; text-align: left;
        }
        .mobile-menu .btn-outline { margin-top: 20px; }
      `}</style>
      <nav className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <span className="nav-logo" onClick={() => scrollTo("hero")}>Wuyah</span>
          <ul className="nav-links">
            <li><a href="#systeem" onClick={e => { e.preventDefault(); scrollTo("systeem"); }}>The system</a></li>
            <li><a href="#voor-wie" onClick={e => { e.preventDefault(); scrollTo("voor-wie"); }}>Who it's for</a></li>
            <li><a href="#founder" onClick={e => { e.preventDefault(); scrollTo("founder"); }}>Founder</a></li>
            <li><a href="#samenwerken" onClick={e => { e.preventDefault(); scrollTo("samenwerken"); }}>Partner with us</a></li>
          </ul>
          <div className="nav-actions">
            <button className="btn btn-primary" style={{ fontSize: "0.85rem", padding: "11px 22px" }}
              onClick={() => scrollTo("early-access")}>Early access</button>
            <button className="hamburger show-mobile-only" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span style={menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}}></span>
              <span style={menuOpen ? { opacity: 0 } : {}}></span>
              <span style={menuOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}}></span>
            </button>
          </div>
        </div>
        <div className={`mobile-menu${menuOpen ? " nav-menu-open" : ""}`}>
          <button onClick={() => scrollTo("systeem")}>The system</button>
          <button onClick={() => scrollTo("voor-wie")}>Who it's for</button>
          <button onClick={() => scrollTo("founder")}>Founder</button>
          <button onClick={() => scrollTo("samenwerken")}>Partner with us</button>
          <button className="btn btn-outline mobile-full" onClick={() => scrollTo("early-access")}>Early access →</button>
        </div>
      </nav>
    </>
  );
}

/* ── Hero ── */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        .hero {
          min-height: 100svh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 120px 5vw 80px;
          position: relative; overflow: hidden;
          background: linear-gradient(160deg, #C8DFF5 0%, #B8D4F0 35%, #D0C4E8 65%, #EAC8D4 100%);
        }
        /* Sunrise glow orbs */
        .hero-orb {
          position: absolute; border-radius: 50%;
          filter: blur(70px); pointer-events: none;
        }
        .hero-orb-1 {
          width: 600px; height: 400px; top: 0; left: 50%; transform: translateX(-50%);
          background: radial-gradient(ellipse, rgba(184,212,240,0.8) 0%, rgba(143,188,232,0.4) 50%, transparent 70%);
          animation: orb-float-center 9s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 500px; height: 500px; bottom: -80px; right: -80px;
          background: radial-gradient(circle, rgba(249,192,122,0.45) 0%, rgba(244,160,64,0.20) 45%, transparent 70%);
          animation: orb-float 12s ease-in-out infinite reverse;
        }
        .hero-orb-3 {
          width: 400px; height: 400px; bottom: 10%; left: -80px;
          background: radial-gradient(circle, rgba(244,168,192,0.40) 0%, rgba(239,127,164,0.18) 45%, transparent 70%);
          animation: orb-float 10s ease-in-out infinite 1.5s;
        }
        @keyframes orb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-28px) scale(1.04); }
        }
        @keyframes orb-float-center {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-24px); }
        }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.55); border: 1.5px solid rgba(255,255,255,0.80);
          backdrop-filter: blur(12px); border-radius: 100px;
          padding: 8px 18px; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--sky-ink); margin-bottom: 36px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
        }
        .hero-eyebrow.in { opacity: 1; transform: translateY(0); }
        .eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--sky-deep); box-shadow: 0 0 6px rgba(90,154,212,0.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .hero-headline {
          font-family: var(--font-head); font-weight: 900;
          font-size: clamp(3.5rem, 9vw, 8rem);
          line-height: 0.92; letter-spacing: -0.035em;
          margin-bottom: 20px; position: relative; z-index: 1;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.9s var(--ease-out) 0.15s, transform 0.9s var(--ease-out) 0.15s;
        }
        .hero-headline.in { opacity: 1; transform: translateY(0); }
        .hero-headline-line1 { display: block; color: var(--sky-ink); }
        .hero-headline-line2 {
          display: block;
          background: linear-gradient(135deg, var(--sky-deep) 0%, var(--sky-ink) 25%, var(--rose-deep) 60%, var(--orange-deep) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .hero-sub {
          font-size: clamp(0.95rem, 2vw, 1.15rem); font-weight: 300;
          color: var(--sky-ink); letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 52px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.8s var(--ease-out) 0.3s, transform 0.8s var(--ease-out) 0.3s;
          position: relative; z-index: 1;
        }
        .hero-sub.in { opacity: 1; transform: translateY(0); }

        .hero-actions {
          display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
          margin-bottom: 80px; position: relative; z-index: 1;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.8s var(--ease-out) 0.45s, transform 0.8s var(--ease-out) 0.45s;
        }
        .hero-actions.in { opacity: 1; transform: translateY(0); }

        .hero-stat-strip {
          display: flex; gap: 48px; flex-wrap: wrap; justify-content: center;
          position: relative; z-index: 1;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.8s var(--ease-out) 0.6s, transform 0.8s var(--ease-out) 0.6s;
        }
        .hero-stat-strip.in { opacity: 1; transform: translateY(0); }
        .stat-item { text-align: center; }
        .stat-number {
          font-family: var(--font-head); font-weight: 800;
          font-size: 1.8rem; line-height: 1;
          color: var(--sky-ink);
        }
        .stat-label { font-size: 0.72rem; color: var(--ink-60); letter-spacing: 0.04em; margin-top: 4px; max-width: 130px; }
        .stat-divider { width: 1px; height: 40px; background: rgba(46,111,168,0.2); align-self: center; }
        @media (max-width: 768px) { .stat-divider { display: none; } .hero-stat-strip { gap: 24px; } }

        .hero-scroll {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          opacity: 0; animation: fade-in-scroll 1s var(--ease-out) 1.8s forwards;
        }
        @keyframes fade-in-scroll { to { opacity: 1; } }
        .scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, transparent, var(--sky-deep));
          animation: scroll-anim 2s ease-in-out infinite;
        }
        @keyframes scroll-anim {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .scroll-label { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--sky-ink); opacity: 0.5; }
      `}</style>
      <section className="hero" id="hero">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", width: "100%" }}>
          <div className={`hero-eyebrow${mounted ? " in" : ""}`}>
            <span className="eyebrow-dot"></span>
            Daily Mental Fitness Platform
          </div>
          <h1 className={`hero-headline${mounted ? " in" : ""}`}>
            <span className="hero-headline-line1">Be</span>
            <span className="hero-headline-line2">unshakeable.</span>
          </h1>
          <p className={`hero-sub${mounted ? " in" : ""}`}>Whatever today brings</p>
          <div className={`hero-actions${mounted ? " in" : ""}`}>
            <button className="btn btn-primary" style={{ fontSize: "1rem", padding: "16px 36px", boxShadow: "0 8px 32px rgba(90,154,212,0.40)" }}
              onClick={() => scrollTo("early-access")}>Request early access</button>
            <button className="btn btn-ghost" onClick={() => scrollTo("systeem")}>Discover the system</button>
          </div>
          <div className={`hero-stat-strip${mounted ? " in" : ""}`}>
            <div className="stat-item"><div className="stat-number">1 in 4</div><div className="stat-label">people struggle with mental health issues</div></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><div className="stat-number">€322B</div><div className="stat-label">annual cost of mental health in the EU</div></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><div className="stat-number">Zero</div><div className="stat-label">daily mental fitness routines — until now</div></div>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span className="scroll-label">Scroll</span>
        </div>
      </section>
    </>
  );
}

/* ── Category Claim ── */
function CategoryClaim() {
  const [ref, inView] = useInView();
  return (
    <>
      <style>{`
        .category {
          padding: 100px 5vw;
          background: linear-gradient(180deg, #D4E8F8 0%, #C8D8F0 100%);
        }
        .category-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
        }
        @media (max-width: 900px) { .category-inner { grid-template-columns: 1fr; gap: 48px; } }
        .cat-label {
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--sky-deep); margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .cat-label::before { content: ''; width: 24px; height: 1.5px; background: var(--sky-deep); }
        .cat-headline {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1; letter-spacing: -0.025em;
          color: var(--ink); margin-bottom: 28px;
        }
        .cat-headline em { font-style: normal; color: var(--sky-deep); }
        .cat-body { font-size: 1.05rem; line-height: 1.8; color: var(--ink-60); max-width: 480px; }
        .not-card {
          background: rgba(255,255,255,0.65); border: 1.5px solid rgba(255,255,255,0.90);
          backdrop-filter: blur(12px); border-radius: 16px;
          padding: 18px 22px; display: flex; align-items: center; gap: 16px; margin-bottom: 12px;
          transition: border-color 0.3s;
        }
        .not-card:hover { border-color: rgba(255,255,255,1); }
        .not-card-icon {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(90,154,212,0.10); display: flex; align-items: center;
          justify-content: center; font-size: 1.2rem; flex-shrink: 0;
        }
        .not-card-title {
          font-weight: 500; font-size: 0.9rem; color: var(--ink-60);
          text-decoration: line-through; text-decoration-color: rgba(24,24,42,0.25);
        }
        .not-card-sub { font-size: 0.8rem; color: var(--ink-40); margin-top: 2px; }
        .yes-card {
          background: linear-gradient(135deg, rgba(90,154,212,0.14) 0%, rgba(143,188,232,0.08) 100%);
          border: 1.5px solid rgba(90,154,212,0.35); border-radius: 16px; padding: 22px;
        }
        .yes-card-title { font-family: var(--font-head); font-weight: 800; font-size: 1.05rem; color: var(--sky-ink); margin-bottom: 6px; }
        .yes-card-body { font-size: 0.88rem; color: var(--ink-60); line-height: 1.65; }
      `}</style>
      <section className="category" ref={ref}>
        <div className="category-inner">
          <div>
            <div className={`fade-up${inView ? " in-view" : ""}`}>
              <p className="cat-label">A new category</p>
              <h2 className="cat-headline">
                Not therapy.<br/>Not meditation.<br/>Not coaching.<br/><em>Mental fitness.</em>
              </h2>
              <p className="cat-body">
                Just as you build physical fitness through daily training, you build mental resilience through daily practice. Wuyah is the first platform that makes this structural, personal and accessible every single day.
              </p>
            </div>
          </div>
          <div>
            {[
              { icon: "🧘", title: "Meditation apps", sub: "Symptom relief, no structural development", d: "delay-1" },
              { icon: "💬", title: "Therapy & coaching", sub: "Curative, costly and not available daily", d: "delay-2" },
              { icon: "📈", title: "Productivity tools", sub: "Performance-focused, not mental foundation", d: "delay-3" },
            ].map(c => (
              <div key={c.title} className={`not-card fade-up${inView ? " in-view" : ""} ${c.d}`}>
                <div className="not-card-icon">{c.icon}</div>
                <div>
                  <div className="not-card-title">{c.title}</div>
                  <div className="not-card-sub">{c.sub}</div>
                </div>
              </div>
            ))}
            <div className={`yes-card fade-up${inView ? " in-view" : ""} delay-4`}>
              <div className="yes-card-title">✓ Wuyah: Daily Mental Fitness</div>
              <div className="yes-card-body">Daily, personalised mental training. Preventive. Science-backed. For everyone.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Why Now ── */
function WhyNow() {
  const [ref, inView] = useInView();
  const cards = [
    { number: "1 in 4", accent: "var(--sky-deep)", accentLight: "rgba(90,154,212,0.12)", label: "people experience mental health issues", body: "Burnout, anxiety and depression are the fastest-growing causes of absenteeism in Europe. The costs have risen explosively.", d: "delay-1" },
    { number: "€322B", accent: "var(--rose-deep)", accentLight: "rgba(239,127,164,0.12)", label: "annual economic damage in the EU", body: "Mental health problems cost the European economy more than diabetes, cancer and cardiovascular disease combined.", d: "delay-2" },
    { number: "72%", accent: "var(--orange-deep)", accentLight: "rgba(244,160,64,0.12)", label: "of cases are preventable", body: "The science is clear: structural mental training works. There was simply no daily, scalable solution — until now.", d: "delay-3" },
  ];
  return (
    <>
      <style>{`
        .whynow {
          padding: 100px 5vw;
          background: linear-gradient(160deg, #EDD8F0 0%, #E8D0E4 40%, #F0E0C8 100%);
        }
        .whynow-inner { max-width: 1100px; margin: 0 auto; }
        .section-eyebrow {
          font-size: 0.72rem; font-weight: 500; letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 20px;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .section-eyebrow::before, .section-eyebrow::after {
          content: ''; flex: 0 0 24px; height: 1px; opacity: 0.5;
        }
        .section-heading {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          letter-spacing: -0.03em; line-height: 1.1; color: var(--ink);
        }
        .whynow-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
          margin-top: 64px;
        }
        @media (max-width: 900px) { .whynow-grid { grid-template-columns: 1fr; } }
        .whynow-card {
          background: rgba(255,255,255,0.62); border: 1.5px solid rgba(255,255,255,0.85);
          backdrop-filter: blur(16px); border-radius: 20px; padding: 36px 28px;
          position: relative; overflow: hidden;
          transition: transform 0.3s var(--ease-out), box-shadow 0.3s;
        }
        .whynow-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }
        .whynow-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 20px 20px 0 0; }
        .whynow-number {
          font-family: var(--font-head); font-weight: 900;
          font-size: 3.2rem; line-height: 1; letter-spacing: -0.04em; margin-bottom: 12px;
        }
        .whynow-label { font-size: 0.95rem; font-weight: 500; color: var(--ink); margin-bottom: 10px; }
        .whynow-body { font-size: 0.875rem; color: var(--ink-60); line-height: 1.7; }
      `}</style>
      <section className="whynow" ref={ref}>
        <div className="whynow-inner">
          <div className={`fade-up${inView ? " in-view" : ""}`} style={{ textAlign: "center" }}>
            <p className="section-eyebrow" style={{ color: "var(--rose-deep)" }}>
              <span style={{ background: "var(--rose-deep)", flex: "0 0 24px", height: 1, opacity: 0.5 }}></span>
              Why now
              <span style={{ background: "var(--rose-deep)", flex: "0 0 24px", height: 1, opacity: 0.5 }}></span>
            </p>
            <h2 className="section-heading">The world needs this <em style={{ fontStyle: "normal", color: "var(--rose-deep)" }}>now</em></h2>
          </div>
          <div className="whynow-grid">
            {cards.map(c => (
              <div key={c.number} className={`whynow-card fade-up${inView ? " in-view" : ""} ${c.d}`}>
                <div className="whynow-card-bar" style={{ background: c.accent }}></div>
                <div className="whynow-number" style={{ color: c.accent }}>{c.number}</div>
                <div className="whynow-label">{c.label}</div>
                <div className="whynow-body">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Founder ── */
function Founder() {
  const [ref, inView] = useInView();
  return (
    <>
      <style>{`
        .founder {
          padding: 100px 5vw;
          background: linear-gradient(160deg, #C8DFF5 0%, #D0CCE8 50%, #E0CCE0 100%);
          position: relative;
        }
        .founder-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: auto 1fr; gap: 80px; align-items: start;
        }
        @media (max-width: 900px) { .founder-inner { grid-template-columns: 1fr; gap: 40px; } }
        .founder-visual { display: flex; flex-direction: column; align-items: center; gap: 14px; position: sticky; top: 120px; }
        @media (max-width: 900px) { .founder-visual { position: static; flex-direction: row; align-items: center; gap: 20px; } }
        .founder-avatar {
          width: 120px; height: 120px; border-radius: 50%;
          background: linear-gradient(135deg, var(--sky-deep) 0%, var(--rose-deep) 50%, var(--orange-deep) 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-head); font-weight: 900; font-size: 2rem; color: var(--white);
          box-shadow: 0 0 0 4px rgba(255,255,255,0.7), 0 8px 32px rgba(90,154,212,0.25);
        }
        .founder-name { font-family: var(--font-head); font-weight: 700; font-size: 0.9rem; color: var(--ink); text-align: center; }
        .founder-role { font-size: 0.75rem; color: var(--sky-ink); text-align: center; letter-spacing: 0.04em; }
        .founder-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.60); border: 1.5px solid rgba(90,154,212,0.30);
          border-radius: 100px; padding: 8px 16px; font-size: 0.8rem; color: var(--sky-ink); margin-bottom: 28px;
        }
        .founder-quote {
          font-family: var(--font-head); font-weight: 700;
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          line-height: 1.2; letter-spacing: -0.02em;
          color: var(--ink); margin-bottom: 32px;
        }
        .founder-quote span { color: var(--sky-deep); }
        .founder-body { font-size: 1rem; line-height: 1.8; color: var(--ink-60); max-width: 580px; margin-bottom: 32px; }
        .founder-body p { margin-bottom: 18px; }
        .founder-sig { font-family: var(--font-head); font-weight: 700; font-size: 0.9rem; color: var(--ink-40); }
      `}</style>
      <section className="founder" id="founder" ref={ref}>
        <div className="founder-inner">
          <div className={`founder-visual fade-up${inView ? " in-view" : ""}`}>
            <div className="founder-avatar">FG</div>
            <div>
              <div className="founder-name">Frank Geusebroek</div>
              <div className="founder-role">Founder & Chief Mental Officer</div>
            </div>
          </div>
          <div>
            <div className={`fade-up${inView ? " in-view" : ""} delay-1`}>
              <div className="founder-badge">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sky-deep)", display: "inline-block" }}></span>
                Chief Mental Officer
              </div>
              <h2 className="founder-quote">
                "I believe mental fitness is<br/>the <span>next great</span><br/>health revolution."
              </h2>
              <div className="founder-body">
                <p>Wuyah started with a simple observation: we invest massively in our physical health, yet for mental fitness there is no daily, accessible routine. Therapy is reactive. Meditation apps are passive. Coaching is elitist.</p>
                <p>Wuyah is built on the conviction that mental resilience is structurally trainable — for everyone, every day, with the right combination of science, technology and personality.</p>
                <p>This is my life's work. I'm building Wuyah because the world needs it, and because I believe we can be the first generation to make mental fitness as normal as brushing your teeth.</p>
              </div>
              <p className="founder-sig">Frank Geusebroek, Amsterdam 2026</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── The System ── */
function TheSystem() {
  const [ref, inView] = useInView();
  const pillars = [
    { num: "01", name: "Mindprint", tagline: "Who are you, mentally?", body: "Your unique mental identity profile. Built on proven behavioural science. The foundation of everything.", accent: "var(--sky-deep)", accentRgb: "90,154,212", icon: "◈" },
    { num: "02", name: "Roadmap", tagline: "Your personal growth path.", body: "A tailored development journey. Not generic. Not random. Built around your profile and goals.", accent: "var(--rose-deep)", accentRgb: "239,127,164", icon: "◎" },
    { num: "03", name: "AI Coach Sofia", tagline: "Daily guidance.", body: "Your personal AI coach. Present every day via text, voice and video. Warm, science-backed and always available.", accent: "var(--orange-deep)", accentRgb: "244,160,64", icon: "◉" },
  ];
  return (
    <>
      <style>{`
        .system {
          padding: 100px 5vw;
          background: linear-gradient(180deg, #B8D4F0 0%, #C4D4EC 100%);
          position: relative;
        }
        .system-inner { max-width: 1100px; margin: 0 auto; }
        .system-sub { font-size: 1rem; color: var(--ink-60); max-width: 480px; margin: 18px auto 0; line-height: 1.7; text-align: center; }
        .pillar-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 72px;
        }
        @media (max-width: 900px) { .pillar-grid { grid-template-columns: 1fr; max-width: 440px; margin: 48px auto 0; } }
        .pillar-card {
          background: rgba(255,255,255,0.70); border: 1.5px solid rgba(255,255,255,0.90);
          backdrop-filter: blur(16px); border-radius: 24px; padding: 40px 30px;
          position: relative; overflow: hidden;
          transition: transform 0.3s var(--ease-out), box-shadow 0.3s;
        }
        .pillar-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.10); }
        .pillar-top { position: absolute; top: 0; left: 0; right: 0; height: 3px; border-radius: 24px 24px 0 0; }
        .pillar-glow {
          position: absolute; top: -50px; right: -50px;
          width: 160px; height: 160px; border-radius: 50%; filter: blur(50px); opacity: 0.20;
          pointer-events: none; transition: opacity 0.3s;
        }
        .pillar-card:hover .pillar-glow { opacity: 0.38; }
        .pillar-num { font-family: var(--font-head); font-weight: 900; font-size: 0.72rem; letter-spacing: 0.15em; margin-bottom: 18px; opacity: 0.45; }
        .pillar-icon { font-size: 1.8rem; margin-bottom: 14px; display: block; line-height: 1; }
        .pillar-name { font-family: var(--font-head); font-weight: 800; font-size: 1.5rem; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 8px; color: var(--ink); }
        .pillar-tagline { font-size: 0.88rem; font-weight: 500; margin-bottom: 18px; }
        .pillar-body { font-size: 0.875rem; line-height: 1.7; color: var(--ink-60); }
      `}</style>
      <section className="system" id="systeem" ref={ref}>
        <div className="system-inner">
          <div className={`fade-up${inView ? " in-view" : ""}`} style={{ textAlign: "center" }}>
            <p className="section-eyebrow" style={{ color: "var(--sky-deep)" }}>
              <span style={{ background: "var(--sky-deep)", flex: "0 0 24px", height: 1, opacity: 0.5 }}></span>
              The system
              <span style={{ background: "var(--sky-deep)", flex: "0 0 24px", height: 1, opacity: 0.5 }}></span>
            </p>
            <h2 className="section-heading">Three pillars. <em style={{ fontStyle: "normal", color: "var(--sky-deep)" }}>One foundation.</em></h2>
            <p className="system-sub">Wuyah works with a proprietary three-layer system that integrates every aspect of mental fitness into one coherent daily routine.</p>
          </div>
          <div className="pillar-grid">
            {pillars.map((p, i) => (
              <div key={p.num} className={`pillar-card fade-up${inView ? " in-view" : ""} delay-${i + 1}`}>
                <div className="pillar-top" style={{ background: p.accent }}></div>
                <div className="pillar-glow" style={{ background: p.accent }}></div>
                <div className="pillar-num" style={{ color: p.accent }}>{p.num}</div>
                <span className="pillar-icon" style={{ color: p.accent }}>{p.icon}</span>
                <h3 className="pillar-name">{p.name}</h3>
                <p className="pillar-tagline" style={{ color: p.accent }}>{p.tagline}</p>
                <p className="pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Who It's For ── */
function WhoFor() {
  const [ref, inView] = useInView();
  const audiences = [
    { icon: "🧠", label: "End users", labelColor: "var(--sky-deep)", title: "Everyone who wants to become mentally stronger", body: "From student to CEO. Wuyah is for everyone who wants to structurally build their mental resilience.", cta: "Request early access", ctaId: "early-access", topColor: "var(--sky-deep)" },
    { icon: "🔬", label: "Professionals", labelColor: "var(--rose-deep)", title: "Psychologists, coaches & HR specialists", body: "Strengthen our scientific foundation. Wuyah is looking for knowledge partners in psychology, behavioural science, coaching and HR.", cta: "Become a knowledge partner", ctaId: "samenwerken", topColor: "var(--rose-deep)" },
    { icon: "🚀", label: "Tech & Investors", labelColor: "var(--orange-deep)", title: "Build the next health category with us", body: "Pre-seed and seed investors, tech partners and developers who want to participate in a platform with global ambition.", cta: "Get in touch", ctaId: "samenwerken", topColor: "var(--orange-deep)" },
  ];
  return (
    <>
      <style>{`
        .whofor {
          padding: 100px 5vw;
          background: linear-gradient(160deg, #F0E8F4 0%, #F4E0EC 50%, #F8EED8 100%);
        }
        .whofor-inner { max-width: 1100px; margin: 0 auto; }
        .audience-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; margin-top: 72px; }
        @media (max-width: 900px) { .audience-grid { grid-template-columns: 1fr; } }
        .audience-card {
          background: rgba(255,255,255,0.65); border: 1.5px solid rgba(255,255,255,0.88);
          backdrop-filter: blur(14px); border-radius: 24px; padding: 36px 28px;
          display: flex; flex-direction: column;
          transition: transform 0.3s var(--ease-out), box-shadow 0.3s;
        }
        .audience-card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(0,0,0,0.08); }
        .audience-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          background: rgba(255,255,255,0.70); display: flex; align-items: center;
          justify-content: center; font-size: 1.4rem; margin-bottom: 22px;
        }
        .audience-label { font-size: 0.7rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 10px; }
        .audience-title { font-family: var(--font-head); font-weight: 700; font-size: 1.1rem; line-height: 1.25; color: var(--ink); margin-bottom: 14px; }
        .audience-body { font-size: 0.88rem; line-height: 1.75; color: var(--ink-60); flex: 1; margin-bottom: 28px; }
      `}</style>
      <section className="whofor" id="voor-wie" ref={ref}>
        <div className="whofor-inner">
          <div className={`fade-up${inView ? " in-view" : ""}`} style={{ textAlign: "center" }}>
            <p className="section-eyebrow" style={{ color: "var(--orange-deep)" }}>
              <span style={{ background: "var(--orange-deep)", flex: "0 0 24px", height: 1, opacity: 0.5 }}></span>
              Who it's for
              <span style={{ background: "var(--orange-deep)", flex: "0 0 24px", height: 1, opacity: 0.5 }}></span>
            </p>
            <h2 className="section-heading">Wuyah is for <em style={{ fontStyle: "normal", color: "var(--orange-deep)" }}>everyone</em> who won't wait.</h2>
          </div>
          <div className="audience-grid">
            {audiences.map((a, i) => (
              <div key={a.label} className={`audience-card fade-up${inView ? " in-view" : ""} delay-${i + 1}`}
                style={{ borderTopColor: a.topColor, borderTopWidth: 3 }}>
                <div className="audience-icon-wrap">{a.icon}</div>
                <p className="audience-label" style={{ color: a.labelColor }}>{a.label}</p>
                <h3 className="audience-title">{a.title}</h3>
                <p className="audience-body">{a.body}</p>
                <button className="btn btn-ghost" style={{ alignSelf: "flex-start", fontSize: "0.875rem", color: a.labelColor, borderColor: "rgba(255,255,255,0.9)" }}
                  onClick={() => document.getElementById(a.ctaId)?.scrollIntoView({ behavior: "smooth" })}>
                  {a.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Partner With Us ── */
function PartnerWithUs() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ naam: "", email: "", type: "", bericht: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.naam || !form.email) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch(FORMS.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: form.naam, email: form.email, type: form.type, message: form.bericht }),
      });
      if (res.ok) { setSent(true); }
      else { setError("Something went wrong. Please try again or email us directly."); }
    } catch {
      setError("Could not send message. Please check your connection and try again.");
    } finally { setSending(false); }
  };
  return (
    <>
      <style>{`
        .partner {
          padding: 100px 5vw;
          background: linear-gradient(160deg, #C4D8F0 0%, #D4CCE8 50%, #D8C4D8 100%);
        }
        .partner-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        @media (max-width: 900px) { .partner-inner { grid-template-columns: 1fr; gap: 48px; } }
        .partner-title {
          font-family: var(--font-head); font-weight: 800;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          letter-spacing: -0.025em; line-height: 1.15; color: var(--ink); margin-bottom: 22px;
        }
        .partner-title em { font-style: normal; color: var(--sky-deep); }
        .partner-body { font-size: 1rem; line-height: 1.75; color: var(--ink-60); margin-bottom: 36px; }
        .partner-type {
          background: rgba(255,255,255,0.60); border: 1.5px solid rgba(255,255,255,0.85);
          border-radius: 14px; padding: 16px 18px;
          display: flex; align-items: flex-start; gap: 14px; margin-bottom: 10px;
        }
        .partner-type-icon {
          width: 32px; height: 32px; border-radius: 8px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 1rem;
        }
        .partner-type-label { font-weight: 500; font-size: 0.9rem; color: var(--ink); }
        .partner-type-sub { font-size: 0.8rem; color: var(--ink-40); margin-top: 2px; }
        .contact-form {
          background: rgba(255,255,255,0.72); border: 1.5px solid rgba(255,255,255,0.92);
          backdrop-filter: blur(16px); border-radius: 24px; padding: 40px 36px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        .form-title { font-family: var(--font-head); font-weight: 700; font-size: 1.3rem; color: var(--ink); margin-bottom: 28px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } .contact-form { padding: 28px 20px; } }
        .form-group { display: flex; flex-direction: column; gap: 7px; }
        .form-group.full { grid-column: 1 / -1; }
        .form-label { font-size: 0.75rem; font-weight: 500; color: var(--ink-60); letter-spacing: 0.06em; }
        textarea.input-field { border-radius: 16px; padding: 14px 20px; resize: none; min-height: 110px; font-family: var(--font-body); line-height: 1.6; }
        select.input-field { appearance: none; cursor: pointer; background: rgba(255,255,255,0.75); }
        .form-success { text-align: center; padding: 40px 20px; }
        .form-success-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: linear-gradient(135deg, var(--sky-deep), var(--sky-mid));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem; margin: 0 auto 20px;
        }
        .form-success-title { font-family: var(--font-head); font-weight: 700; font-size: 1.4rem; color: var(--ink); margin-bottom: 10px; }
        .form-success-body { color: var(--ink-60); font-size: 0.95rem; }
      `}</style>
      <section className="partner" id="samenwerken" ref={ref}>
        <div className="partner-inner">
          <div>
            <div className={`fade-up${inView ? " in-view" : ""}`}>
              <p className="section-eyebrow" style={{ color: "var(--rose-deep)", justifyContent: "flex-start" }}>
                <span style={{ background: "var(--rose-deep)", flex: "0 0 24px", height: 1, opacity: 0.5 }}></span>
                Partner with us
              </p>
              <h2 className="partner-title">Build a <em>mentally fit</em><br/>generation with us.</h2>
              <p className="partner-body">Wuyah is looking for partners who believe in the power of preventive mental health. Whether you're a scientist, investor or developer: there's a role for you.</p>
              {[
                { icon: "🔬", label: "Knowledge partner", sub: "Psychology, coaching, HR, medical science", bg: "rgba(90,154,212,0.10)" },
                { icon: "💻", label: "Tech partner", sub: "App development, AI, platform engineering", bg: "rgba(239,127,164,0.10)" },
                { icon: "💰", label: "Investor", sub: "Pre-seed & seed, strategic capital", bg: "rgba(244,160,64,0.12)" },
              ].map(pt => (
                <div key={pt.label} className="partner-type">
                  <div className="partner-type-icon" style={{ background: pt.bg }}>{pt.icon}</div>
                  <div>
                    <div className="partner-type-label">{pt.label}</div>
                    <div className="partner-type-sub">{pt.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`fade-up${inView ? " in-view" : ""} delay-2`}>
            <div className="contact-form">
              {sent ? (
                <div className="form-success">
                  <div className="form-success-icon">✓</div>
                  <div className="form-success-title">Message received!</div>
                  <div className="form-success-body">We'll be in touch as soon as possible.<br/>Thank you for your interest in Wuyah.</div>
                </div>
              ) : (
                <>
                  <p className="form-title">Get in touch</p>
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">NAME</label>
                      <input className="input-field" placeholder="Your name" value={form.naam} onChange={e => setForm({ ...form, naam: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">EMAIL</label>
                      <input className="input-field" type="email" placeholder="name@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="form-group full">
                      <label className="form-label">I AM A</label>
                      <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                        <option value="">Select your type...</option>
                        <option>Knowledge partner (psychology / coaching / HR)</option>
                        <option>Tech partner / developer</option>
                        <option>Investor</option>
                        <option>Media / journalist</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group full">
                      <label className="form-label">MESSAGE</label>
                      <textarea className="input-field" placeholder="Tell us about yourself and how you can contribute..." value={form.bericht} onChange={e => setForm({ ...form, bericht: e.target.value })} />
                    </div>
                    <div className="form-group full">
                      <button className="btn btn-primary"
                        style={{ width: "100%", justifyContent: "center", padding: "16px", opacity: sending ? 0.7 : 1, cursor: sending ? "wait" : "pointer" }}
                        onClick={handleSubmit}
                        disabled={sending}>
                        {sending ? "Sending…" : "Send message"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Early Access ── */
function EarlyAccess() {
  const [ref, inView] = useInView();
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const [eaSending, setEaSending] = useState(false);
  const [eaError, setEaError] = useState("");

  const handleEaSubmit = async () => {
    if (!email.includes("@")) return;
    setEaSending(true);
    setEaError("");
    try {
      const res = await fetch(FORMS.earlyAccess, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setRegistered(true); }
      else { setEaError("Something went wrong. Please try again."); }
    } catch {
      setEaError("Could not connect. Please check your connection.");
    } finally { setEaSending(false); }
  };
  return (
    <>
      <style>{`
        .early-access {
          padding: 120px 5vw;
          background: linear-gradient(160deg, #C2E8F6 0%, #B8D4F0 30%, #D4C4E4 65%, #F0D4C4 100%);
          text-align: center; position: relative; overflow: hidden;
        }
        .ea-sunrise-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #B8D4F0, #8FBCE8, #F4A8C0, #F9C07A, #F4A040);
        }
        .ea-inner { max-width: 640px; margin: 0 auto; position: relative; z-index: 1; }
        .ea-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.60); border: 1.5px solid rgba(255,255,255,0.85);
          backdrop-filter: blur(12px); border-radius: 100px; padding: 8px 18px;
          font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--sky-ink); margin-bottom: 32px;
        }
        .ea-headline {
          font-family: var(--font-head); font-weight: 900;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          line-height: 1.02; letter-spacing: -0.035em;
          color: var(--ink); margin-bottom: 22px;
        }
        .ea-sub { font-size: 1.05rem; line-height: 1.75; color: var(--ink-60); margin-bottom: 48px; }
        .ea-form { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px; }
        .ea-input-wrap { flex: 1 1 280px; max-width: 360px; }
        .ea-note { font-size: 0.78rem; color: var(--ink-40); margin-top: 16px; }
        .ea-success {
          padding: 44px 28px;
          background: rgba(255,255,255,0.65); border: 1.5px solid rgba(255,255,255,0.88);
          backdrop-filter: blur(12px); border-radius: 24px;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
        }
        .ea-success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, var(--sky-deep), var(--rose-deep), var(--orange-deep));
          display: flex; align-items: center; justify-content: center; font-size: 2rem;
          animation: pop-in 0.5s var(--ease-out);
        }
        @keyframes pop-in { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        .ea-success-title { font-family: var(--font-head); font-weight: 800; font-size: 1.6rem; color: var(--ink); }
        .ea-success-body { color: var(--ink-60); font-size: 0.95rem; line-height: 1.6; }
      `}</style>
      <section className="early-access" id="early-access" ref={ref}>
        <div className="ea-sunrise-bar"></div>
        <div className="ea-inner">
          <div className={`fade-up${inView ? " in-view" : ""}`}>
            <div className="ea-badge">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--sky-deep)", boxShadow: "0 0 6px rgba(90,154,212,0.5)" }}></span>
              Launching soon
            </div>
            <h2 className="ea-headline">Be among<br/>the first.</h2>
            <p className="ea-sub">Wuyah is coming. Sign up now for early access and be the first to get access to the platform when it launches.</p>
          </div>
          {registered ? (
            <div className={`ea-success fade-up${inView ? " in-view" : ""}`}>
              <div className="ea-success-icon">🎉</div>
              <div className="ea-success-title">You're on the list!</div>
              <div className="ea-success-body">We'll send you a message as soon as early access is available.<br/>Thank you for believing in Wuyah.</div>
            </div>
          ) : (
            <div className={`fade-up${inView ? " in-view" : ""} delay-1`}>
              <div className="ea-form">
                <div className="ea-input-wrap">
                  <input className="input-field" type="email" placeholder="your@email.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleEaSubmit()} />
                </div>
                <button className="btn btn-primary"
                  style={{ padding: "14px 28px", whiteSpace: "nowrap", opacity: eaSending ? 0.7 : 1, cursor: eaSending ? "wait" : "pointer" }}
                  onClick={handleEaSubmit}
                  disabled={eaSending}>
                  {eaSending ? "Sending…" : "Sign up"}</button>
              </div>
              {eaError && <p style={{ fontSize: "0.82rem", color: "#c0392b", marginBottom: "8px", padding: "8px 16px", background: "rgba(192,57,43,0.08)", borderRadius: "12px" }}>{eaError}</p>}
              <p className="ea-note">No spam. No commitment. Unsubscribe anytime.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ── Footer ── */
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <>
      <style>{`
        .footer {
          background: var(--sky-ink);
          padding: 48px 5vw 36px;
        }
        .footer-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 20px;
        }
        .footer-logo {
          font-family: var(--font-head); font-weight: 900; font-size: 1.25rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #B8D4F0, #F4A8C0, #F9C07A);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .footer-tagline { font-size: 0.78rem; color: rgba(184,212,240,0.50); margin-top: 4px; }
        .footer-links { display: flex; gap: 24px; list-style: none; flex-wrap: wrap; }
        .footer-links a { font-size: 0.82rem; color: rgba(184,212,240,0.60); text-decoration: none; transition: color 0.2s; }
        .footer-links a:hover { color: rgba(184,212,240,1); }
        .footer-copy {
          font-size: 0.76rem; color: rgba(184,212,240,0.35);
          width: 100%; padding-top: 24px;
          border-top: 1px solid rgba(184,212,240,0.12);
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px;
          margin-top: 12px;
        }
        .footer-dot {
          display: inline-block; width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg, var(--sky-mid), var(--sunrise-orange));
          margin-right: 6px; vertical-align: middle;
        }
      `}</style>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">Wuyah</div>
            <div className="footer-tagline">Daily Mental Fitness</div>
          </div>
          <ul className="footer-links">
            {[["The system","systeem"],["Who it's for","voor-wie"],["Founder","founder"],["Partner with us","samenwerken"],["Early access","early-access"]].map(([label, id]) => (
              <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
            ))}
          </ul>
          <div className="footer-copy">
            <span><span className="footer-dot"></span>© 2025 Wuyah. All rights reserved.</span>
            <span>Be unshakeable. Whatever today brings.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── App ── */
export default function Wuyah() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <CategoryClaim />
        <WhyNow />
        <Founder />
        <TheSystem />
        <WhoFor />
        <PartnerWithUs />
        <EarlyAccess />
      </main>
      <Footer />
    </>
  );
}
