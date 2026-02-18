import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './FAQ.css'

const faqs = [
    {
        q: '¿Cuánto cuesta retapizar un sillón?',
        a: 'El precio depende del tamaño del mueble y la tela elegida. Un sillón individual puede partir desde $2,500 MXN. Envíanos fotos y te cotizamos en 5 minutos sin compromiso.',
    },
    {
        q: '¿Qué tipos de tela para tapizar manejan?',
        a: 'Trabajamos con terciopelo, lino, chenille, piel sintética, vinipiel, loneta y telas importadas. Te asesoramos para elegir la mejor según tu uso y presupuesto.',
    },
    {
        q: '¿Recogen y entregan a domicilio?',
        a: 'Sí. Nuestro servicio de tapicero a domicilio cubre toda la Ciudad de México y principales municipios del Estado de México sin costo adicional por la recolección.',
    },
    {
        q: '¿Cuánto tiempo tarda el retapizado?',
        a: 'Depende de la complejidad. Un retapizado estándar tarda entre 3 y 7 días hábiles. Proyectos personalizados o con telas especiales pueden tomar hasta 10 días.',
    },
    {
        q: '¿Ofrecen garantía?',
        a: 'Sí, garantizamos cada trabajo. Si no estás satisfecho con el resultado, lo rehacemos sin costo. Tu confianza es nuestra prioridad.',
    },
    {
        q: '¿Hacen tapicería automotriz?',
        a: 'Sí, realizamos vestiduras de asientos, cielos, paneles de puertas y volantes con materiales de alta resistencia y acabado premium.',
    },
]

export default function FAQ() {
    const [active, setActive] = useState(0)
    const sectionRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('revealed')
                })
            },
            { threshold: 0.15 }
        )

        section.querySelectorAll('.faq-header, .faq-list').forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    return (
        <section className="faq" id="faq" ref={sectionRef}>
            <div className="container faq-container">
                <div className="faq-header">
                    <div className="faq-label">FAQ</div>
                    <h2 className="faq-title">Preguntas <em>frecuentes</em></h2>
                    <p className="faq-desc">
                        Resolvemos tus dudas sobre tapizado de muebles, telas, tiempos y costos.
                    </p>
                    <Link to="/contacto" className="btn btn-outline">
                        ¿Otra pregunta? Escríbenos
                    </Link>
                </div>

                <div className="faq-list">
                    {faqs.map((item, i) => (
                        <div
                            className={`faq-item${active === i ? ' active' : ''}`}
                            key={i}
                        >
                            <button
                                className="faq-question"
                                onClick={() => setActive(active === i ? -1 : i)}
                                aria-expanded={active === i}
                            >
                                {item.q}
                                <span className="faq-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </span>
                            </button>
                            <div className="faq-answer">
                                <div className="faq-answer-inner">{item.a}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
