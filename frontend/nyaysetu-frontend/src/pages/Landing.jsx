// CHANGED: Added useTheme to switch the hero image between light/dark variants
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { UserPlus, FileText, Zap, ArrowRight, Users, Star, CheckCircle, Smartphone, Bot, BookOpen, Video, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import AIChatbot from '../components/landing/AIChatbot';
import AchievementsSection from '../components/landing/AchievementsSection';
import HowItWorks from '../components/landing/HowItWorks';
import TrustIndicators from '../components/landing/TrustIndicators';

// CHANGED: Removed ISO Certified — only meaningful trust stats kept
const TRUST_STATS = [
    { value: '50K+', label: 'Active Users',  icon: Users },
    { value: '99%',  label: 'Success Rate',  icon: Star },
    { value: '24/7', label: 'Availability',  icon: CheckCircle },
];

// CHANGED: Three glassmorphic quick-action cards below the hero replace the old stats strip
const QUICK_CARDS = [
    {
        icon: UserPlus,
        title: 'Create Account',
        desc: 'Create your account and activate your access in seconds — no paperwork required.',
        color: '#7C5CFF',
        bg: 'rgba(124,92,255,0.08)',
    },
    {
        icon: FileText,
        title: 'Submit Your Case',
        desc: 'Submit your cases from anywhere with secure document management.',
        color: '#3F5DCC',
        bg: 'rgba(63,93,204,0.08)',
    },
    {
        icon: Zap,
        title: 'Powerful Features',
        desc: 'Access AI-powered legal tech with real-time tracking and transparency.',
        color: '#10B981',
        bg: 'rgba(16,185,129,0.08)',
    },
];

export default function Landing() {
    const { t } = useTranslation(['landing', 'common']);
    // CHANGED: Pull current theme to conditionally render light/dark hero image
    const { theme } = useTheme();
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => { e.preventDefault(); setDeferredPrompt(e); window.deferredPrompt = e; };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (import.meta.env.DEV) { alert('PWA install works on port 4174 (preview), not dev.'); return; }
        const ev = window.deferredPrompt || deferredPrompt;
        if (ev) { await ev.prompt(); window.deferredPrompt = null; setDeferredPrompt(null); }
        else alert('Already installed, or use browser menu.');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', position: 'relative' }}>
            <Header />
            <AIChatbot />

            <main>
                {/* ── Hero ──────────────────────────────────────────── */}
                <section style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '9rem 2rem 4rem',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Geometric background pattern */}
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                        backgroundImage: `
                            linear-gradient(rgba(124,92,255,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(124,92,255,0.04) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }} />
                    {/* Top-right gradient blob */}
                    <div style={{
                        position: 'absolute', top: '-80px', right: '-80px',
                        width: '500px', height: '500px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124,92,255,0.10) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    {/* Bottom-left blob */}
                    <div style={{
                        position: 'absolute', bottom: '0', left: '-100px',
                        width: '400px', height: '400px', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(63,93,204,0.07) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    {/* Two-column layout */}
                    <div style={{
                        maxWidth: '1320px', margin: '0 auto', width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '4rem',
                        alignItems: 'center',
                        position: 'relative', zIndex: 1,
                    }} className="hero-grid">
                        {/* Left — text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                        >
                            <h1 style={{
                                fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
                                fontWeight: '900',
                                color: 'var(--text-main)',
                                lineHeight: '1.1',
                                letterSpacing: '-0.04em',
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '0.5rem',
                            }}>
                                AI-Powered<br />Digital Justice
                            </h1>
                            <h1 style={{
                                fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
                                fontWeight: '900',
                                lineHeight: '1.1',
                                letterSpacing: '-0.04em',
                                fontFamily: 'var(--font-heading)',
                                marginBottom: '1.75rem',
                                background: 'linear-gradient(135deg, #7C5CFF 0%, #3F5DCC 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                for Every Citizen
                            </h1>

                            <p style={{
                                fontSize: '1.1rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.75',
                                marginBottom: '2.5rem',
                                maxWidth: '480px',
                            }}>
                                Access justice from anywhere, anytime. File cases, track progress, attend virtual hearings, and get AI-powered legal assistance—all on a single transparent platform.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                                <Link to="/signup" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.9rem 2rem',
                                    background: 'var(--color-primary)',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    boxShadow: '0 4px 20px rgba(63,93,204,0.25)',
                                    transition: 'all 0.2s ease',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(63,93,204,0.35)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(63,93,204,0.25)'; }}
                                >
                                    Get Started Free <ArrowRight size={18} />
                                </Link>

                                <motion.button
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleInstall}
                                    title="Install App"
                                    style={{
                                        width: '48px', height: '48px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-medium)',
                                        background: 'var(--bg-surface)',
                                        color: 'var(--text-secondary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: 'var(--shadow-sm)',
                                    }}
                                >
                                    <Smartphone size={20} />
                                </motion.button>
                            </div>

                            {/* Trust stats */}
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                {TRUST_STATS.map((s, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        <s.icon size={15} style={{ color: 'var(--color-accent)' }} />
                                        <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>{s.value}</span>
                                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{s.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — scales image blended into the page background */}
                        <motion.div
                            initial={{ opacity: 0, x: 30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                        >
                            {/* purple glow blob behind the image */}
                            <div style={{
                                position: 'absolute',
                                width: '420px', height: '420px', borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(124,92,255,0.13) 0%, transparent 70%)',
                                filter: 'blur(40px)',
                                zIndex: 0,
                            }} />
                            {/*
                             * Mask-based blend: the wrapper clips the image with a radial
                             * gradient mask so edges fade to transparent, blending into --bg-main.
                             * No mix-blend-mode needed — works cleanly in both themes.
                             */}
                            <div className="hero-img-wrap">
                                <motion.img
                                    src={theme === 'dark' ? '/scales-dark.png' : '/scales-light.png'}
                                    alt="Scales of Justice"
                                    className="hero-img"
                                    animate={{ y: [0, -14, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{
                                        width: '100%',
                                        maxWidth: '480px',
                                        height: 'auto',
                                        display: 'block',
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Quick cards strip ─────────────────────────── */}
                    <div style={{
                        maxWidth: '1320px', margin: '4rem auto 0',
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1.25rem',
                        position: 'relative', zIndex: 1,
                    }} className="quick-cards-grid">
                        {QUICK_CARDS.map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                whileHover={{ y: -5 }}
                                style={{
                                    background: 'var(--bg-glass-strong)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '20px',
                                    padding: '1.75rem',
                                    boxShadow: 'var(--shadow-glass)',
                                    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = card.color + '50';
                                    e.currentTarget.style.boxShadow = `0 10px 28px ${card.color}18`;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'var(--border-light)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                                }}
                            >
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '12px',
                                    background: card.bg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '1rem',
                                }}>
                                    <card.icon size={22} style={{ color: card.color }} />
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                                    {card.title}
                                </h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                                    {card.desc}
                                </p>
                                <Link to="/signup" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                                    color: card.color,
                                    fontSize: '0.875rem', fontWeight: '700',
                                    textDecoration: 'none',
                                    transition: 'gap 0.2s ease',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.gap = '0.6rem'}
                                    onMouseLeave={e => e.currentTarget.style.gap = '0.35rem'}
                                >
                                    Get Started <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── How It Works ──────────────────────────────────── */}
                <HowItWorks />

                {/* ── Features ──────────────────────────────────────── */}
                <section id="features" style={{
                    padding: '7rem 2rem',
                    background: 'var(--bg-surface)',
                    borderTop: '1px solid var(--border-light)',
                    borderBottom: '1px solid var(--border-light)',
                }}>
                    <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <div style={{
                                display: 'inline-block', padding: '0.4rem 1rem', marginBottom: '1rem',
                                background: 'rgba(63,93,204,0.08)', border: '1px solid rgba(63,93,204,0.15)',
                                borderRadius: '2rem',
                            }}>
                                <span style={{ color: 'var(--color-accent)', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                                    Platform Features
                                </span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                                Powerful Features for{' '}
                                <span style={{ color: 'var(--color-secondary)' }}>Modern Justice</span>
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
                                Everything you need to navigate the legal system efficiently
                            </p>
                        </div>

                        <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                            {[
                                { icon: Bot, title: 'AI Legal Assistant', desc: '24/7 AI-powered chatbot for instant legal guidance', color: '#3F5DCC' },
                                { icon: BookOpen, title: 'Constitution Reader', desc: 'Browse Indian Constitution with intelligent search and Q&A', color: '#7C5CFF' },
                                { icon: FileText, title: 'File Cases Online', desc: 'Submit legal cases digitally with secure document management', color: '#10B981' },
                                { icon: Video, title: 'Virtual Hearings', desc: 'Attend court proceedings remotely with video conferencing', color: '#F59E0B' },
                                { icon: ShieldCheck, title: 'Secure & Private', desc: 'Bank-grade encryption ensures your data stays protected', color: '#EF4444' },
                                { icon: Zap, title: 'Real-time Updates', desc: 'Get instant notifications on case progress and hearings', color: '#8B5CF6' },
                            ].map((f, i) => {
                                const FeatureIcon = f.icon;
                                return (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    whileHover={{ y: -5 }}
                                    style={{
                                        padding: '2.25rem',
                                        background: 'var(--bg-main)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: '16px',
                                        cursor: 'default',
                                        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = f.color + '50'; e.currentTarget.style.boxShadow = `0 8px 24px ${f.color}15`; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{
                                        width: '52px', height: '52px', borderRadius: '14px',
                                        background: f.color + '12',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        marginBottom: '1.1rem',
                                    }}>
                                        <FeatureIcon size={26} style={{ color: f.color }} />
                                    </div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.65rem' }}>{f.title}</h3>
                                    <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>{f.desc}</p>
                                </motion.div>
                            );})}
                        </div>
                    </div>
                </section>

                <TrustIndicators />
                <AchievementsSection />

                {/* ── Final CTA ─────────────────────────────────────── */}
                <section style={{ padding: '7rem 2rem', background: 'var(--bg-main)' }}>
                    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                padding: '4.5rem 3rem',
                                textAlign: 'center',
                                borderRadius: '24px',
                                background: 'var(--bg-surface)',
                                border: '1px solid var(--border-light)',
                                boxShadow: 'var(--shadow-glass)',
                            }}
                        >
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.4rem 1rem', marginBottom: '1.5rem',
                                background: 'rgba(63,93,204,0.08)', border: '1px solid rgba(63,93,204,0.15)',
                                borderRadius: '2rem',
                            }}>
                                <span style={{ color: 'var(--color-accent)', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                                    Get Started Today
                                </span>
                            </div>
                            <h2 style={{ fontSize: 'clamp(1.75rem,3.5vw,2.5rem)', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                                Ready to Start Your Journey to Justice?
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', maxWidth: '560px', margin: '0 auto 0.75rem', lineHeight: '1.7' }}>
                                Join thousands of citizens already using NyaySetu for their legal needs
                            </p>
                            <p style={{
                                fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '2rem',
                                padding: '0.4rem 0.9rem', display: 'inline-block',
                                background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '6px',
                            }}>
                                AI outputs are for guidance only and do not constitute legal advice.
                            </p>
                            <div style={{ display: 'block' }}>
                                <Link to="/signup" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.9rem 2.5rem',
                                    background: 'var(--color-primary)', color: '#fff',
                                    textDecoration: 'none', borderRadius: '12px',
                                    fontWeight: '700', fontSize: '1rem',
                                    boxShadow: '0 4px 20px rgba(63,93,204,0.25)',
                                    transition: 'all 0.2s ease',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    Create Free Account <ArrowRight size={18} />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* responsive grid + hero image blend rules */}
            <style>{`
                /*
                 * .hero-img-wrap uses a radial CSS mask so the image edges fade
                 * to transparent, making the image "melt" into the page bg in
                 * both light (#F7F8FA) and dark (#0F1117) themes cleanly.
                 * The mask is an ellipse that is opaque in the centre and
                 * transparent at the edges — no mix-blend-mode colour cast.
                 */
                .hero-img-wrap {
                    position: relative;
                    z-index: 1;
                    /* Elliptical vignette: fully visible center, transparent rim */
                    -webkit-mask-image: radial-gradient(
                        ellipse 80% 80% at 50% 50%,
                        black 45%,
                        transparent 100%
                    );
                    mask-image: radial-gradient(
                        ellipse 80% 80% at 50% 50%,
                        black 45%,
                        transparent 100%
                    );
                }

                /* Drop any stray border-radius on the img itself */
                .hero-img {
                    border-radius: 0;
                }

                @media (max-width: 900px) {
                    .hero-grid { grid-template-columns: 1fr !important; }
                    .hero-grid > div:last-child { display: none; }
                    .quick-cards-grid { grid-template-columns: 1fr !important; }
                    .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .quick-cards-grid { grid-template-columns: 1fr !important; }
                    .features-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
