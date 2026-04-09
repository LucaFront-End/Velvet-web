import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './HeroV3.css'

export default function HeroV3({ preTitle, subtitle }) {
    const heroRef = useRef(null)

    useEffect(() => {
        const el = heroRef.current
        if (!el) return
        const timer = setTimeout(() => el.classList.add('hero-v3--visible'), 50)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section className="hero-v3" ref={heroRef}>
            <div className="hero-v3__inner">

                {/* ── Background Title (Huge) ── */}
                <h1 className="hero-v3__bg-title">
                    <span className="hero-v3__pre-title">{preTitle || 'Tapicería'}</span>
                    VELVET
                </h1>

                {/* ── Main Visual (Stage) ── */}
                <div className="hero-v3__stage">
                    <img
                        src="/images/hero/velvet-hero-sofa.png"
                        alt="Sofá Chesterfield restaurado"
                        className="hero-v3__sofa"
                        draggable="false"
                    />
                </div>

                {/* ── Split Bottom Content ── */}
                <div className="hero-v3__bottom">

                    {/* Left Column: Description */}
                    <div className="hero-v3__bottom-left">
                        <p className="hero-v3__desc">
                            {subtitle || 'Nuestra misión es transformar muebles con historia. Tapicería artesanal, materiales nobles y diseño de autor para espacios únicos.'}
                        </p>
                    </div>

                    {/* Right Column: CTA */}
                    <div className="hero-v3__bottom-right">
                        <Link to="/contacto" className="hero-v3__cta-pill">
                            Cotizar Ahora
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M1 11L11 1M11 1H3M11 1V9" />
                            </svg>
                        </Link>
                    </div>

                </div>

            </div>

            {/* ── Marquee / Bottom Bar (Optional based on reference) ── */}
            {/* ── Marquee / Bottom Bar ── */}
            <div className="hero-v3__marquee">
                <div className="hero-v3__marquee-track">
                    {[...Array(2)].map((_, i) => (
                        <div className="hero-v3__marquee-content" key={i}>
                            <span>RESTAURACIÓN</span><span className="star">✦</span>
                            <span>TAPICERÍA</span><span className="star">✦</span>
                            <span>DISEÑO A MEDIDA</span><span className="star">✦</span>
                            <span>FABRICACIÓN</span><span className="star">✦</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}
