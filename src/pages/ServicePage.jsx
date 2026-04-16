import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import { getServiceBySlug } from '../data/servicesData'
import { fetchGalleryItems } from '../data/galleryData'
import SEO from '../components/SEO/SEO'
import './ServicePage.css'

/* ─── Animated counter hook ─── */
function useCountUp(endValue, duration = 1800) {
    const [value, setValue] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        if (!ref.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true
                    const num = parseInt(endValue)
                    if (isNaN(num)) { setValue(endValue); return }
                    const suffix = String(endValue).replace(/\d/g, '')
                    let start = 0
                    const step = (ts) => {
                        if (!start) start = ts
                        const progress = Math.min((ts - start) / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setValue(Math.floor(eased * num) + suffix)
                        if (progress < 1) requestAnimationFrame(step)
                    }
                    requestAnimationFrame(step)
                }
            },
            { threshold: 0.3 }
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [endValue, duration])

    return [ref, value]
}

/* ─── Counter component ─── */
function AnimatedStat({ val, label }) {
    const [ref, animVal] = useCountUp(val)
    return (
        <div className="sp-metric" ref={ref}>
            <span className="sp-metric-val">{animVal || '0'}</span>
            <span className="sp-metric-lbl">{label}</span>
        </div>
    )
}

/* ─── Horizontal drag carousel ─── */
function Gallery({ images, title }) {
    const trackRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const dragState = useRef({ startX: 0, scrollLeft: 0 })

    const onPointerDown = useCallback((e) => {
        const track = trackRef.current
        if (!track) return
        setIsDragging(true)
        track.style.cursor = 'grabbing'
        track.style.scrollSnapType = 'none'
        dragState.current = { startX: e.clientX, scrollLeft: track.scrollLeft }
        e.preventDefault()
    }, [])

    useEffect(() => {
        const onPointerMove = (e) => {
            if (!isDragging) return
            const dx = e.clientX - dragState.current.startX
            trackRef.current.scrollLeft = dragState.current.scrollLeft - dx
        }
        const onPointerUp = () => {
            setIsDragging(false)
            if (trackRef.current) {
                trackRef.current.style.cursor = 'grab'
                trackRef.current.style.scrollSnapType = 'x mandatory'
            }
        }
        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)
        return () => {
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
        }
    }, [isDragging])

    return (
        <div className="sp-gallery" onPointerDown={onPointerDown}>
            <div className="sp-gallery-track" ref={trackRef}>
                {images.map((url, i) => (
                    <div className="sp-gallery-slide" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                        <img src={url} alt={`${title} — proyecto ${i + 1}`} loading="lazy" draggable="false" />
                        <div className="sp-gallery-overlay">
                            <span className="sp-gallery-idx">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="sp-gallery-hint">
                <span className="sp-hint-arrow">←</span>
                Desliza para ver más
                <span className="sp-hint-arrow">→</span>
            </div>
        </div>
    )
}

/* ─── Main ─── */
export default function ServicePage() {
    const { slug } = useParams()
    const service = getServiceBySlug(slug)
    const pageRef = useRef(null)
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => { window.scrollTo(0, 0) }, [slug])

    /* Fetch CMS gallery images filtered by service category */
    const [cmsGallery, setCmsGallery] = useState([])
    const [galleryLoading, setGalleryLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        async function loadGallery() {
            setGalleryLoading(true)
            try {
                const items = await fetchGalleryItems()
                if (cancelled) return
                const cats = service?.cmsCategories || []
                if (cats.length > 0) {
                    const filtered = items.filter(
                        (item) => cats.includes(item.cat)
                    )
                    setCmsGallery(filtered.map((item) => item.src))
                } else {
                    setCmsGallery([])
                }
            } catch (err) {
                console.warn('[CMS] Service gallery fetch failed:', err.message)
                setCmsGallery([])
            }
            setGalleryLoading(false)
        }
        loadGallery()
        return () => { cancelled = true }
    }, [slug, service?.cmsCategories])

    /* Use CMS images when available, fallback to hardcoded */
    const galleryImages = cmsGallery.length > 0 ? cmsGallery : service?.gallery || []

    /* Scroll progress bar */
    useEffect(() => {
        const onScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])



    /* Staggered scroll-reveal */
    useEffect(() => {
        const page = pageRef.current
        if (!page) return
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    /* Stagger children if present */
                    const children = e.target.querySelectorAll('.sp-stagger')
                    if (children.length) {
                        children.forEach((child, i) => {
                            child.style.transitionDelay = `${i * 0.08}s`
                            child.classList.add('revealed')
                        })
                    }
                    e.target.classList.add('revealed')
                    observer.unobserve(e.target)
                }
            }),
            { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
        )
        page.querySelectorAll('.sp-reveal').forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [slug, galleryLoading])

    if (!service) return <Navigate to="/" replace />

    const waLink = `https://wa.me/5215568578613?text=SW-%20Hola%2C%20quiero%20cotizar%20${encodeURIComponent(service.title)}`

    return (
        <div className="service-page" ref={pageRef}>
            <SEO
                title={service.seo?.title?.split(' | ')[0] || service.title}
                path={`/servicios/${slug}`}
                description={service.seo?.description || service.description}
                image={service.heroImage}
            />
            {/* Scroll progress */}
            <div className="sp-progress" style={{ width: `${scrollProgress}%` }} />

            {/* ═══ 1. HERO — Clean split: text left, image right ═══ */}
            <section className="sp-hero">
                {/* Decorative background */}
                <div className="sp-hero-bg" aria-hidden="true" />
                <div className="container sp-hero-inner">
                    <div className="sp-hero-content">
                        <nav className="sp-crumbs">
                            <Link to="/">Inicio</Link>
                            <span className="sp-crumb-sep" />
                            <Link to="/#servicios">Servicios</Link>
                            <span className="sp-crumb-sep" />
                            <span>{service.title}</span>
                        </nav>
                        <span className="sp-badge">{service.tag}</span>
                        <h1 className="sp-title">{service.title}</h1>
                        <p className="sp-desc">{service.description}</p>
                        <div className="sp-hero-stats">
                            <AnimatedStat val={service.stats.projects} label="proyectos" />
                            <AnimatedStat val={service.stats.satisfaction} label="satisfacción" />
                            <AnimatedStat val={service.stats.avgTime} label="tiempo prom." />
                        </div>
                        <a href={waLink} className="sp-cta-btn" target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.33 0-4.502-.753-6.258-2.032l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                            </svg>
                            Cotizar por WhatsApp
                        </a>
                    </div>
                    <div className="sp-hero-visual">
                        <div className="sp-hero-image-wrap">
                            <img src={service.heroImage} alt={service.title} loading="eager" />
                            <div className="sp-hero-image-frame" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 2. FEATURES — Compact numbered grid ═══ */}
            <section className="sp-features">
                <div className="container">
                    <div className="sp-features-header sp-reveal">
                        <h2 className="sp-section-title">Qué <em>incluye</em></h2>
                        <p className="sp-section-sub">{service.tagline}</p>
                    </div>
                    <div className="sp-features-grid sp-reveal">
                        {service.features.map((feat, i) => (
                            <div className="sp-feat-card sp-stagger" key={i}>
                                <span className="sp-feat-num">{String(i + 1).padStart(2, '0')}</span>
                                <p className="sp-feat-text">{feat}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 4. HORIZONTAL GALLERY ═══ */}
            {!galleryLoading && galleryImages.length > 0 && (
                <div className="sp-reveal">
                    <Gallery images={galleryImages} title={service.title} />
                </div>
            )}

            {/* ═══ 5. PROCESS — Horizontal compact ═══ */}
            <section className="sp-process">
                <div className="container">
                    <div className="sp-process-header sp-reveal">
                        <h2 className="sp-section-title">Cómo <em>funciona</em></h2>
                        <p className="sp-section-sub">Un proceso simple de inicio a fin</p>
                    </div>
                    <div className="sp-process-bar sp-reveal">
                        {service.process.map((step, i) => (
                            <div className="sp-proc-step sp-stagger" key={step.num}>
                                <div className="sp-proc-top">
                                    <span className="sp-proc-num">{step.num}</span>
                                    {i < service.process.length - 1 && <span className="sp-proc-dash" />}
                                </div>
                                <h3 className="sp-proc-title">{step.title}</h3>
                                <p className="sp-proc-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ 6. MATERIALS STRIP ═══ */}
            <section className="sp-materials">
                <div className="container">
                    <div className="sp-mat-row sp-reveal">
                        <span className="sp-mat-label">Telas disponibles</span>
                        <div className="sp-mat-list">
                            {service.fabrics.map((f, i) => (
                                <span className="sp-mat-item sp-stagger" key={i}>{f}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ 7. BOTTOM CTA ═══ */}
            <section className="sp-bottom">
                <div className="container">
                    <div className="sp-bottom-inner sp-reveal">
                        <div className="sp-bottom-deco" aria-hidden="true" />
                        <div className="sp-bottom-text">
                            <h2 className="sp-bottom-title sp-stagger">¿Te interesa este servicio?</h2>
                            <p className="sp-bottom-desc sp-stagger">Cotiza gratis en menos de 5 minutos. Sin compromiso.</p>
                        </div>
                        <a href={waLink} className="sp-cta-btn sp-cta-btn--lg sp-stagger" target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.33 0-4.502-.753-6.258-2.032l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                            </svg>
                            Cotizar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* ═══ STICKY FAB ═══ */}
            <a href={waLink} className="sp-fab" target="_blank" rel="noopener noreferrer" aria-label="Cotizar por WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.33 0-4.502-.753-6.258-2.032l-.438-.328-3.205 1.074 1.074-3.205-.328-.438A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
            </a>
        </div>
    )
}
