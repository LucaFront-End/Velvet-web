import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HeroV2.css'

/* easeInOut helper */
function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

/* Animate pos through a sequence of keyframes */
function animatePos(setPos, keyframes, totalDuration, cancelRef) {
    const start = performance.now()
    const totalDist = keyframes.reduce((acc, kf, i) => {
        if (i === 0) return acc
        return acc + Math.abs(kf - keyframes[i - 1])
    }, 0)

    // Build segments: [{from, to, startT, endT}]
    const segments = []
    let elapsed = 0
    for (let i = 1; i < keyframes.length; i++) {
        const segDist = Math.abs(keyframes[i] - keyframes[i - 1])
        const segDur = (segDist / totalDist) * totalDuration
        segments.push({ from: keyframes[i - 1], to: keyframes[i], startT: elapsed, endT: elapsed + segDur })
        elapsed += segDur
    }

    function tick(now) {
        if (cancelRef.current) return
        const t = now - start
        // Find current segment
        const seg = segments.find(s => t >= s.startT && t <= s.endT) || segments[segments.length - 1]
        const segProgress = Math.min((t - seg.startT) / (seg.endT - seg.startT), 1)
        const eased = easeInOut(segProgress)
        const value = seg.from + (seg.to - seg.from) * eased
        setPos(value)
        if (t < totalDuration && !cancelRef.current) {
            requestAnimationFrame(tick)
        }
    }
    requestAnimationFrame(tick)
}

/* ── Same slider logic as BeforeAfter.jsx ── */
function HeroSlider() {
    const containerRef = useRef(null)
    const [pos, setPos] = useState(50)
    const [sliderW, setSliderW] = useState(600)
    const dragging = useRef(false)
    const cancelAnim = useRef(false)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            setSliderW(entries[0].contentRect.width)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    /* Intro animation: wait 800ms then sweep 50→20→80→50 over 2.2s */
    useEffect(() => {
        cancelAnim.current = false
        const timer = setTimeout(() => {
            if (!cancelAnim.current) {
                animatePos(setPos, [50, 20, 80, 50], 2200, cancelAnim)
            }
        }, 800)
        return () => {
            clearTimeout(timer)
            cancelAnim.current = true
        }
    }, [])

    const updatePos = useCallback((clientX) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        setPos((x / rect.width) * 100)
    }, [])

    const onPointerDown = useCallback((e) => {
        cancelAnim.current = true   // cancel intro anim on first touch
        dragging.current = true
        updatePos(e.clientX)
        e.preventDefault()
    }, [updatePos])

    const onPointerMove = useCallback((e) => {
        if (!dragging.current) return
        updatePos(e.clientX)
    }, [updatePos])

    const onPointerUp = useCallback(() => {
        dragging.current = false
    }, [])

    useEffect(() => {
        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)
        return () => {
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
        }
    }, [onPointerMove, onPointerUp])

    return (
        <div
            className="ba-slider"
            ref={containerRef}
            onPointerDown={onPointerDown}
            style={{ '--slider-w': `${sliderW}px` }}
        >
            {/* After (full width, bottom layer) */}
            <img
                className="ba-img ba-after-img"
                src="/images/before-after/hero-sofa-after.png"
                alt="Sofá Chesterfield restaurado — después"
                draggable="false"
            />

            {/* Before (clipped, top layer) */}
            <div className="ba-before-clip" style={{ width: `${pos}%` }}>
                <img
                    className="ba-img ba-before-img"
                    src="/images/before-after/hero-sofa-before.png"
                    alt="Sofá Chesterfield desgastado — antes"
                    draggable="false"
                />
            </div>

            {/* Labels */}
            <span className="ba-label ba-label-before" style={{ opacity: pos > 15 ? 1 : 0 }}>Antes</span>
            <span className="ba-label ba-label-after" style={{ opacity: pos < 85 ? 1 : 0 }}>Después</span>

            {/* Handle */}
            <div className="ba-handle" style={{ left: `${pos}%` }}>
                <div className="ba-handle-line" />
                <div className="ba-handle-knob">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>
            </div>

            {/* Drag hint */}
            <div className="ba-drag-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
                <span>Arrastrá para comparar</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </div>
        </div>
    )
}

export default function HeroV2() {
    return (
        <section className="hero" id="hero">
            <div className="hero-container container">

                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        Tapicero a domicilio · CDMX &amp; Edomex
                    </div>

                    <h1 className="hero-title">
                        Retapizados que <em>transforman</em> tu espacio
                    </h1>

                    <p className="hero-subtitle">
                        Renovamos tus muebles con materiales premium y un acabado artesanal
                        impecable. Recogemos y entregamos en la comodidad de tu hogar.
                    </p>

                    <div className="hero-ctas">
                        <Link to="/contacto" className="btn btn-primary">
                            Cotizar Gratis
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </Link>
                        <Link to="/galeria" className="btn btn-outline">
                            Ver Proyectos
                        </Link>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="hero-stat-number">120+</span>
                            <span className="hero-stat-label">Proyectos realizados</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">98%</span>
                            <span className="hero-stat-label">Clientes satisfechos</span>
                        </div>
                        <div className="hero-stat">
                            <span className="hero-stat-number">5+</span>
                            <span className="hero-stat-label">Años de experiencia</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <HeroSlider />

                    {/* Floating card — bottom-left */}
                    <div className="hero-floating-card">
                        <div className="hero-floating-icon">✦</div>
                        <div className="hero-floating-text">
                            <span className="hero-floating-title">Garantía de calidad</span>
                            <span className="hero-floating-sub">En cada proyecto</span>
                        </div>
                    </div>

                    {/* Floating card — top-right */}
                    <div className="hero-floating-card hero-floating-card--right">
                        <div className="hero-floating-icon">⟐</div>
                        <div className="hero-floating-text">
                            <span className="hero-floating-title">A domicilio</span>
                            <span className="hero-floating-sub">Recogemos y entregamos</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="hero-scroll">
                <span className="hero-scroll-text">Scroll</span>
                <div className="hero-scroll-line" />
            </div>
        </section>
    )
}
