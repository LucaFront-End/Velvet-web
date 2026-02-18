import { useEffect, useRef } from 'react'
import './Testimonials.css'

/* ──── Review data (enough for two rows) ──── */
const rowA = [
    {
        name: 'María García',
        location: 'Polanco, CDMX',
        initials: 'MG',
        text: 'Increíble trabajo con mi sala. La tela de terciopelo que elegimos quedó perfecta y el servicio a domicilio fue puntual y profesional.',
    },
    {
        name: 'Carlos Rodríguez',
        location: 'Satélite, Edomex',
        initials: 'CR',
        text: 'Retapizaron mis sillas de comedor y quedaron como nuevas. El equipo fue muy detallista con los acabados. Excelente relación calidad-precio.',
    },
    {
        name: 'Ana Martínez',
        location: 'Roma Norte, CDMX',
        initials: 'AM',
        text: 'Mandé a hacer una cabecera personalizada y superó mis expectativas. El diseño, la calidad de la tela y la instalación fueron impecables.',
    },
    {
        name: 'Roberto Sánchez',
        location: 'Coyoacán, CDMX',
        initials: 'RS',
        text: 'Transformaron mi sillón favorito que ya tenía 15 años. Ahora parece recién comprado. El proceso fue rápido y muy limpio.',
    },
]

const rowB = [
    {
        name: 'Laura Pérez',
        location: 'Naucalpan, Edomex',
        initials: 'LP',
        text: 'Tapizaron toda mi sala en piel sintética y el resultado es espectacular. Se ve elegante y es muy fácil de limpiar. Súper recomendados.',
    },
    {
        name: 'Fernando Díaz',
        location: 'Condesa, CDMX',
        initials: 'FD',
        text: 'El mejor servicio de tapicería que he encontrado. Llegaron puntuales, fueron cuidadosos con mis muebles y el resultado final fue perfecto.',
    },
    {
        name: 'Sofía Hernández',
        location: 'Tlalnepantla, Edomex',
        initials: 'SH',
        text: 'Restauraron un juego de sillas antiguas de mi abuela. El detalle y cuidado que pusieron fue increíble. Gracias por darles nueva vida.',
    },
    {
        name: 'Diego Morales',
        location: 'Del Valle, CDMX',
        initials: 'DM',
        text: 'Excelente calidad y atención. Me ayudaron a elegir la tela perfecta para mi oficina en casa. Todo quedó moderno y profesional.',
    },
]

/* ──── Star icon ──── */
const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
)

/* ──── Single card ──── */
function Card({ review }) {
    return (
        <div className="tm-card">
            <div className="tm-stars">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <p className="tm-quote">{review.text}</p>
            <div className="tm-author">
                <div className="tm-avatar">{review.initials}</div>
                <div className="tm-author-info">
                    <strong>{review.name}</strong>
                    <span>{review.location}</span>
                </div>
            </div>
        </div>
    )
}

/* ──── Marquee row ──── */
function MarqueeRow({ reviews, reverse = false }) {
    return (
        <div className={`tm-marquee-row${reverse ? ' tm-reverse' : ''}`}>
            <div className="tm-marquee-track">
                {/* Render twice for seamless loop */}
                {reviews.map((r, i) => <Card key={`a-${i}`} review={r} />)}
                {reviews.map((r, i) => <Card key={`b-${i}`} review={r} />)}
            </div>
        </div>
    )
}

/* ──── Main ──── */
export default function Testimonials() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('revealed')
                        observer.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        section.querySelectorAll('.tm-header, .tm-marquee-wrap, .tm-badge-row').forEach((el) =>
            observer.observe(el)
        )

        return () => observer.disconnect()
    }, [])

    return (
        <section className="testimonials" id="testimonios" ref={sectionRef}>
            <div className="container">
                <div className="tm-header">
                    <div className="tm-label-tag">Testimonios</div>
                    <h2 className="tm-title">
                        Lo que dicen nuestros <em>clientes</em>
                    </h2>
                    <p className="tm-subtitle">
                        Más de 120 proyectos completados con satisfacción garantizada
                    </p>
                </div>
            </div>

            {/* Marquee area — full width, no container */}
            <div className="tm-marquee-wrap">
                <MarqueeRow reviews={rowA} />
                <MarqueeRow reviews={rowB} reverse />
            </div>

            {/* Google badge */}
            <div className="container">
                <div className="tm-badge-row">
                    <div className="tm-google-badge">
                        <svg className="tm-google-icon" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <div className="tm-badge-info">
                            <div className="tm-badge-rating">
                                <span className="tm-badge-score">4.9</span>
                                <div className="tm-badge-stars">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                                </div>
                            </div>
                            <span className="tm-badge-text">Basado en reseñas de Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
