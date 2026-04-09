import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './ServicesBento.css'
import allServices from '../../data/servicesData'

/* Build bento items from shared data + one inline CTA card */
const services = [
    ...allServices.map((s) => ({
        id: s.slug,
        title: s.title,
        description: s.description,
        image: s.image,
        tag: s.tag,
        stats: s.bentoStats || null,
    })),
    {
        id: 'cta',
        type: 'cta',
        title: '¿Necesitas cotización?',
        description: 'Envíanos fotos de tu mueble y recibe un presupuesto en menos de 5 minutos.',
        tag: 'Gratis',
    },
]

export default function ServicesBento({ zona }) {
    const sectionRef = useRef(null)

    // Scroll-reveal with IntersectionObserver
    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                    }
                })
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        )

        // Observe header + all cards
        const header = section.querySelector('.services-header')
        const cards = section.querySelectorAll('.bento-card')

        if (header) observer.observe(header)
        cards.forEach((card) => observer.observe(card))

        return () => observer.disconnect()
    }, [])

    return (
        <section className="services" id="servicios" ref={sectionRef}>
            <div className="container">
                {/* Section Header */}
                <div className="services-header">
                    <div className="services-label">Nuestros Servicios</div>
                    <h2 className="services-title">
                        Todo tipo de tapizado,<br />un solo estándar de calidad
                    </h2>
                    <p className="services-subtitle">
                        Especialistas en tapizado de muebles con tela para tapizar de la más alta calidad.
                        Tapicero a domicilio en {zona || 'CDMX y Estado de México'}.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="bento-grid">
                    {services.map((service) => {
                        /* CTA card */
                        if (service.type === 'cta') {
                            return (
                                <div key={service.id} className="bento-card bento-card--cta">
                                    {/* Decorative rings */}
                                    <svg className="bento-cta-pattern" viewBox="0 0 200 200" fill="none">
                                        <circle cx="160" cy="160" r="120" stroke="white" strokeWidth="0.5" />
                                        <circle cx="160" cy="160" r="80" stroke="white" strokeWidth="0.5" />
                                        <circle cx="160" cy="160" r="40" stroke="white" strokeWidth="0.5" />
                                    </svg>

                                    <div className="bento-card-content">
                                        <div>
                                            <span className="bento-card-tag">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                                </svg>
                                                {service.tag}
                                            </span>
                                            <h3 className="bento-card-title" style={{ marginTop: '1rem' }}>
                                                {service.title}
                                            </h3>
                                            <p className="bento-card-desc" style={{ marginTop: '0.5rem' }}>
                                                {service.description}
                                            </p>
                                        </div>
                                        <div className="bento-cta-bottom">
                                            <Link to="/contacto" className="bento-cta-btn">
                                                Cotizar Ahora
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        /* Image service cards */
                        return (
                            <Link
                                key={service.id}
                                to={`/servicios/${service.id}`}
                                className="bento-card"
                            >
                                {/* Image */}
                                <div className="bento-card-image">
                                    <img
                                        src={service.image}
                                        alt={`${service.title} — tapizado de muebles en ${zona || 'CDMX'}`}
                                        loading="lazy"
                                    />
                                    <div className="bento-card-overlay" />
                                </div>

                                {/* Arrow */}
                                <div className="bento-card-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="7" y1="17" x2="17" y2="7" />
                                        <polyline points="7 7 17 7 17 17" />
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="bento-card-content">
                                    <span className="bento-card-tag">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                            <line x1="7" y1="7" x2="7.01" y2="7" />
                                        </svg>
                                        {service.tag}
                                    </span>
                                    <h3 className="bento-card-title">{service.title}</h3>
                                    {service.description && (
                                        <p className="bento-card-desc">{service.description}</p>
                                    )}
                                    {service.stats && (
                                        <div className="bento-card-stats">
                                            {service.stats.map((stat, i) => (
                                                <span key={stat.label}>
                                                    {i > 0 && <span className="bento-card-stat-divider" />}
                                                    <span className="bento-card-stat">
                                                        <strong>{stat.value}</strong> {stat.label}
                                                    </span>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
