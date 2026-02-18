import { useEffect, useRef } from 'react'
import './Benefits.css'

const benefits = [
    {
        title: 'Garantía total',
        desc: 'Respaldamos cada proyecto con garantía de satisfacción. Si algo no queda perfecto, lo corregimos sin costo.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
    },
    {
        title: 'Telas premium',
        desc: 'Trabajamos con lino, terciopelo, piel sintética y más de 200 opciones importadas para cada estilo.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2 12 3.46 8 2 3.62 3.46a2 2 0 00-1.34 1.89v13.3a2 2 0 001.34 1.89L8 22l4-1.46L16 22l4.38-1.46a2 2 0 001.34-1.89V5.35a2 2 0 00-1.34-1.89z" />
                <line x1="12" y1="22" x2="12" y2="3.46" />
            </svg>
        ),
    },
    {
        title: 'Tapiceros expertos',
        desc: 'Más de 15 años de experiencia. Nuestros artesanos dominan técnicas tradicionales y modernas.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        title: 'Recolección gratis',
        desc: 'Pasamos a recoger y entregar tu mueble sin costo adicional en CDMX y zona metropolitana.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),
    },
    {
        title: 'Cotización express',
        desc: 'Envía fotos por WhatsApp y recibe un presupuesto detallado en menos de 5 minutos, sin compromiso.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        title: 'Antes y después',
        desc: 'Te mostramos resultados reales de nuestros proyectos para que veas la calidad antes de decidir.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        ),
    },
]

export default function Benefits() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return
        const timeouts = []

        /* Observe the header separately */
        const headerObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed')
                        headerObs.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.15 }
        )
        const header = section.querySelector('.benefits-header')
        if (header) headerObs.observe(header)

        /* Observe the grid — when it enters, stagger each card */
        const gridObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const cards = section.querySelectorAll('.benefit-card')
                        cards.forEach((card, i) => {
                            const t = setTimeout(() => {
                                card.classList.add('revealed')
                            }, i * 150)          /* 150ms between each card */
                            timeouts.push(t)
                        })
                        gridObs.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
        )
        const grid = section.querySelector('.benefits-grid')
        if (grid) gridObs.observe(grid)

        return () => {
            headerObs.disconnect()
            gridObs.disconnect()
            timeouts.forEach(clearTimeout)
        }
    }, [])

    return (
        <section className="benefits" id="beneficios" ref={sectionRef}>
            <div className="container">
                <div className="benefits-header">
                    <div className="benefits-label">Por qué elegirnos</div>
                    <h2 className="benefits-title">
                        Compromiso con la excelencia
                    </h2>
                </div>

                <div className="benefits-grid">
                    {benefits.map((b, i) => (
                        <div className="benefit-card" key={i}>
                            <div className="benefit-icon">{b.icon}</div>
                            <h3 className="benefit-card-title">{b.title}</h3>
                            <p className="benefit-card-desc">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
