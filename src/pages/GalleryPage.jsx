import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO/SEO'
import { fetchGalleryItems, buildCategories, buildTabs } from '../data/galleryData'
import './GalleryPage.css'

/* ══════════════════════════════════════════════
   GALLERY PAGE — 100% CMS-driven
   Masonry grid + lightbox + dynamic filters
   All content managed from Wix CMS (CMSGaleria)
   ══════════════════════════════════════════════ */

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

                <img src={item.src} alt={item.title || 'Proyecto de tapicería'} className="gal-lightbox-img" />

                <button className="gal-lightbox-arrow gal-lightbox-next" onClick={() => onNav(1)} aria-label="Siguiente">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>

                <div className="gal-lightbox-info">
                    {item.title && <h3 className="gal-lightbox-title">{item.title}</h3>}
                    {item.fabric && <span className="gal-lightbox-fabric">{item.fabric}</span>}
                    {item.cotizarUrl && (
                        <a
                            href={item.cotizarUrl}
                            className="gal-lightbox-cotizar"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Cotizar por WhatsApp
                        </a>
                    )}
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

    // CMS data state
    const [gallery, setGallery] = useState([])
    const [categories, setCategories] = useState([{ key: 'todo', label: 'Todo' }])
    const [tabs, setTabs] = useState([{ key: 'todo', label: 'Todo' }])
    const [loading, setLoading] = useState(true)

    // Fetch gallery from CMS
    useEffect(() => {
        let cancelled = false
        async function load() {
            setLoading(true)
            const items = await fetchGalleryItems()
            if (cancelled) return
            setGallery(items)
            setCategories(buildCategories(items))
            setTabs(buildTabs(items))
            setLoading(false)
        }
        load()
        return () => { cancelled = true }
    }, [])

    const filtered = activeFilter === 'todo' ? gallery : gallery.filter((g) => (g.tab || '').toLowerCase() === activeFilter)

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
    }, [activeFilter, loading])

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

    return (
        <div className="gallery-page" ref={pageRef}>

            <SEO
                rawTitle="Trabajos de Tapicería en CDMX | Tapizado de Sillones, Salas y Sillas"
                path="/galeria"
                description="Descubre nuestros trabajos de tapicería de muebles. Retapizado de sillones, salas y sillas con telas de calidad. Tapicería cerca de mi en CDMX y Estado de México."
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
                            Explorá nuestros trabajos y encontrá inspiración para tu próximo proyecto.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ 2. FILTER + MASONRY GRID ═══ */}
            <section className="gal-portfolio">
                <div className="container">

                    {/* Filters — driven by Pestañas field */}
                    {tabs.length > 1 && (
                        <div className="gal-filters gal-reveal">
                            {tabs.map((t) => (
                                <button
                                    key={t.key}
                                    className={`gal-filter-btn ${activeFilter === t.key ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(t.key)}
                                >
                                    {t.label}
                                </button>
                            ))}
                            <span className="gal-counter">{filtered.length} proyectos</span>
                        </div>
                    )}

                    {/* Loading state */}
                    {loading && (
                        <div className="gal-loading gal-reveal" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: 'var(--space-4xl) 0',
                        }}>
                            <div style={{
                                width: 40,
                                height: 40,
                                border: '3px solid rgba(255,255,255,0.1)',
                                borderTopColor: 'var(--color-gold, #c4a265)',
                                borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite',
                            }} />
                            <style>{`@keyframes spin { to { transform: rotate(360deg) }}`}</style>
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && gallery.length === 0 && (
                        <div className="gal-empty gal-reveal" style={{
                            textAlign: 'center',
                            padding: 'var(--space-4xl) 0',
                            color: 'rgba(255,255,255,0.4)',
                        }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: 16, opacity: 0.3 }}>
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                <circle cx="8.5" cy="8.5" r="1.5" />
                                <polyline points="21 15 16 10 5 21" />
                            </svg>
                            <p style={{ fontSize: 'var(--text-lg)', marginBottom: 8 }}>
                                Próximamente más proyectos
                            </p>
                            <p style={{ fontSize: 'var(--text-sm)' }}>
                                Estamos subiendo nuestros mejores trabajos. Volvé pronto.
                            </p>
                        </div>
                    )}

                    {/* CSS Columns Masonry */}
                    {!loading && filtered.length > 0 && (
                        <div className="gal-masonry gal-reveal" key={activeFilter}>
                            {filtered.map((item, i) => (
                                <div
                                    className="gal-card gal-stagger"
                                    key={item.id}
                                    onClick={() => setLightboxIdx(i)}
                                >
                                    <div className="gal-card-img">
                                        <img src={item.src} alt={item.title || 'Proyecto de tapicería'} loading="lazy" />
                                    </div>
                                    <div className="gal-card-overlay">
                                        {item.cat && <span className="gal-card-cat">{categories.find(c => c.key === item.cat)?.label || item.cat}</span>}
                                        {item.title && <h3 className="gal-card-title">{item.title}</h3>}
                                        {item.fabric && <span className="gal-card-fabric">{item.fabric}</span>}
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
                    )}
                </div>
            </section>

            {/* ═══ 3. CTA ═══ */}
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
                                href="https://wa.me/5215568578613?text=SW-%20Hola%2C%20vi%20su%20galería%20y%20me%20interesa%20cotizar"
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
