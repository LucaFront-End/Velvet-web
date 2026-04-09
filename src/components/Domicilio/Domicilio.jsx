import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Domicilio.css'

const steps = [
    { num: '01', title: 'Envía fotos', desc: 'Por WhatsApp o formulario — mándanos fotos de tu mueble.' },
    { num: '02', title: 'Cotización', desc: 'Presupuesto detallado con opciones de tela en menos de 5 minutos.' },
    { num: '03', title: 'Recolección', desc: 'Pasamos a recoger tu mueble a domicilio, sin costo extra.' },
    { num: '04', title: 'Entrega', desc: 'Tu mueble renovado de vuelta en tu casa, con garantía.' },
]

export default function Domicilio({ whatsappUrl, zona }) {
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
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        )

        section.querySelectorAll('.domicilio-top, .domicilio-steps, .domicilio-bottom').forEach((el) =>
            observer.observe(el)
        )

        return () => observer.disconnect()
    }, [])

    const defaultWaUrl = 'https://wa.me/5215568578613?text=SW-%20Hola%2C%20quiero%20agendar%20una%20recolección'

    return (
        <section className="domicilio" id="domicilio" ref={sectionRef}>
            <div className="container">
                {/* ---- Split heading ---- */}
                <div className="domicilio-top">
                    <div className="domicilio-label">Servicio a domicilio</div>
                    <div className="domicilio-heading">
                        <h2 className="domicilio-title">
                            Renovar es fácil,<br />
                            nosotros <em>vamos a ti</em>
                        </h2>
                        <p className="domicilio-intro">
                            No mueves nada. Nuestro equipo recoge y entrega tus muebles en
                            la puerta de tu casa — cobertura completa en {zona || 'Ciudad de México y Estado de México'}.
                        </p>
                    </div>
                </div>

                {/* ---- Steps — editorial columns ---- */}
                <div className="domicilio-steps">
                    {steps.map((step) => (
                        <div className="domicilio-step" key={step.num}>
                            <div className="domicilio-step-num">{step.num}</div>
                            <h3 className="domicilio-step-title">{step.title}</h3>
                            <p className="domicilio-step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {/* ---- Bottom: stats + actions ---- */}
                <div className="domicilio-bottom">
                    <div className="domicilio-stats">
                        <div className="domicilio-stat">
                            <span className="domicilio-stat-value">$0</span>
                            <span className="domicilio-stat-label">Costo de recolección</span>
                        </div>
                        <div className="domicilio-stat">
                            <span className="domicilio-stat-value">48h</span>
                            <span className="domicilio-stat-label">Tiempo de respuesta</span>
                        </div>
                        <div className="domicilio-stat">
                            <span className="domicilio-stat-value">100%</span>
                            <span className="domicilio-stat-label">Garantía</span>
                        </div>
                    </div>

                    <div className="domicilio-actions">
                        <a
                            href={whatsappUrl || defaultWaUrl}
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Agendar Recolección
                        </a>
                        <Link to="/contacto" className="btn btn-outline">
                            Ver cobertura
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
