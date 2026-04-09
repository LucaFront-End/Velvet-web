import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO/SEO'
import './AboutPage.css'

/* ══════════════════════════════════════════════
   ABOUT PAGE — Unique scroll-driven narrative
   ══════════════════════════════════════════════ */

const timeline = [
    {
        year: '2016',
        title: 'El primer taller',
        text: 'Abrimos un pequeño espacio en la Ciudad de México con más pasión que herramientas. Los primeros clientes llegaron por recomendación de amigos y familia.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    },
    {
        year: '2019',
        title: 'Servicio a domicilio',
        text: 'Incorporamos recolección y entrega gratuita. El servicio creció un 300% el primer año cubriendo CDMX y Estado de México.',
        image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80',
    },
    {
        year: '2022',
        title: 'Catálogo premium',
        text: 'Ampliamos a más de 200 telas nacionales e importadas: lino, terciopelo, piel sintética y opciones Pet Friendly.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    },
    {
        year: '2025',
        title: 'Referente en CDMX',
        text: 'Más de 200 proyectos completados con 99% de satisfacción. Somos el tapicero de confianza de cientos de familias.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    },
]

const specialties = [
    { title: 'Salas y sillones', desc: 'Retapizado completo con estructura reforzada y espuma de alta densidad.', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80' },
    { title: 'Sillas de comedor', desc: 'Renovación de asiento y respaldo con telas resistentes al uso diario.', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=500&q=80' },
    { title: 'Cabeceras', desc: 'Diseños capitonados, lisos o con marcos de madera a medida.', img: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=500&q=80' },
]

export default function AboutPage() {
    const pageRef = useRef(null)
    const timelineRef = useRef(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    /* ─── Scroll-reveal ───────────────── */
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
                        const kids = entry.target.querySelectorAll('.ab-stagger')
                        kids.forEach((el, i) => {
                            const t = setTimeout(() => el.classList.add('revealed'), i * 120)
                            timeouts.push(t)
                        })
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        )

        page.querySelectorAll('.ab-reveal').forEach((el) => observer.observe(el))
        return () => { observer.disconnect(); timeouts.forEach(clearTimeout) }
    }, [])

    /* ─── Timeline scroll progress ────── */
    useEffect(() => {
        const tl = timelineRef.current
        if (!tl) return

        const handleScroll = () => {
            const rect = tl.getBoundingClientRect()
            const windowH = window.innerHeight
            const totalH = tl.offsetHeight

            if (rect.top > windowH) { setScrollProgress(0); return }
            if (rect.bottom < 0) { setScrollProgress(1); return }

            const scrolled = windowH - rect.top
            const progress = Math.min(Math.max(scrolled / (totalH + windowH * 0.3), 0), 1)
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /* ─── Counter animation ───────────── */
    const numbersRef = useRef(null)
    useEffect(() => {
        const el = numbersRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('[data-count]').forEach((node) => {
                        const target = parseInt(node.dataset.count)
                        const suffix = node.dataset.suffix || ''
                        let start = 0
                        const duration = 2000
                        const step = (ts) => {
                            if (!start) start = ts
                            const p = Math.min((ts - start) / duration, 1)
                            const eased = 1 - Math.pow(1 - p, 4)
                            node.textContent = Math.floor(eased * target) + suffix
                            if (p < 1) requestAnimationFrame(step)
                        }
                        requestAnimationFrame(step)
                    })
                    observer.unobserve(el)
                }
            },
            { threshold: 0.3 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="about-page" ref={pageRef}>

            <SEO
                rawTitle="Velvet Tapicería en CDMX | Expertos en Tapicería de Muebles"
                path="/nosotros"
                description="En Velvet Tapicería contamos con tapiceros expertos y asesoría de diseñador de interiores para elegir la mejor tela para tapizar sillones, salas y sillas."
            />

            {/* ═══ 1. HERO — Centered statement ═══ */}
            <section className="ab-hero">
                <div className="container">
                    <div className="ab-hero-inner ab-reveal">
                        <div className="ab-hero-badge ab-stagger">
                            <span className="ab-badge-dot" />
                            Desde 2016 · Taller en CDMX
                        </div>
                        <h1 className="ab-hero-title ab-stagger">
                            No restauramos muebles,{' '}
                            <em>rescatamos historias</em>
                        </h1>
                        <p className="ab-hero-sub ab-stagger">
                            Somos un taller familiar de tapicería artesanal con más de 8 años
                            transformando muebles y espacios en la Ciudad de México.
                        </p>
                        <div className="ab-hero-scroll-hint ab-stagger">
                            <span>Descubre nuestra historia</span>
                            <div className="ab-scroll-line" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 2. PHILOSOPHY — Big editorial quote ═══ */}
            <section className="ab-philosophy">
                <div className="container">
                    <div className="ab-phil-grid ab-reveal">
                        <div className="ab-phil-quote ab-stagger">
                            <svg className="ab-phil-mark" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                            </svg>
                            <blockquote>
                                Cada mueble tiene una historia. Nuestra misión es asegurarnos
                                de que siga contándose — con la misma belleza del primer día.
                            </blockquote>
                        </div>
                        <div className="ab-phil-details ab-stagger">
                            <p>
                                En Velvet Tapicería creemos que renovar un mueble no es solo un
                                trabajo de tapicería — es un acto de cuidado. Detrás de cada sofá
                                desgastado hay recuerdos, momentos y vínculos que merecen seguir vivos.
                            </p>
                            <p>
                                Por eso tratamos cada pieza como si fuera nuestra. Con las mejores telas,
                                las técnicas correctas y la atención al detalle que solo un taller familiar
                                puede ofrecer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 3. SCROLL TIMELINE — Animated on scroll ═══ */}
            <section className="ab-timeline" ref={timelineRef}>
                <div className="container">
                    <div className="ab-tl-header ab-reveal">
                        <div className="ab-tl-label ab-stagger">Nuestra historia</div>
                        <h2 className="ab-tl-title ab-stagger">
                            El camino hasta <em>hoy</em>
                        </h2>
                    </div>

                    <div className="ab-tl-track">
                        {/* Progress line */}
                        <div className="ab-tl-line">
                            <div
                                className="ab-tl-line-fill"
                                style={{ height: `${scrollProgress * 100}%` }}
                            />
                        </div>

                        {/* Timeline items */}
                        {timeline.map((item, i) => (
                            <div className={`ab-tl-item ab-reveal ${i % 2 === 0 ? '' : 'ab-tl-item--right'}`} key={item.year}>
                                {/* Dot on the line */}
                                <div className={`ab-tl-dot ${scrollProgress > (i / timeline.length) + 0.05 ? 'ab-tl-dot--active' : ''}`} />

                                <div className="ab-tl-card ab-stagger">
                                    <div className="ab-tl-card-img">
                                        <img src={item.image} alt={item.title} loading="lazy" />
                                    </div>
                                    <div className="ab-tl-card-body">
                                        <span className="ab-tl-year">{item.year}</span>
                                        <h3 className="ab-tl-card-title">{item.title}</h3>
                                        <p className="ab-tl-card-text">{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 4. IMPACT NUMBERS — Inline counter strip ═══ */}
            <section className="ab-impact" ref={numbersRef}>
                <div className="container">
                    <div className="ab-impact-strip ab-reveal">
                        <div className="ab-impact-num ab-stagger">
                            <span className="ab-impact-val" data-count="200" data-suffix="+">0</span>
                            <span className="ab-impact-lbl">Muebles renovados</span>
                        </div>
                        <div className="ab-impact-divider" />
                        <div className="ab-impact-num ab-stagger">
                            <span className="ab-impact-val" data-count="200" data-suffix="+">0</span>
                            <span className="ab-impact-lbl">Telas en catálogo</span>
                        </div>
                        <div className="ab-impact-divider" />
                        <div className="ab-impact-num ab-stagger">
                            <span className="ab-impact-val" data-count="99" data-suffix="%">0</span>
                            <span className="ab-impact-lbl">Satisfacción</span>
                        </div>
                        <div className="ab-impact-divider" />
                        <div className="ab-impact-num ab-stagger">
                            <span className="ab-impact-val" data-count="8" data-suffix=" años">0</span>
                            <span className="ab-impact-lbl">De experiencia</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 5. SPECIALTIES — Hover-reveal image cards ═══ */}
            <section className="ab-specialties">
                <div className="container">
                    <div className="ab-spec-header ab-reveal">
                        <h2 className="ab-spec-title ab-stagger">Lo que mejor hacemos</h2>
                        <p className="ab-spec-sub ab-stagger">
                            Cada especialidad tiene sus propios materiales, técnicas y acabados.
                            Dominamos cada una de ellas.
                        </p>
                    </div>

                    <div className="ab-spec-grid ab-reveal">
                        {specialties.map((s, i) => (
                            <div className="ab-spec-card ab-stagger" key={i}>
                                <div className="ab-spec-card-img">
                                    <img src={s.img} alt={s.title} loading="lazy" />
                                </div>
                                <div className="ab-spec-card-overlay" />
                                <div className="ab-spec-card-content">
                                    <span className="ab-spec-card-num">{String(i + 1).padStart(2, '0')}</span>
                                    <h3 className="ab-spec-card-title">{s.title}</h3>
                                    <p className="ab-spec-card-desc">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 6. WORKSHOP — Full-bleed immersive ═══ */}
            <section className="ab-workshop">
                <div className="ab-workshop-bg">
                    <img
                        src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1400&q=80"
                        alt="Interior del taller Velvet"
                        loading="lazy"
                    />
                </div>
                <div className="container">
                    <div className="ab-workshop-content ab-reveal">
                        <div className="ab-workshop-label ab-stagger">Nuestro taller</div>
                        <h2 className="ab-workshop-title ab-stagger">
                            Donde la magia <em>sucede</em>
                        </h2>
                        <div className="ab-workshop-info ab-stagger">
                            <div className="ab-workshop-detail">
                                <span className="ab-workshop-detail-label">Ubicación</span>
                                <span className="ab-workshop-detail-value">Ciudad de México</span>
                            </div>
                            <div className="ab-workshop-detail">
                                <span className="ab-workshop-detail-label">Cobertura</span>
                                <span className="ab-workshop-detail-value">CDMX y Edomex</span>
                            </div>
                            <div className="ab-workshop-detail">
                                <span className="ab-workshop-detail-label">Horario</span>
                                <span className="ab-workshop-detail-value">Lunes a Sábado 9–18h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 7. CTA ═══ */}
            <section className="ab-cta">
                <div className="container">
                    <div className="ab-cta-content ab-reveal">
                        <h2 className="ab-cta-title ab-stagger">
                            ¿Listo para renovar <em>tus muebles</em>?
                        </h2>
                        <p className="ab-cta-desc ab-stagger">
                            Envíanos fotos por WhatsApp y recibe tu presupuesto detallado
                            en menos de 5 minutos, sin compromiso.
                        </p>
                        <div className="ab-cta-actions ab-stagger">
                            <a
                                href="https://wa.me/5215568578613?text=SW-%20Hola%2C%20me%20interesa%20cotizar%20un%20trabajo%20de%20tapicería"
                                className="ab-cta-whatsapp"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp directo
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
