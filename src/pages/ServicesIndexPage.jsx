import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import services from '../data/servicesData'
import SEO from '../components/SEO/SEO'
import './ServicesIndexPage.css'

/* ══════════════════════════════════════════════
   SERVICES INDEX — All services overview
   ══════════════════════════════════════════════ */

const processSteps = [
    { num: '01', title: 'Envía fotos', desc: 'Mándanos fotos de tu mueble por WhatsApp para cotizar al instante.' },
    { num: '02', title: 'Elige tela', desc: 'Accedé a +200 telas. Te llevamos muestras a domicilio sin costo.' },
    { num: '03', title: 'Retapizado', desc: 'Recogemos tu mueble. Nuestro equipo lo transforma en el taller.' },
    { num: '04', title: 'Entrega', desc: 'Lo devolvemos como nuevo. Garantía incluida en cada proyecto.' },
]

export default function ServicesIndexPage() {
    const pageRef = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
        const page = pageRef.current
        if (!page) return
        const timeouts = []
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                        const staggered = entry.target.querySelectorAll('.svi-stagger')
                        staggered.forEach((el, i) => {
                            const t = setTimeout(() => el.classList.add('revealed'), i * 90)
                            timeouts.push(t)
                        })
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
        )
        page.querySelectorAll('.svi-reveal').forEach((el) => observer.observe(el))
        return () => { observer.disconnect(); timeouts.forEach(clearTimeout) }
    }, [])

    return (
        <div className="services-index-page" ref={pageRef}>

            <SEO
                title="Servicios de Tapicería"
                path="/servicios"
                description="Conoce todos nuestros servicios de tapicería: salas, sillas, cabeceras y catálogo de telas. Recolección a domicilio en CDMX y Edomex."
            />

            {/* ═══ HERO ═══ */}
            <section className="svi-hero">
                <div className="container">
                    <div className="svi-hero-content svi-reveal">
                        <span className="svi-hero-label svi-stagger">Nuestros servicios</span>
                        <h1 className="svi-hero-title svi-stagger">
                            Todo lo que tu mueble <em>necesita</em>
                        </h1>
                        <p className="svi-hero-sub svi-stagger">
                            Tapicería residencial y fabricación a medida.
                            Cada servicio incluye recolección a domicilio, telas premium y garantía.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ SERVICE CARDS ═══ */}
            <section className="svi-grid-section">
                <div className="container">
                    <div className="svi-service-list">
                        {services.map((svc, i) => (
                            <Link
                                to={`/servicios/${svc.slug}`}
                                className={`svi-card svi-reveal ${i % 2 !== 0 ? 'svi-card--reversed' : ''}`}
                                key={svc.slug}
                            >
                                <div className="svi-card-img svi-stagger">
                                    <img src={svc.heroImage || svc.image} alt={svc.title} loading="lazy" />
                                    {svc.tag && <span className="svi-card-tag">{svc.tag}</span>}
                                </div>
                                <div className="svi-card-content svi-stagger">
                                    <span className="svi-card-num">{String(i + 1).padStart(2, '0')}</span>
                                    <h2 className="svi-card-title">{svc.title}</h2>
                                    <p className="svi-card-tagline">{svc.tagline}</p>
                                    <p className="svi-card-desc">{svc.description}</p>
                                    <ul className="svi-card-features">
                                        {svc.features.slice(0, 3).map((f, j) => (
                                            <li key={j}>{f}</li>
                                        ))}
                                    </ul>
                                    <div className="svi-card-stats">
                                        <div className="svi-stat">
                                            <span className="svi-stat-value">{svc.stats.projects}</span>
                                            <span className="svi-stat-label">Proyectos</span>
                                        </div>
                                        <div className="svi-stat">
                                            <span className="svi-stat-value">{svc.stats.satisfaction}</span>
                                            <span className="svi-stat-label">Satisfacción</span>
                                        </div>
                                        <div className="svi-stat">
                                            <span className="svi-stat-value">{svc.stats.avgTime}</span>
                                            <span className="svi-stat-label">Tiempo prom.</span>
                                        </div>
                                    </div>
                                    <span className="svi-card-link">
                                        Ver servicio
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PROCESS ═══ */}
            <section className="svi-process">
                <div className="container">
                    <div className="svi-process-header svi-reveal">
                        <span className="svi-process-label svi-stagger">¿Cómo funciona?</span>
                        <h2 className="svi-process-title svi-stagger">
                            4 pasos, <em>cero complicaciones</em>
                        </h2>
                    </div>
                    <div className="svi-process-grid svi-reveal">
                        {processSteps.map((step, i) => (
                            <div className="svi-step svi-stagger" key={i}>
                                <span className="svi-step-num">{step.num}</span>
                                <h3 className="svi-step-title">{step.title}</h3>
                                <p className="svi-step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section className="svi-cta">
                <div className="container">
                    <div className="svi-cta-inner svi-reveal">
                        <div className="svi-cta-text">
                            <h2 className="svi-cta-title svi-stagger">
                                ¿No sabés cuál servicio necesitás? <em>Nosotros te ayudamos</em>
                            </h2>
                            <p className="svi-cta-desc svi-stagger">
                                Envíanos fotos de tu mueble y te decimos exactamente qué necesita y cuánto cuesta.
                            </p>
                        </div>
                        <div className="svi-cta-actions svi-stagger">
                            <a
                                href="https://wa.me/5215568578613?text=Hola%2C%20quiero%20cotizar%20un%20servicio"
                                className="svi-cta-wa"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Cotizar ahora
                            </a>
                            <Link to="/contacto" className="btn btn-outline">
                                Formulario de contacto
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
