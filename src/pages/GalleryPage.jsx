import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO/SEO'
import './GalleryPage.css'

/* ══════════════════════════════════════════════
   GALLERY PAGE — Masonry + lightbox + filters
   ══════════════════════════════════════════════ */

const categories = [
    { key: 'todo', label: 'Todo' },
    { key: 'salas', label: 'Salas' },
    { key: 'sillas', label: 'Sillas' },
    { key: 'cabeceras', label: 'Cabeceras' },
    { key: 'automotriz', label: 'Automotriz' },
]

const gallery = [
    // Salas — 6 items
    { id: 1, cat: 'salas', src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', title: 'Sala terciopelo esmeralda', fabric: 'Terciopelo' },
    { id: 2, cat: 'salas', src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Sofá tres cuerpos', fabric: 'Lino Natural' },
    { id: 3, cat: 'salas', src: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', title: 'Sillón capitoneado', fabric: 'Piel Sintética' },
    { id: 4, cat: 'salas', src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80', title: 'Sala modular gris', fabric: 'Chenille' },
    { id: 5, cat: 'salas', src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', title: 'Sala familiar renovada', fabric: 'Antimanchas' },
    { id: 6, cat: 'salas', src: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80', title: 'Sofá curvo moderno', fabric: 'Terciopelo Azul' },

    // Sillas — 5 items
    { id: 7, cat: 'sillas', src: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80', title: 'Sillas comedor clásicas', fabric: 'Lino' },
    { id: 8, cat: 'sillas', src: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80', title: 'Silla accent moderna', fabric: 'Microfibra' },
    { id: 9, cat: 'sillas', src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80', title: 'Sillas tapizadas lino', fabric: 'Lino Natural' },
    { id: 10, cat: 'sillas', src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', title: 'Banco restaurado', fabric: 'Vinipiel' },
    { id: 11, cat: 'sillas', src: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80', title: 'Silla de oficina premium', fabric: 'Piel Sintética' },

    // Cabeceras — 5 items
    { id: 12, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Cabecera capitoneada blanca', fabric: 'Terciopelo' },
    { id: 13, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&q=80', title: 'Cabecera king terciopelo', fabric: 'Terciopelo Rosa' },
    { id: 14, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1617806501553-e8dfb8306aba?w=800&q=80', title: 'Cabecera panel madera', fabric: 'Suede' },
    { id: 15, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', title: 'Recámara completa', fabric: 'Lino' },
    { id: 16, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&q=80', title: 'Cabecera bastones tela', fabric: 'Bouclé' },

    // Automotriz — 5 items
    { id: 17, cat: 'automotriz', src: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&q=80', title: 'Interior sedan premium', fabric: 'Piel Sintética' },
    { id: 18, cat: 'automotriz', src: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&q=80', title: 'Asientos deportivos', fabric: 'Alcántara' },
    { id: 19, cat: 'automotriz', src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80', title: 'Corvette restaurado', fabric: 'Vinipiel Auto' },
    { id: 20, cat: 'automotriz', src: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80', title: 'Interior clásico', fabric: 'Piel Grado A' },
    { id: 21, cat: 'automotriz', src: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80', title: 'Volante retapizado', fabric: 'Neopreno' },
]

/* Featured projects with larger images + more detail */
const featured = [
    {
        title: 'Sala Terciopelo Esmeralda',
        desc: 'Retapizado completo de sala seccional con terciopelo importado. Incluye cambio de espuma de alta densidad y refuerzo estructural.',
        fabric: 'Terciopelo Italiano',
        time: '12 días',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
    },
    {
        title: 'Cabecera King Capitoneada',
        desc: 'Cabecera fabricada a medida para recámara principal. Diseño capitoneado con marco de madera reforzada.',
        fabric: 'Terciopelo Rosa Cuarzo',
        time: '8 días',
        image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1200&q=80',
    },
    {
        title: 'Interior Deportivo Custom',
        desc: 'Retapizado completo del interior: asientos, cielo, paneles y volante. Materiales resistentes a UV y desgaste.',
        fabric: 'Alcántara + Piel',
        time: '15 días',
        image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&q=80',
    },
]

/* ═══════════ Lightbox ═══════════ */
function Lightbox({ item, onClose, onNav }) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowRight') onNav(1)
            if (e.key === 'ArrowLeft') onNav(-1)
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handler)
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = '' }
    }, [onClose, onNav])

    if (!item) return null

    return (
        <div className="gal-lightbox" onClick={onClose}>
            <div className="gal-lightbox-inner" onClick={(e) => e.stopPropagation()}>
                <button className="gal-lightbox-close" onClick={onClose} aria-label="Cerrar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                <button className="gal-lightbox-arrow gal-lightbox-prev" onClick={() => onNav(-1)} aria-label="Anterior">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>

                <img src={item.src.replace('w=800', 'w=1400')} alt={item.title} className="gal-lightbox-img" />

                <button className="gal-lightbox-arrow gal-lightbox-next" onClick={() => onNav(1)} aria-label="Siguiente">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>

                <div className="gal-lightbox-info">
                    <h3 className="gal-lightbox-title">{item.title}</h3>
                    <span className="gal-lightbox-fabric">{item.fabric}</span>
                </div>
            </div>
        </div>
    )
}

/* ═══════════ Main Page ═══════════ */
export default function GalleryPage() {
    const pageRef = useRef(null)
    const [activeFilter, setActiveFilter] = useState('todo')
    const [lightboxIdx, setLightboxIdx] = useState(null)
    const featuredRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const dragStart = useRef({ x: 0, scrollLeft: 0 })

    const filtered = activeFilter === 'todo' ? gallery : gallery.filter((g) => g.cat === activeFilter)

    /* Scroll reveal */
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
                        const kids = entry.target.querySelectorAll('.gal-stagger')
                        kids.forEach((el, i) => {
                            const t = setTimeout(() => el.classList.add('revealed'), i * 80)
                            timeouts.push(t)
                        })
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
        )
        page.querySelectorAll('.gal-reveal').forEach((el) => observer.observe(el))
        return () => { observer.disconnect(); timeouts.forEach(clearTimeout) }
    }, [activeFilter])

    /* Lightbox nav */
    const navLightbox = useCallback((dir) => {
        setLightboxIdx((prev) => {
            if (prev === null) return null
            const next = prev + dir
            if (next < 0) return filtered.length - 1
            if (next >= filtered.length) return 0
            return next
        })
    }, [filtered.length])

    /* Horizontal drag for featured scroller */
    const onDragStart = (e) => {
        const container = featuredRef.current
        if (!container) return
        setIsDragging(true)
        dragStart.current = { x: e.pageX || e.touches?.[0]?.pageX, scrollLeft: container.scrollLeft }
    }
    const onDragMove = (e) => {
        if (!isDragging) return
        const container = featuredRef.current
        if (!container) return
        const x = e.pageX || e.touches?.[0]?.pageX
        const walk = (x - dragStart.current.x) * 1.5
        container.scrollLeft = dragStart.current.scrollLeft - walk
    }
    const onDragEnd = () => setIsDragging(false)

    return (
        <div className="gallery-page" ref={pageRef}>

            <SEO
                title="Galería de Proyectos"
                path="/galeria"
                description="Explorá nuestra galería de más de 200 proyectos de tapicería: salas, sillas, cabeceras y automotriz. Antes y después de cada transformación."
            />

            {/* ═══ 1. HERO — Minimal, typographic ═══ */}
            <section className="gal-hero">
                <div className="container">
                    <div className="gal-hero-content gal-reveal">
                        <span className="gal-hero-label gal-stagger">Galería de proyectos</span>
                        <h1 className="gal-hero-title gal-stagger">
                            Cada proyecto cuenta <em>su propia historia</em>
                        </h1>
                        <p className="gal-hero-sub gal-stagger">
                            Más de 200 muebles transformados. Explorá nuestros trabajos
                            y encontrá inspiración para tu próximo proyecto.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ 2. FILTER + MASONRY GRID ═══ */}
            <section className="gal-portfolio">
                <div className="container">

                    {/* Filters */}
                    <div className="gal-filters gal-reveal">
                        {categories.map((c) => (
                            <button
                                key={c.key}
                                className={`gal-filter-btn ${activeFilter === c.key ? 'active' : ''}`}
                                onClick={() => setActiveFilter(c.key)}
                            >
                                {c.label}
                            </button>
                        ))}
                        <span className="gal-counter">{filtered.length} proyectos</span>
                    </div>

                    {/* CSS Columns Masonry */}
                    <div className="gal-masonry gal-reveal" key={activeFilter}>
                        {filtered.map((item, i) => (
                            <div
                                className="gal-card gal-stagger"
                                key={item.id}
                                onClick={() => setLightboxIdx(i)}
                            >
                                <div className="gal-card-img">
                                    <img src={item.src} alt={item.title} loading="lazy" />
                                </div>
                                <div className="gal-card-overlay">
                                    <span className="gal-card-cat">{categories.find(c => c.key === item.cat)?.label}</span>
                                    <h3 className="gal-card-title">{item.title}</h3>
                                    <span className="gal-card-fabric">{item.fabric}</span>
                                </div>
                                <div className="gal-card-zoom">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 3. FEATURED PROJECTS — Horizontal scroller ═══ */}
            <section className="gal-featured">
                <div className="container">
                    <div className="gal-featured-header gal-reveal">
                        <div className="gal-featured-header-left">
                            <span className="gal-featured-label gal-stagger">Proyectos destacados</span>
                            <h2 className="gal-featured-title gal-stagger">
                                Trabajos que nos <em>enorgullecen</em>
                            </h2>
                        </div>
                        <p className="gal-featured-desc gal-stagger">
                            Proyectos que representan lo mejor de nuestro trabajo. Arrastrá para explorar.
                        </p>
                    </div>
                </div>

                <div
                    className="gal-featured-scroll gal-reveal"
                    ref={featuredRef}
                    onMouseDown={onDragStart}
                    onMouseMove={onDragMove}
                    onMouseUp={onDragEnd}
                    onMouseLeave={onDragEnd}
                    onTouchStart={onDragStart}
                    onTouchMove={onDragMove}
                    onTouchEnd={onDragEnd}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    <div className="gal-featured-track">
                        {featured.map((proj, i) => (
                            <article className="gal-feat-card gal-stagger" key={i}>
                                <div className="gal-feat-card-img">
                                    <img src={proj.image} alt={proj.title} loading="lazy" />
                                </div>
                                <div className="gal-feat-card-content">
                                    <span className="gal-feat-num">{String(i + 1).padStart(2, '0')}</span>
                                    <h3 className="gal-feat-card-title">{proj.title}</h3>
                                    <p className="gal-feat-card-desc">{proj.desc}</p>
                                    <div className="gal-feat-meta">
                                        <div className="gal-feat-meta-item">
                                            <span className="gal-feat-meta-label">Tela</span>
                                            <span className="gal-feat-meta-value">{proj.fabric}</span>
                                        </div>
                                        <div className="gal-feat-meta-item">
                                            <span className="gal-feat-meta-label">Tiempo</span>
                                            <span className="gal-feat-meta-value">{proj.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 4. CTA ═══ */}
            <section className="gal-cta">
                <div className="container">
                    <div className="gal-cta-inner gal-reveal">
                        <div className="gal-cta-text">
                            <h2 className="gal-cta-title gal-stagger">
                                ¿Te imaginás tu mueble <em>así de renovado</em>?
                            </h2>
                            <p className="gal-cta-desc gal-stagger">
                                Envíanos fotos y recibí tu presupuesto gratis en menos de 5 minutos.
                            </p>
                        </div>
                        <div className="gal-cta-actions gal-stagger">
                            <a
                                href="https://wa.me/5215568578613?text=Hola%2C%20vi%20su%20galería%20y%20me%20interesa%20cotizar"
                                className="gal-cta-wa"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Cotizar por WhatsApp
                            </a>
                            <Link to="/contacto" className="btn btn-outline">
                                Ver contacto
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIdx !== null && (
                <Lightbox
                    item={filtered[lightboxIdx]}
                    onClose={() => setLightboxIdx(null)}
                    onNav={navLightbox}
                />
            )}
        </div>
    )
}
