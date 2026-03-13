import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO/SEO'
import './ContactPage.css'

/* ─── Contact info ────────────────────────── */
const contactCards = [
    {
        icon: 'whatsapp',
        label: 'WhatsApp',
        value: '55 6857 8613',
        href: 'https://wa.me/5215568578613?text=Hola%20Velvet%20Tapicería,%20me%20gustaría%20cotizar%20un%20retapizado.',
        accent: '#25D366',
    },
    {
        icon: 'phone',
        label: 'Teléfono',
        value: '55 6857 8613',
        href: 'tel:+525568578613',
        accent: 'var(--color-gold)',
    },
    {
        icon: 'email',
        label: 'Correo',
        value: 'hola@velvettapiceria.com',
        href: 'mailto:hola@velvettapiceria.com',
        accent: 'var(--color-text)',
    },
]

const serviceOptions = [
    'Tapicería de Salas',
    'Retapizado de Sillas',
    'Cabeceras a Medida',
    'Catálogo de Telas',
    'Otro',
]

/* ─── Icons (inline SVG) ──────────────────── */
function CardIcon({ type }) {
    if (type === 'whatsapp') {
        return (
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        )
    }
    if (type === 'phone') {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        )
    }
    /* email */
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}

/* ══════════════════════════════════════════════
   CONTACT PAGE
   ══════════════════════════════════════════════ */
export default function ContactPage() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [focusedField, setFocusedField] = useState(null)

    /* ─── Scroll-reveal ─────────────────────── */
    const pageRef = useRef(null)

    const initReveal = useCallback(() => {
        const els = pageRef.current?.querySelectorAll('.cp-reveal')
        if (!els) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed')
                        /* stagger children */
                        const staggerEls = entry.target.querySelectorAll('.cp-stagger')
                        staggerEls.forEach((el, i) => {
                            el.style.transitionDelay = `${i * 0.08}s`
                            el.classList.add('revealed')
                        })
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.15 }
        )
        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
        const cleanup = initReveal()
        return cleanup
    }, [initReveal])

    /* ─── Form logic ────────────────────────── */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        /* Build WhatsApp message */
        const msg = `Hola Velvet Tapicería 👋\n\n` +
            `*Nombre:* ${form.name}\n` +
            `*Teléfono:* ${form.phone}\n` +
            `*Correo:* ${form.email}\n` +
            `*Servicio:* ${form.service}\n` +
            `*Mensaje:* ${form.message}`
        const encoded = encodeURIComponent(msg)
        window.open(`https://wa.me/5215568578613?text=${encoded}`, '_blank')
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 4000)
    }

    return (
        <div className="contact-page" ref={pageRef}>
            <SEO
                rawTitle="Contacto Velvet Tapicería | Tapicería Cerca de Mi en CDMX"
                path="/contacto"
                description="Cotiza tu tapizado con Velvet Tapicería. Tapicería de muebles cerca de mi ubicación, tapicero a domicilio y servicio en Ciudad de México y Estado de México."
            />
            {/* ═══ HERO ═══ */}
            <section className="cp-hero">
                <div className="cp-hero-bg" />
                <div className="container cp-hero-inner">
                    <div className="cp-hero-content">
                        <div className="cp-crumbs">
                            <Link to="/">Inicio</Link>
                            <span className="cp-crumb-sep" />
                            <span>Contacto</span>
                        </div>
                        <span className="cp-badge">Respuesta rápida</span>
                        <h1 className="cp-title">Hablemos de tu <em>proyecto</em></h1>
                        <p className="cp-subtitle">
                            Cotiza tu retapizado en menos de 5 minutos. Escríbenos por WhatsApp o llena el formulario y te respondemos hoy mismo.
                        </p>
                    </div>
                    <div className="cp-hero-visual">
                        <div className="cp-hero-image-wrap">
                            <img
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                                alt="Taller de tapicería Velvet"
                                loading="eager"
                            />
                            <div className="cp-hero-image-frame" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ CONTACT CARDS ═══ */}
            <section className="cp-cards">
                <div className="container">
                    <div className="cp-cards-grid cp-reveal">
                        {contactCards.map((card, i) => (
                            <a
                                key={card.label}
                                href={card.href}
                                target={card.icon === 'whatsapp' ? '_blank' : undefined}
                                rel={card.icon === 'whatsapp' ? 'noopener noreferrer' : undefined}
                                className="cp-card cp-stagger"
                            >
                                <span className="cp-card-icon" style={{ color: card.accent }}>
                                    <CardIcon type={card.icon} />
                                </span>
                                <span className="cp-card-label">{card.label}</span>
                                <span className="cp-card-value">{card.value}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FORM + INFO ═══ */}
            <section className="cp-form-section">
                <div className="container">
                    <div className="cp-form-grid cp-reveal">
                        {/* Form */}
                        <form className="cp-form" onSubmit={handleSubmit}>
                            <div className="cp-form-header cp-stagger">
                                <h2 className="cp-section-title">Envía tu <em>cotización</em></h2>
                                <p className="cp-section-sub">Completa el formulario y te contactamos por WhatsApp</p>
                            </div>

                            <div className="cp-field-group cp-stagger">
                                <div className={`cp-field ${focusedField === 'name' || form.name ? 'has-value' : ''}`}>
                                    <label htmlFor="cp-name">Nombre completo</label>
                                    <input
                                        id="cp-name"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>
                                <div className={`cp-field ${focusedField === 'phone' || form.phone ? 'has-value' : ''}`}>
                                    <label htmlFor="cp-phone">Teléfono</label>
                                    <input
                                        id="cp-phone"
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="cp-field-group cp-stagger">
                                <div className={`cp-field ${focusedField === 'email' || form.email ? 'has-value' : ''}`}>
                                    <label htmlFor="cp-email">Correo electrónico</label>
                                    <input
                                        id="cp-email"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </div>
                                <div className={`cp-field ${focusedField === 'service' || form.service ? 'has-value' : ''}`}>
                                    <label htmlFor="cp-service">Servicio de interés</label>
                                    <select
                                        id="cp-service"
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('service')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    >
                                        <option value="" disabled>Selecciona un servicio</option>
                                        {serviceOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="cp-field cp-field--full cp-stagger">
                                <div className={`cp-field-inner ${focusedField === 'message' || form.message ? 'has-value' : ''}`}>
                                    <label htmlFor="cp-message">Cuéntanos sobre tu proyecto</label>
                                    <textarea
                                        id="cp-message"
                                        name="message"
                                        rows="4"
                                        value={form.message}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`cp-submit cp-stagger${submitted ? ' submitted' : ''}`}
                            >
                                {submitted ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        ¡Enviado!
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Enviar por WhatsApp
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Side info */}
                        <div className="cp-side">
                            <div className="cp-side-block cp-stagger">
                                <h3 className="cp-side-heading">Horario de atención</h3>
                                <div className="cp-schedule">
                                    <div className="cp-schedule-row">
                                        <span>Lunes — Viernes</span>
                                        <span>9:00 am — 7:00 pm</span>
                                    </div>
                                    <div className="cp-schedule-row">
                                        <span>Sábado</span>
                                        <span>9:00 am — 3:00 pm</span>
                                    </div>
                                    <div className="cp-schedule-row">
                                        <span>Domingo</span>
                                        <span className="cp-closed">Cerrado</span>
                                    </div>
                                </div>
                            </div>

                            <div className="cp-side-block cp-stagger">
                                <h3 className="cp-side-heading">Cobertura</h3>
                                <p className="cp-side-text">
                                    Ciudad de México y Estado de México. Recolección y entrega a domicilio sin costo adicional.
                                </p>
                            </div>

                            <div className="cp-side-block cp-stagger">
                                <h3 className="cp-side-heading">Cotización rápida</h3>
                                <p className="cp-side-text">
                                    Envía fotos de tu mueble por WhatsApp y recibe una cotización en menos de 5 minutos durante horario de atención.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ MAP ═══ */}
            <section className="cp-map cp-reveal">
                <div className="cp-map-header">
                    <div className="container">
                        <h2 className="cp-section-title">Dónde <em>encontrarnos</em></h2>
                        <p className="cp-section-sub">CDMX & Estado de México — Recolección a domicilio</p>
                    </div>
                </div>
                <div className="cp-map-embed">
                    <iframe
                        title="Ubicación Velvet Tapicería"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240861.8958530498!2d-99.26749785!3d19.3908792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fef56c9c5c5b%3A0x71cba4e41f09b4a!2sCiudad%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </div>
    )
}
