import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="hero-container container">

                {/* ── Content ── */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        Tapicero a domicilio · CDMX &amp; Edomex
                    </div>

                    <h1 className="hero-title">
                        Retapizados que <em>transforman</em> tu espacio
                    </h1>

                    <p className="hero-subtitle">
                        Renovamos tus muebles con materiales premium y un acabado artesanal
                        impecable. Recogemos y entregamos en la comodidad de tu hogar.
                    </p>

                    <div className="hero-ctas">
                        <Link to="/contacto" className="btn btn-primary">
                            Cotizar Gratis
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        <Link to="/galeria" className="btn btn-outline">
                            Ver Proyectos
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-number">120+</span>
                            <span className="hero-stat-label">Proyectos realizados</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">98%</span>
                            <span className="hero-stat-label">Clientes satisfechos</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">5+</span>
                            <span className="hero-stat-label">Años de experiencia</span>
                        </div>
                    </div>
                </div>

                {/* ── Visual ── */}
                <div className="hero-visual">
                    <div className="hero-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&auto=format&fit=crop&q=80"
                            alt="Sofá retapizado con terciopelo premium"
                            className="hero-image"
                            loading="eager"
                        />
                        <div className="hero-image-overlay" />
                    </div>

                    {/* Floating card */}
                    <div className="hero-floating-card">
                        <div className="hero-floating-icon">✦</div>
                        <div className="hero-floating-text">
                            <span className="hero-floating-title">Garantía de calidad</span>
                            <span className="hero-floating-sub">En cada proyecto</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll">
                <span className="hero-scroll-text">Scroll</span>
                <div className="hero-scroll-line" />
            </div>
        </section>
    )
}
