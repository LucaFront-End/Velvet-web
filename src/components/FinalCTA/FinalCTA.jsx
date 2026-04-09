import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './FinalCTA.css'

export default function FinalCTA({ whatsappUrl, title, desc }) {
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
            { threshold: 0.2 }
        )

        const content = section.querySelector('.final-cta-content')
        if (content) observer.observe(content)

        return () => observer.disconnect()
    }, [])

    const defaultWaUrl = 'https://wa.me/5215568578613?text=Hola%2C%20me%20interesa%20cotizar%20un%20trabajo%20de%20tapicería'

    return (
        <section className="final-cta" ref={sectionRef}>
            <div className="container">
                <div className="final-cta-content">
                    <div className="final-cta-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                        Respuesta inmediata
                    </div>

                    <h2 className="final-cta-title">
                        {title || <>¿Listo para renovar <em>tus muebles</em>?</>}
                    </h2>

                    <p className="final-cta-desc">
                        {desc || 'Cotiza gratis en minutos. Envíanos fotos de tu mueble por WhatsApp y recibe tu presupuesto detallado con opciones de tela sin compromiso.'}
                    </p>

                    <div className="final-cta-actions">
                        <a
                            href={whatsappUrl || defaultWaUrl}
                            className="final-cta-whatsapp"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp directo
                        </a>
                        <Link to="/contacto" className="btn btn-outline">
                            Cotizar por formulario
                        </Link>
                    </div>

                    <div className="final-cta-trust">
                        <div className="trust-item">
                            <strong>120+</strong>
                            <span>Proyectos</span>
                        </div>
                        <div className="trust-item">
                            <strong>99%</strong>
                            <span>Satisfacción</span>
                        </div>
                        <div className="trust-item">
                            <strong>10+</strong>
                            <span>Años</span>
                        </div>
                        <div className="trust-item">
                            <strong>24h</strong>
                            <span>Respuesta</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
