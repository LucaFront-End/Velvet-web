import { useState, useRef, useCallback, useEffect } from 'react'
import './BeforeAfter.css'

const projects = [
    {
        id: 1,
        title: 'Cabecera King Size',
        fabric: 'Terciopelo Rosa',
        time: '5 días',
        before: '/images/before-after/before-headboard.png',
        after: '/images/before-after/after-headboard.png',
    },
    {
        id: 2,
        title: 'Sillón Clásico',
        fabric: 'Piel sintética Cognac',
        time: '7 días',
        before: '/images/before-after/before-armchair-new.png',
        after: '/images/before-after/after-armchair-new.png',
    },
    {
        id: 3,
        title: 'Comedor 6 sillas',
        fabric: 'Lino Natural',
        time: '10 días',
        before: '/images/before-after/before-dining.png',
        after: '/images/before-after/after-dining.png',
    },
]

/* ──────────────────────────── Slider ──────────────────────────── */
function Slider({ project }) {
    const containerRef = useRef(null)
    const [pos, setPos] = useState(50) /* percentage 0-100 */
    const [sliderW, setSliderW] = useState(900)
    const dragging = useRef(false)

    /* Track container width for the before-image sizing */
    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver((entries) => {
            setSliderW(entries[0].contentRect.width)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    const updatePos = useCallback((clientX) => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (!rect) return
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        setPos((x / rect.width) * 100)
    }, [])

    const onPointerDown = useCallback((e) => {
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
            {/* After (full, bottom layer) */}
            <img className="ba-img ba-after-img" src={project.after} alt={`${project.title} — después`} />

            {/* Before (clipped, top layer) */}
            <div className="ba-before-clip" style={{ width: `${pos}%` }}>
                <img className="ba-img ba-before-img" src={project.before} alt={`${project.title} — antes`} />
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
        </div>
    )
}

/* ──────────────────────────── Main ──────────────────────────── */
export default function BeforeAfter() {
    const [active, setActive] = useState(0)
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

        section.querySelectorAll('.ba-header, .ba-showcase, .ba-tabs').forEach((el) =>
            observer.observe(el)
        )

        return () => observer.disconnect()
    }, [])

    return (
        <section className="before-after" id="antes-despues" ref={sectionRef}>
            <div className="container">
                <div className="ba-header">
                    <div className="ba-label-tag">Resultados reales</div>
                    <h2 className="ba-title">
                        Antes y <em>después</em>
                    </h2>
                    <p className="ba-subtitle">
                        Desliza para ver la transformación de cada proyecto
                    </p>
                </div>

                {/* Tabs */}
                <div className="ba-tabs">
                    {projects.map((p, i) => (
                        <button
                            className={`ba-tab${i === active ? ' active' : ''}`}
                            key={p.id}
                            onClick={() => setActive(i)}
                        >
                            <span className="ba-tab-num">0{i + 1}</span>
                            <span className="ba-tab-title">{p.title}</span>
                        </button>
                    ))}
                </div>

                {/* Showcase */}
                <div className="ba-showcase">
                    {/* Large decorative number */}
                    <div className="ba-big-number">0{active + 1}</div>

                    <Slider key={active} project={projects[active]} />

                    {/* Drag hint */}
                    <div className="ba-drag-hint">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>Arrastra para comparar</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>

                    <div className="ba-details">
                        <div className="ba-detail">
                            <span className="ba-detail-label">Proyecto</span>
                            <span className="ba-detail-value">{projects[active].title}</span>
                        </div>
                        <div className="ba-detail">
                            <span className="ba-detail-label">Tela</span>
                            <span className="ba-detail-value">{projects[active].fabric}</span>
                        </div>
                        <div className="ba-detail">
                            <span className="ba-detail-label">Tiempo</span>
                            <span className="ba-detail-value">{projects[active].time}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
