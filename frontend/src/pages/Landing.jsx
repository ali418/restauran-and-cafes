import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

/* ─────────────────── Inline CSS Keyframes ─────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body { font-family: 'Cairo', 'Inter', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    33%      { transform: translateY(-18px) rotate(1deg); }
    66%      { transform: translateY(-8px) rotate(-1deg); }
  }
  @keyframes floatB {
    0%,100% { transform: translateY(0px) scale(1); }
    50%      { transform: translateY(-25px) scale(1.03); }
  }
  @keyframes orbPulse {
    0%,100% { opacity: .12; transform: scale(1); }
    50%      { opacity: .2;  transform: scale(1.15); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes borderAnim {
    0%,100% { border-color: rgba(59,130,246,.4); }
    50%      { border-color: rgba(6,182,212,.8); }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 20px rgba(59,130,246,.3); }
    50%      { box-shadow: 0 0 50px rgba(6,182,212,.6); }
  }

  .fade-up   { animation: fadeUp  .7s ease both; }
  .fade-in   { animation: fadeIn  .6s ease both; }
  .slide-in  { animation: slideIn .6s ease both; }

  .delay-1 { animation-delay: .1s; }
  .delay-2 { animation-delay: .2s; }
  .delay-3 { animation-delay: .3s; }
  .delay-4 { animation-delay: .4s; }
  .delay-5 { animation-delay: .5s; }
  .delay-6 { animation-delay: .6s; }

  /* Navbar */
  .lp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%; height: 70px;
    background: rgba(15,23,42,.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,255,255,.08);
    transition: all .3s ease;
  }
  .lp-nav.scrolled {
    height: 60px;
    background: rgba(15,23,42,.97);
    box-shadow: 0 4px 30px rgba(0,0,0,.4);
  }
  .lp-nav-logo {
    display: flex; align-items: center; gap: 10px;
    font-size: 1.3rem; font-weight: 900; color: #fff;
    text-decoration: none; cursor: pointer;
  }
  .lp-nav-logo span { color: #06B6D4; }
  .lp-nav-links { display: flex; align-items: center; gap: 8px; }
  .lp-nav-link {
    color: rgba(255,255,255,.7); font-size: .9rem; font-weight: 600;
    padding: 6px 14px; border-radius: 8px; cursor: pointer;
    transition: all .2s; text-decoration: none; border: none; background: none;
    font-family: inherit;
  }
  .lp-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
  .lp-btn-primary {
    background: linear-gradient(135deg, #3B82F6, #06B6D4);
    color: #fff; font-weight: 700; font-size: .9rem;
    padding: 9px 22px; border-radius: 10px; border: none;
    cursor: pointer; transition: all .3s; font-family: inherit;
    box-shadow: 0 4px 15px rgba(59,130,246,.4);
  }
  .lp-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59,130,246,.5);
  }
  .lp-btn-secondary {
    background: transparent;
    color: #fff; font-weight: 700; font-size: .9rem;
    padding: 9px 22px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,.2);
    cursor: pointer; transition: all .3s; font-family: inherit;
  }
  .lp-btn-secondary:hover {
    background: rgba(255,255,255,.08);
    border-color: rgba(255,255,255,.4);
  }
  .lp-btn-ghost {
    background: rgba(255,255,255,.06);
    color: rgba(255,255,255,.8); font-weight: 600; font-size: .85rem;
    padding: 8px 18px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,.12);
    cursor: pointer; transition: all .3s; font-family: inherit;
  }
  .lp-btn-ghost:hover {
    background: rgba(255,255,255,.12); color: #fff;
  }

  /* ── Hero ── */
  .lp-hero {
    min-height: 100vh;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,.25) 0%, transparent 70%),
                linear-gradient(180deg, #0F172A 0%, #0d1b3e 50%, #0F172A 100%);
    display: flex; flex-direction: column;
    padding-top: 70px; position: relative; overflow: hidden;
  }
  .lp-hero-orb {
    position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none;
    animation: orbPulse 6s ease-in-out infinite;
  }
  .lp-hero-content {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 60px 5% 40px;
    position: relative; z-index: 1;
  }
  .lp-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(59,130,246,.15);
    border: 1px solid rgba(59,130,246,.3);
    color: #93c5fd; font-size: .85rem; font-weight: 700;
    padding: 6px 16px; border-radius: 100px;
    margin-bottom: 24px;
    animation: borderAnim 3s ease-in-out infinite;
  }
  .lp-badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #3B82F6;
    box-shadow: 0 0 8px #3B82F6;
    animation: orbPulse 2s ease-in-out infinite;
  }
  .lp-hero-title {
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 900; line-height: 1.15;
    color: #fff; margin-bottom: 12px;
    letter-spacing: -1px;
  }
  .lp-hero-title .gradient-text {
    background: linear-gradient(135deg, #3B82F6, #06B6D4, #a78bfa);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }
  .lp-hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.2rem);
    color: rgba(255,255,255,.6); max-width: 600px; line-height: 1.7;
    margin-bottom: 36px;
  }
  .lp-hero-cta { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 50px; }
  .lp-cta-main {
    background: linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%);
    color: #fff; font-weight: 800; font-size: 1.05rem;
    padding: 14px 32px; border-radius: 14px; border: none;
    cursor: pointer; transition: all .3s; font-family: inherit;
    box-shadow: 0 8px 30px rgba(59,130,246,.45);
    display: flex; align-items: center; gap: 8px;
  }
  .lp-cta-main:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 40px rgba(59,130,246,.6);
  }
  .lp-cta-outline {
    background: rgba(255,255,255,.06);
    color: #fff; font-weight: 700; font-size: 1.05rem;
    padding: 14px 32px; border-radius: 14px;
    border: 1px solid rgba(255,255,255,.2);
    cursor: pointer; transition: all .3s; font-family: inherit;
    display: flex; align-items: center; gap: 8px;
  }
  .lp-cta-outline:hover {
    background: rgba(255,255,255,.12);
    border-color: rgba(255,255,255,.4);
    transform: translateY(-3px);
  }

  /* Quick Contact Chips */
  .lp-contact-row {
    display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;
    margin-bottom: 60px;
  }
  .lp-contact-chip {
    display: flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 100px;
    font-size: .88rem; font-weight: 700;
    cursor: pointer; transition: all .25s;
    text-decoration: none; border: none; font-family: inherit;
  }
  .lp-contact-chip.wa {
    background: rgba(37,211,102,.12);
    border: 1px solid rgba(37,211,102,.25); color: #4ade80;
  }
  .lp-contact-chip.wa:hover { background: rgba(37,211,102,.25); transform: scale(1.05); }
  .lp-contact-chip.tg {
    background: rgba(0,136,204,.12);
    border: 1px solid rgba(0,136,204,.25); color: #67e8f9;
  }
  .lp-contact-chip.tg:hover { background: rgba(0,136,204,.25); transform: scale(1.05); }
  .lp-contact-chip.em {
    background: rgba(251,191,36,.12);
    border: 1px solid rgba(251,191,36,.25); color: #fcd34d;
  }
  .lp-contact-chip.em:hover { background: rgba(251,191,36,.25); transform: scale(1.05); }
  .lp-contact-chip.ph {
    background: rgba(167,139,250,.12);
    border: 1px solid rgba(167,139,250,.25); color: #c4b5fd;
  }
  .lp-contact-chip.ph:hover { background: rgba(167,139,250,.25); transform: scale(1.05); }

  /* Screenshot showcase */
  .lp-screens {
    position: relative; width: 100%; max-width: 980px; margin: 0 auto;
    padding: 0 20px 60px;
  }
  .lp-screen-main {
    width: 100%; border-radius: 16px; overflow: hidden;
    border: 1px solid rgba(255,255,255,.1);
    box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.05);
    animation: floatB 6s ease-in-out infinite;
    cursor: pointer; transition: transform .3s;
  }
  .lp-screen-main:hover { animation-play-state: paused; transform: scale(1.01); }
  .lp-screen-main img { width: 100%; display: block; }
  .lp-screen-thumbs {
    display: flex; gap: 12px; margin-top: 16px; justify-content: center;
  }
  .lp-screen-thumb {
    width: 120px; height: 70px; border-radius: 8px; overflow: hidden;
    border: 2px solid rgba(255,255,255,.1);
    cursor: pointer; transition: all .25s; flex-shrink: 0;
  }
  .lp-screen-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .lp-screen-thumb:hover, .lp-screen-thumb.active {
    border-color: #3B82F6;
    box-shadow: 0 0 20px rgba(59,130,246,.5);
    transform: scale(1.05);
  }

  /* ── Section common ── */
  .lp-section {
    padding: 90px 5%;
    position: relative;
  }
  .lp-section-dark  { background: #0F172A; }
  .lp-section-mid   { background: #111827; }
  .lp-section-label {
    display: inline-block;
    background: rgba(59,130,246,.15); border: 1px solid rgba(59,130,246,.3);
    color: #93c5fd; font-size: .78rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 5px 14px; border-radius: 100px;
    margin-bottom: 16px;
  }
  .lp-section-title {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900;
    color: #fff; margin-bottom: 16px; line-height: 1.2;
  }
  .lp-section-sub {
    font-size: 1.05rem; color: rgba(255,255,255,.5); max-width: 580px; line-height: 1.7;
  }
  .lp-section-center { text-align: center; }
  .lp-section-center .lp-section-sub { margin: 0 auto; }

  /* ── Pain / Solution ── */
  .lp-pain-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 32px; margin-top: 56px; align-items: start;
  }
  @media (max-width: 768px) { .lp-pain-grid { grid-template-columns: 1fr; } }
  .lp-pain-card {
    background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px; padding: 32px;
    transition: all .3s;
  }
  .lp-pain-card:hover { background: rgba(255,255,255,.06); transform: translateY(-4px); }
  .lp-pain-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 20px; }
  .lp-pain-card.problem h3 { color: #f87171; }
  .lp-pain-card.solution h3 { color: #34d399; }
  .lp-pain-item {
    display: flex; align-items: flex-start; gap: 12px;
    margin-bottom: 14px; padding: 12px; border-radius: 10px;
    background: rgba(255,255,255,.03);
  }
  .lp-pain-icon { font-size: 1.3rem; margin-top: 2px; flex-shrink: 0; }
  .lp-pain-text { color: rgba(255,255,255,.75); font-size: .95rem; line-height: 1.5; }

  /* ── Features ── */
  .lp-features-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px; margin-top: 56px;
  }
  .lp-feature-card {
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
    border-radius: 18px; padding: 28px;
    transition: all .35s; cursor: default; position: relative; overflow: hidden;
  }
  .lp-feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, #3B82F6, #06B6D4, transparent);
    opacity: 0; transition: opacity .3s;
  }
  .lp-feature-card:hover {
    background: rgba(59,130,246,.08); border-color: rgba(59,130,246,.3);
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(59,130,246,.15);
  }
  .lp-feature-card:hover::before { opacity: 1; }
  .lp-feature-icon {
    width: 54px; height: 54px; border-radius: 14px;
    background: rgba(59,130,246,.15); display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; margin-bottom: 16px;
    transition: all .3s;
  }
  .lp-feature-card:hover .lp-feature-icon {
    background: rgba(59,130,246,.25); transform: scale(1.1) rotate(-5deg);
  }
  .lp-feature-title { font-size: 1.05rem; font-weight: 800; color: #fff; margin-bottom: 8px; }
  .lp-feature-desc  { font-size: .9rem; color: rgba(255,255,255,.5); line-height: 1.6; }

  /* ── Why us ── */
  .lp-why-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px; margin-top: 48px;
  }
  .lp-why-item {
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
    border-radius: 16px; padding: 24px 20px; text-align: center;
    transition: all .3s;
  }
  .lp-why-item:hover {
    background: rgba(6,182,212,.08); border-color: rgba(6,182,212,.3);
    transform: translateY(-4px);
  }
  .lp-why-icon { font-size: 2rem; margin-bottom: 12px; }
  .lp-why-title { font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 6px; }
  .lp-why-desc  { font-size: .83rem; color: rgba(255,255,255,.45); }

  /* ── Stats ── */
  .lp-stats { background: linear-gradient(135deg, rgba(59,130,246,.12), rgba(6,182,212,.12)); }
  .lp-stats-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px; margin-top: 20px;
  }
  .lp-stat-card {
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
    border-radius: 18px; padding: 32px 20px; text-align: center;
    animation: glowPulse 4s ease-in-out infinite;
    transition: transform .3s;
  }
  .lp-stat-card:hover { transform: scale(1.05); }
  .lp-stat-num {
    font-size: 2.8rem; font-weight: 900; line-height: 1;
    background: linear-gradient(135deg, #3B82F6, #06B6D4);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 8px;
  }
  .lp-stat-label { font-size: .9rem; color: rgba(255,255,255,.55); font-weight: 600; }

  /* ── Testimonials ── */
  .lp-testimonials-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px; margin-top: 52px;
  }
  .lp-testimonial {
    background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.08);
    border-radius: 18px; padding: 28px;
    position: relative; transition: all .3s;
  }
  .lp-testimonial:hover {
    background: rgba(255,255,255,.07); transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,.3);
  }
  .lp-testimonial::before {
    content: '"'; position: absolute; top: 16px; right: 24px;
    font-size: 5rem; color: rgba(59,130,246,.15); font-family: serif; line-height: 1;
  }
  .lp-testimonial-text {
    color: rgba(255,255,255,.75); font-size: .95rem; line-height: 1.7;
    margin-bottom: 20px; font-style: italic;
  }
  .lp-testimonial-author { display: flex; align-items: center; gap: 12px; }
  .lp-testimonial-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, #3B82F6, #06B6D4);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; font-weight: 800; color: #fff; flex-shrink: 0;
  }
  .lp-testimonial-name { font-weight: 700; color: #fff; font-size: .95rem; }
  .lp-testimonial-role { font-size: .8rem; color: rgba(255,255,255,.4); }
  .lp-stars { color: #fbbf24; font-size: .9rem; margin-bottom: 4px; }

  /* ── Final CTA ── */
  .lp-final-cta {
    padding: 100px 5%;
    background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(59,130,246,.2) 0%, transparent 70%),
                linear-gradient(135deg, #0F172A, #111827);
    text-align: center;
    position: relative; overflow: hidden;
  }
  .lp-final-cta-title {
    font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 900; color: #fff;
    margin-bottom: 16px;
  }
  .lp-final-cta-sub {
    font-size: 1.05rem; color: rgba(255,255,255,.5); margin-bottom: 40px;
  }
  .lp-final-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  /* ── Footer ── */
  .lp-footer {
    background: #080e1a; border-top: 1px solid rgba(255,255,255,.07);
    padding: 50px 5% 30px;
  }
  .lp-footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px;
    margin-bottom: 40px;
  }
  @media (max-width: 768px) {
    .lp-footer-grid { grid-template-columns: 1fr; }
    .lp-nav-links .lp-nav-link { display: none; }
    .lp-pain-grid { grid-template-columns: 1fr; }
  }
  .lp-footer-brand { font-size: 1.2rem; font-weight: 900; color: #fff; margin-bottom: 12px; }
  .lp-footer-brand span { color: #06B6D4; }
  .lp-footer-desc { font-size: .88rem; color: rgba(255,255,255,.4); line-height: 1.6; max-width: 280px; }
  .lp-footer-title { font-size: .85rem; font-weight: 700; color: rgba(255,255,255,.6); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
  .lp-footer-link {
    display: flex; align-items: center; gap: 8px;
    color: rgba(255,255,255,.45); font-size: .88rem;
    text-decoration: none; padding: 5px 0;
    transition: color .2s; cursor: pointer;
    background: none; border: none; font-family: inherit; text-align: right;
    width: 100%;
  }
  .lp-footer-link:hover { color: #06B6D4; }
  .lp-footer-social { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
  .lp-social-btn {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
    cursor: pointer; transition: all .25s; font-size: 1.1rem; text-decoration: none;
  }
  .lp-social-btn:hover { background: rgba(59,130,246,.2); border-color: rgba(59,130,246,.4); transform: scale(1.1); }
  .lp-footer-bottom {
    border-top: 1px solid rgba(255,255,255,.06); padding-top: 24px;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
  }
  .lp-footer-copy { font-size: .82rem; color: rgba(255,255,255,.3); }

  /* Floating WhatsApp */
  .lp-float-wa {
    position: fixed; bottom: 28px; right: 28px; z-index: 999;
    width: 58px; height: 58px; border-radius: 50%;
    background: #25D366;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.6rem; cursor: pointer; text-decoration: none;
    box-shadow: 0 8px 25px rgba(37,211,102,.5);
    transition: all .3s;
    animation: glowPulse 3s ease-in-out infinite;
  }
  .lp-float-wa:hover { transform: scale(1.15); box-shadow: 0 12px 35px rgba(37,211,102,.7); }

  /* Responsive */
  @media (max-width: 640px) {
    .lp-hero-content { padding: 40px 5% 30px; }
    .lp-screen-thumbs { display: none; }
    .lp-stats-grid { grid-template-columns: 1fr 1fr; }
  }
`;

/* ─────────────────── Component ─────────────────── */
const Landing = () => {
  const { i18n } = useTranslation();
  const navigate  = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user            = useSelector((state) => state.auth.user);
  const [scrolled, setScrolled]       = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const heroRef = useRef(null);

  const isAr = Boolean(i18n.language && i18n.language.startsWith('ar'));

  // Redirect authenticated users
  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(user?.role?.toLowerCase() === 'cashier' ? '/pos' : '/dashboard', { replace: true });
  }, [isAuthenticated, navigate, user?.role]);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-rotate screenshots
  useEffect(() => {
    const t = setInterval(() => setActiveScreen(p => (p + 1) % screens.length), 4000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const screens = [
    { src: '/screenshots/screen1.png', label: isAr ? 'لوحة التحكم' : 'Dashboard' },
    { src: '/screenshots/screen2.png', label: isAr ? 'النظام الكامل' : 'Full System' },
    { src: '/screenshots/screen3.png', label: isAr ? 'المنتجات والمبيعات' : 'Products & Sales' },
  ];

  const features = [
    { icon: '🖥️', title: isAr ? 'نقطة البيع POS' : 'Point of Sale', desc: isAr ? 'بيع سريع بلمسة واحدة، فواتير فورية، وطباعة إيصالات حرارية.' : 'Fast 1-tap sales, instant invoices & thermal receipt printing.' },
    { icon: '📊', title: isAr ? 'تقارير وإحصائيات' : 'Reports & Analytics', desc: isAr ? 'رسوم بيانية فورية للمبيعات والأرباح اتخذ قراراتك بثقة.' : 'Real-time charts for sales & profit — make confident decisions.' },
    { icon: '👥', title: isAr ? 'إدارة العملاء' : 'Customer Management', desc: isAr ? 'احفظ بيانات عملائك وسجل طلباتهم التاريخية بسهولة.' : 'Store customer data & full order history effortlessly.' },
    { icon: '🛍️', title: isAr ? 'إدارة المنتجات' : 'Products Management', desc: isAr ? 'أضف وعدّل منتجاتك مع صور وباركود وتصنيفات.' : 'Add & edit products with images, barcodes & categories.' },
    { icon: '📦', title: isAr ? 'إدارة المخزون' : 'Inventory Control', desc: isAr ? 'تنبيهات تلقائية عند انخفاض المخزون قبل أن تنفد.' : 'Auto low-stock alerts before you run out.' },
    { icon: '🌐', title: isAr ? 'طلبات أونلاين' : 'Online Orders', desc: isAr ? 'استقبل الطلبات عبر QR Code أو رابط مباشر 24/7.' : 'Receive orders via QR Code or direct link 24/7.' },
    { icon: '🔔', title: isAr ? 'الإشعارات الفورية' : 'Real-time Notifications', desc: isAr ? 'تنبيهات لحظية لكل طلب جديد لا تفوّت أي طلب.' : 'Instant alerts for every new order — never miss one.' },
    { icon: '🔐', title: isAr ? 'صلاحيات متعددة' : 'Multi-Role Access', desc: isAr ? 'أدوار مخصصة للمدير والكاشير والموظف وفريق العمل.' : 'Custom roles for manager, cashier, staff & team.' },
    { icon: '📱', title: isAr ? 'يعمل على الهاتف' : 'Mobile Responsive', desc: isAr ? 'تحكم في نظامك من أي جهاز في أي وقت ومن أي مكان.' : 'Manage your system from any device, anywhere, anytime.' },
  ];

  const whyUs = [
    { icon: '⚡', title: isAr ? 'سرعة فائقة' : 'Lightning Fast', desc: isAr ? 'أداء عالٍ حتى في أوقات الذروة' : 'High performance even at peak hours' },
    { icon: '🔒', title: isAr ? 'أمان كامل' : 'Fully Secure', desc: isAr ? 'تشفير وحماية لكل بياناتك' : 'Encrypted & protected data' },
    { icon: '🎯', title: isAr ? 'سهل الاستخدام' : 'Easy to Use', desc: isAr ? 'واجهة بسيطة بدون تعقيد' : 'Simple interface, no complexity' },
    { icon: '📈', title: isAr ? 'تقارير متقدمة' : 'Advanced Reports', desc: isAr ? 'رؤية شاملة لأداء عملك' : 'Full visibility into your business' },
    { icon: '🛠️', title: isAr ? 'دعم فني 24/7' : 'Support 24/7', desc: isAr ? 'نحن معك في أي وقت' : 'We are here for you anytime' },
    { icon: '🔄', title: isAr ? 'تحديثات مستمرة' : 'Continuous Updates', desc: isAr ? 'ميزات جديدة بشكل دوري' : 'New features regularly' },
  ];

  const testimonials = [
    {
      text: isAr ? '"ساعدنا النظام في زيادة مبيعات المقهى بنسبة 40% خلال أول 3 أشهر. التقارير اليومية أصبحت جزءاً أساسياً من روتيننا."' : '"The system helped us increase café sales by 40% in the first 3 months. Daily reports became an essential part of our routine."',
      name: isAr ? 'أحمد الغامدي' : 'Ahmed Al-Ghamdi',
      role: isAr ? 'مالك كافيه سندس' : 'Owner, Café Sundus',
      avatar: 'أ',
      stars: 5,
    },
    {
      text: isAr ? '"واجهة سهلة جداً، موظفينا تعلموا النظام في يوم واحد. نظام POS يعمل بسرعة مذهلة حتى في أوقات الزحام."' : '"Very easy interface, our staff learned the system in one day. POS works amazingly fast even during rush hours."',
      name: isAr ? 'نورة العتيبي' : 'Noura Al-Otaibi',
      role: isAr ? 'مديرة مطعم الطازج' : 'Manager, Al-Tazaj Restaurant',
      avatar: 'ن',
      stars: 5,
    },
    {
      text: isAr ? '"الطلبات الأونلاين عبر QR غيّرت تجربة عملائنا بالكامل. الآن 60% من طلباتنا تأتي عبر الإنترنت."' : '"Online orders via QR completely changed our customer experience. Now 60% of our orders come online."',
      name: isAr ? 'خالد الدوسري' : 'Khaled Al-Dossari',
      role: isAr ? 'صاحب سلسلة مقاهي' : 'Café Chain Owner',
      avatar: 'خ',
      stars: 5,
    },
  ];

  const problems = [
    isAr ? 'فقدان السيطرة على المخزون والكميات' : 'Losing control over inventory & stock',
    isAr ? 'تأخر تلبية الطلبات في أوقات الذروة' : 'Slow order fulfillment during rush hours',
    isAr ? 'عدم معرفة الأرباح الحقيقية نهاية اليوم' : 'Not knowing real profits at end of day',
    isAr ? 'صعوبة متابعة العملاء وسجل طلباتهم' : 'Difficulty tracking customers & their orders',
  ];

  const solutions = [
    isAr ? 'تقارير لحظية وتنبيهات تلقائية للمخزون' : 'Real-time reports & auto inventory alerts',
    isAr ? 'POS سريع يُنجز الطلب في ثوانٍ معدودة' : 'Fast POS completing orders in seconds',
    isAr ? 'لوحة إحصائيات شاملة بأرقام دقيقة' : 'Full stats dashboard with accurate numbers',
    isAr ? 'ملفات كاملة لكل عميل مع تاريخ الطلبات' : 'Full customer profiles with order history',
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

      {/* ── Floating WhatsApp ── */}
      <a className="lp-float-wa" href="https://wa.me/256741490119" target="_blank" rel="noreferrer" title="WhatsApp">
        💬
      </a>

      {/* ════════════ NAVBAR ════════════ */}
      <nav className={`lp-nav${scrolled ? ' scrolled' : ''}`} style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div className="lp-nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ☕ <span>Café</span>System
        </div>
        <div className="lp-nav-links">
          <button className="lp-nav-link" onClick={() => scrollTo('features')}>{isAr ? 'المميزات' : 'Features'}</button>
          <button className="lp-nav-link" onClick={() => scrollTo('preview')}>{isAr ? 'معاينة' : 'Preview'}</button>
          <button className="lp-nav-link" onClick={() => scrollTo('testimonials')}>{isAr ? 'آراء العملاء' : 'Reviews'}</button>
          <button className="lp-nav-link" onClick={() => scrollTo('contact')}>{isAr ? 'تواصل معنا' : 'Contact'}</button>
          <LanguageSwitcher />
          <button className="lp-btn-primary" onClick={() => navigate('/auth/login')} style={{ marginRight: isAr ? 0 : 8, marginLeft: isAr ? 8 : 0 }}>
            {isAr ? 'تسجيل الدخول' : 'Login'}
          </button>
        </div>
      </nav>

      {/* ════════════ 1. HERO ════════════ */}
      <section className="lp-hero" ref={heroRef}>
        {/* Orbs */}
        <div className="lp-hero-orb" style={{ width: 600, height: 600, background: 'rgba(59,130,246,.15)', top: '-20%', left: '-15%', animationDelay: '0s' }} />
        <div className="lp-hero-orb" style={{ width: 500, height: 500, background: 'rgba(6,182,212,.1)', bottom: '-15%', right: '-10%', animationDelay: '2s' }} />
        <div className="lp-hero-orb" style={{ width: 300, height: 300, background: 'rgba(167,139,250,.1)', top: '30%', right: '5%', animationDelay: '4s' }} />

        <div className="lp-hero-content" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          {/* Badge */}
          <div className="lp-badge fade-in">
            <span className="lp-badge-dot" />
            {isAr ? 'نظام SaaS متكامل للمطاعم والمقاهي' : 'Complete SaaS for Restaurants & Cafés'}
          </div>

          {/* Title */}
          <h1 className="lp-hero-title fade-up delay-1">
            {isAr
              ? <><span className="gradient-text">أدر مقهاك أو مطعمك</span><br />ضاعف مبيعاتك وقلّل الهدر</>
              : <><span className="gradient-text">Manage Your Café or Restaurant</span><br />Boost Sales & Reduce Waste</>}
          </h1>

          {/* Subtitle */}
          <p className="lp-hero-subtitle fade-up delay-2">
            {isAr
              ? 'كل ما تحتاجه لإدارة الطلبات، العملاء، المخزون، والتقارير في شاشة واحدة — مصممة خصيصاً لسرعة الأداء في أوقات الذروة.'
              : 'Everything you need to manage orders, customers, inventory & reports in one screen — built for peak-hour performance.'}
          </p>

          {/* CTA Buttons */}
          <div className="lp-hero-cta fade-up delay-3">
            <a className="lp-cta-main" href="https://wa.me/256741490119" target="_blank" rel="noreferrer">
              💬 {isAr ? 'تواصل معنا الآن' : 'Contact Us Now'}
            </a>
            <button className="lp-cta-outline" onClick={() => scrollTo('preview')}>
              👁️ {isAr ? 'مشاهدة النظام' : 'See the System'}
            </button>
            <button className="lp-btn-secondary" onClick={() => navigate('/auth/login')}>
              🔑 {isAr ? 'دخول النظام' : 'Login'}
            </button>
          </div>

          {/* ── 2. QUICK CONTACT ── */}
          <div className="lp-contact-row fade-up delay-4">
            <a className="lp-contact-chip wa" href="https://wa.me/256741490119" target="_blank" rel="noreferrer">
              <span>💬</span> WhatsApp
            </a>
            <a className="lp-contact-chip tg" href="https://t.me/key4infotech" target="_blank" rel="noreferrer">
              <span>✈️</span> Telegram
            </a>
            <a className="lp-contact-chip em" href="mailto:info@key4infotech.com">
              <span>📧</span> {isAr ? 'البريد الإلكتروني' : 'Email'}
            </a>
            <a className="lp-contact-chip ph" href="tel:+256741490119">
              <span>📞</span> {isAr ? 'اتصل بنا' : 'Call Us'}
            </a>
          </div>

          {/* ── 3. SYSTEM PREVIEW (Screenshots) ── */}
          <div id="preview" className="lp-screens fade-up delay-5">
            <div className="lp-screen-main" onClick={() => setActiveScreen(p => (p + 1) % screens.length)}>
              <img
                src={screens[activeScreen].src}
                alt={screens[activeScreen].label}
                style={{ transition: 'opacity .4s ease' }}
              />
            </div>
            <div className="lp-screen-thumbs">
              {screens.map((s, i) => (
                <div
                  key={i}
                  className={`lp-screen-thumb${i === activeScreen ? ' active' : ''}`}
                  onClick={() => setActiveScreen(i)}
                  title={s.label}
                >
                  <img src={s.src} alt={s.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ PAIN & SOLUTION ════════════ */}
      <section className="lp-section lp-section-mid" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lp-section-center">
            <span className="lp-section-label">{isAr ? 'المشكلة والحل' : 'Problem & Solution'}</span>
            <h2 className="lp-section-title">
              {isAr ? 'هل تعاني من هذه المشاكل؟' : 'Are You Struggling With These?'}
            </h2>
          </div>
          <div className="lp-pain-grid">
            {/* Problems */}
            <div className="lp-pain-card problem">
              <h3>❌ {isAr ? 'المشاكل الشائعة' : 'Common Problems'}</h3>
              {problems.map((p, i) => (
                <div className="lp-pain-item" key={i}>
                  <span className="lp-pain-icon">😰</span>
                  <span className="lp-pain-text">{p}</span>
                </div>
              ))}
            </div>
            {/* Solutions */}
            <div className="lp-pain-card solution">
              <h3>✅ {isAr ? 'حلولنا الذكية' : 'Our Smart Solutions'}</h3>
              {solutions.map((s, i) => (
                <div className="lp-pain-item" key={i}>
                  <span className="lp-pain-icon">🚀</span>
                  <span className="lp-pain-text">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 4. FEATURES ════════════ */}
      <section id="features" className="lp-section lp-section-dark" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lp-section-center">
            <span className="lp-section-label">{isAr ? 'المميزات' : 'Features'}</span>
            <h2 className="lp-section-title">{isAr ? 'كل ما تحتاجه في مكان واحد' : 'Everything You Need In One Place'}</h2>
            <p className="lp-section-sub">{isAr ? 'ميزات متكاملة مصممة خصيصاً لبيئة المطاعم والمقاهي.' : 'Complete features designed specifically for the restaurant & café environment.'}</p>
          </div>
          <div className="lp-features-grid">
            {features.map((f, i) => (
              <div className="lp-feature-card" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="lp-feature-icon">{f.icon}</div>
                <div className="lp-feature-title">{f.title}</div>
                <div className="lp-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 5. WHY US ════════════ */}
      <section className="lp-section lp-section-mid" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lp-section-center">
            <span className="lp-section-label">{isAr ? 'لماذا نحن' : 'Why Choose Us'}</span>
            <h2 className="lp-section-title">{isAr ? 'لماذا تختارنا؟' : 'Why Choose Us?'}</h2>
            <p className="lp-section-sub">{isAr ? 'لأننا لا نبيع برنامجاً، نبني شراكة طويلة الأمد مع عملائنا.' : "Because we don't just sell software — we build a long-term partnership with our clients."}</p>
          </div>
          <div className="lp-why-grid">
            {whyUs.map((w, i) => (
              <div className="lp-why-item" key={i}>
                <div className="lp-why-icon">{w.icon}</div>
                <div className="lp-why-title">{w.title}</div>
                <div className="lp-why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 7. STATS ════════════ */}
      <section className="lp-section lp-stats" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lp-section-center" style={{ marginBottom: 40 }}>
            <span className="lp-section-label">{isAr ? 'أرقامنا' : 'Our Numbers'}</span>
            <h2 className="lp-section-title">{isAr ? 'أرقام تتحدث عن نفسها' : 'Numbers That Speak For Themselves'}</h2>
          </div>
          <div className="lp-stats-grid">
            {[
              { num: '+5,000', label: isAr ? 'طلب يومي' : 'Daily Orders' },
              { num: '+100', label: isAr ? 'عميل نشط' : 'Active Clients' },
              { num: '99.9%', label: isAr ? 'استقرار الخدمة' : 'Uptime' },
              { num: '24/7', label: isAr ? 'دعم فني متواصل' : 'Support' },
            ].map((s, i) => (
              <div className="lp-stat-card" key={i} style={{ animationDelay: `${i * 0.5}s` }}>
                <div className="lp-stat-num">{s.num}</div>
                <div className="lp-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 6. TESTIMONIALS ════════════ */}
      <section id="testimonials" className="lp-section lp-section-dark" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lp-section-center">
            <span className="lp-section-label">{isAr ? 'آراء العملاء' : 'Testimonials'}</span>
            <h2 className="lp-section-title">{isAr ? 'ماذا يقول عملاؤنا؟' : 'What Our Clients Say'}</h2>
          </div>
          <div className="lp-testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="lp-testimonial" key={i}>
                <div className="lp-stars">{'★'.repeat(t.stars)}</div>
                <p className="lp-testimonial-text">{t.text}</p>
                <div className="lp-testimonial-author">
                  <div className="lp-testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="lp-testimonial-name">{t.name}</div>
                    <div className="lp-testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 8. FINAL CTA ════════════ */}
      <section id="contact" className="lp-final-cta" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div className="lp-hero-orb" style={{ width: 500, height: 500, background: 'rgba(59,130,246,.15)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'none', opacity: 0.15 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="lp-section-label">{isAr ? 'ابدأ الآن' : 'Get Started'}</span>
          <h2 className="lp-final-cta-title">
            {isAr ? 'جاهز لتطوير مقهاك أو مطعمك؟' : 'Ready to Transform Your Business?'}
          </h2>
          <p className="lp-final-cta-sub">
            {isAr ? 'تواصل معنا الآن وسنساعدك في البدء خلال 24 ساعة.' : 'Contact us now and we will help you get started within 24 hours.'}
          </p>
          <div className="lp-final-btns">
            <a className="lp-cta-main" href="https://wa.me/256741490119" target="_blank" rel="noreferrer">
              💬 {isAr ? 'تواصل على واتساب' : 'WhatsApp Us'}
            </a>
            <button className="lp-cta-outline" onClick={() => navigate('/auth/login')}>
              🔑 {isAr ? 'دخول النظام' : 'Login to System'}
            </button>
          </div>

          {/* Demo accounts */}
          <div style={{ marginTop: 40, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,.4)', fontSize: '.85rem', alignSelf: 'center' }}>
              {isAr ? '⚡ جرّب النظام:' : '⚡ Try the demo:'}
            </span>
            {[
              { username: 'admin', password: 'admin123', label: isAr ? 'مدير' : 'Admin' },
              { username: 'team', password: 'admin', label: isAr ? 'فريق' : 'Team' },
            ].map((acc) => (
              <button
                key={acc.username}
                onClick={() => navigate(`/auth/login?u=${acc.username}&p=${acc.password}`)}
                style={{
                  background: 'rgba(59,130,246,.15)', border: '1px solid rgba(59,130,246,.3)',
                  color: '#93c5fd', padding: '8px 18px', borderRadius: 10,
                  cursor: 'pointer', fontSize: '.85rem', fontWeight: 700,
                  fontFamily: 'inherit', transition: 'all .2s',
                }}
                onMouseEnter={e => e.target.style.background = 'rgba(59,130,246,.3)'}
                onMouseLeave={e => e.target.style.background = 'rgba(59,130,246,.15)'}
              >
                {acc.label}: {acc.username}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ 9. FOOTER ════════════ */}
      <footer className="lp-footer" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="lp-footer-grid">
            {/* Brand */}
            <div>
              <div className="lp-footer-brand">☕ Café<span>System</span></div>
              <p className="lp-footer-desc">
                {isAr
                  ? 'نظام إدارة متكامل للمطاعم والمقاهي. من نقطة البيع إلى التقارير والطلبات الأونلاين.'
                  : 'Complete management system for restaurants & cafés. From POS to reports & online orders.'}
              </p>
              <div className="lp-footer-social">
                <a className="lp-social-btn" href="https://wa.me/256741490119" target="_blank" rel="noreferrer">💬</a>
                <a className="lp-social-btn" href="https://t.me/key4infotech" target="_blank" rel="noreferrer">✈️</a>
                <a className="lp-social-btn" href="https://www.key4infotech.com/frontend/index.php" target="_blank" rel="noreferrer">🌐</a>
                <a className="lp-social-btn" href="mailto:info@key4infotech.com">📧</a>
              </div>
            </div>
            {/* Quick links */}
            <div>
              <div className="lp-footer-title">{isAr ? 'روابط سريعة' : 'Quick Links'}</div>
              <button className="lp-footer-link" onClick={() => scrollTo('features')}>🔹 {isAr ? 'المميزات' : 'Features'}</button>
              <button className="lp-footer-link" onClick={() => scrollTo('preview')}>🔹 {isAr ? 'معاينة النظام' : 'System Preview'}</button>
              <button className="lp-footer-link" onClick={() => scrollTo('testimonials')}>🔹 {isAr ? 'آراء العملاء' : 'Reviews'}</button>
              <button className="lp-footer-link" onClick={() => navigate('/auth/login')}>🔹 {isAr ? 'تسجيل الدخول' : 'Login'}</button>
            </div>
            {/* Contact */}
            <div>
              <div className="lp-footer-title">{isAr ? 'تواصل معنا' : 'Contact Us'}</div>
              <a className="lp-footer-link" href="https://wa.me/256741490119" target="_blank" rel="noreferrer">💬 +256 741 490 119</a>
              <a className="lp-footer-link" href="https://t.me/key4infotech" target="_blank" rel="noreferrer">✈️ Telegram</a>
              <a className="lp-footer-link" href="mailto:info@key4infotech.com">📧 info@key4infotech.com</a>
              <a className="lp-footer-link" href="tel:+256741490119">📞 +256 741 490 119</a>
              <a className="lp-footer-link" href="https://www.key4infotech.com/frontend/index.php" target="_blank" rel="noreferrer">🌐 key4infotech.com</a>
            </div>
          </div>
          {/* Bottom */}
          <div className="lp-footer-bottom">
            <span className="lp-footer-copy">
              © {new Date().getFullYear()} CaféSystem — {isAr ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}
            </span>
            <span className="lp-footer-copy">
              {isAr ? 'مدعوم بواسطة' : 'Powered by'} <a href="https://www.key4infotech.com/frontend/index.php" target="_blank" rel="noreferrer" style={{ color: '#06B6D4', textDecoration: 'none' }}>K4 IT</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
