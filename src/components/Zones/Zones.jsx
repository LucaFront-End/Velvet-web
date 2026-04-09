import { useState, useEffect, useRef } from 'react'
import './Zones.css'

/* Zone data — geographically positioned */
const zones = [
    {
        id: 'cdmx-poniente',
        name: 'Poniente CDMX',
        areas: 'Polanco, Lomas de Chapultepec, Santa Fe, Reforma, Bosques',
        cx: 122, cy: 187,
    },
    {
        id: 'cdmx-sur',
        name: 'Sur CDMX',
        areas: 'Coyoacán, Del Valle, Tlalpan, Xochimilco, Pedregal, San Ángel',
        cx: 195, cy: 270,
    },
    {
        id: 'cdmx-centro',
        name: 'Centro CDMX',
        areas: 'Centro Histórico, Juárez, Cuauhtémoc, Roma, Condesa, Tabacalera',
        cx: 205, cy: 175,
    },
    {
        id: 'cdmx-norte',
        name: 'Norte CDMX',
        areas: 'Lindavista, Azcapotzalco, GAM, Vallejo, Tepeyac',
        cx: 212, cy: 110,
    },
    {
        id: 'edomex-poniente',
        name: 'Poniente Edomex',
        areas: 'Satélite, Naucalpan, Tlalnepantla, Atizapán, Huixquilucan',
        cx: 105, cy: 90,
    },
    {
        id: 'edomex-oriente',
        name: 'Oriente Edomex',
        areas: 'Ecatepec, Nezahualcóyotl, Texcoco, Los Reyes la Paz, Ixtapaluca',
        cx: 295, cy: 155,
    },
]

/*
 * Geographically-inspired SVG paths for CDMX + Edomex
 * CDMX shape: wider top, narrows south toward Milpa Alta/Xochimilco
 * Edomex wraps north and east
 */
const zonePaths = {
    // CDMX Poniente — western strip (Cuajimalpa, Álvaro Obregón, Miguel Hidalgo west)
    'cdmx-poniente':
        'M95,135 L140,130 L160,155 L160,200 L155,240 L130,250 L100,235 L80,200 L75,165 Z',

    // CDMX Centro — central core (Cuauhtémoc, Benito Juárez, Miguel Hidalgo east)
    'cdmx-centro':
        'M140,130 L240,120 L255,145 L260,185 L250,210 L210,220 L160,225 L155,200 L160,155 Z',

    // CDMX Norte — upper strip (GAM, Azcapotzalco, Venustiano Carranza north)
    'cdmx-norte':
        'M140,100 L190,85 L245,90 L275,110 L255,145 L240,120 L140,130 Z',

    // CDMX Sur — large southern area tapering down (Coyoacán, Tlalpan, Xochimilco, Milpa Alta)
    'cdmx-sur':
        'M130,250 L155,240 L160,225 L210,220 L250,210 L270,235 L265,275 L240,310 L210,340 L175,345 L145,320 L120,285 Z',

    // Edomex Poniente — wrapping CDMX north-west (Naucalpan, Tlalnepantla, Atizapán, Huixquilucan)
    'edomex-poniente':
        'M20,50 L120,25 L190,30 L190,85 L140,100 L140,130 L95,135 L75,165 L45,150 L25,110 Z',

    // Edomex Oriente — wrapping CDMX north-east and east (Ecatepec, Neza, Texcoco, Ixtapaluca)
    'edomex-oriente':
        'M190,30 L300,20 L380,60 L385,140 L370,220 L340,280 L300,310 L265,275 L270,235 L250,210 L260,185 L255,145 L275,110 L245,90 L190,85 Z',
}

/* All areas for the marquee */
const marqueeAreas = [
    'Polanco', 'Condesa', 'Roma Norte', 'Del Valle', 'Coyoacán',
    'Santa Fe', 'Lomas', 'Satélite', 'Naucalpan', 'Tlalnepantla',
    'Ecatepec', 'Lindavista', 'Pedregal', 'Reforma', 'Xochimilco',
    'San Ángel', 'Huixquilucan', 'Nezahualcóyotl', 'Texcoco', 'Atizapán',
    'Cuajimalpa', 'Iztapalapa', 'Tlalpan', 'GAM',
]

export default function Zones({ zona, whatsappUrl }) {
    const [active, setActive] = useState(null)
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0 })
    const sectionRef = useRef(null)
    const mapRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('revealed')
                })
            },
            { threshold: 0.12 }
        )

        section.querySelectorAll('.zones-content, .zones-map-container, .zones-marquee-wrap').forEach((el) =>
            observer.observe(el)
        )

        return () => observer.disconnect()
    }, [])

    const handleZoneEnter = (zone, e) => {
        setActive(zone)
        if (mapRef.current) {
            const rect = mapRef.current.getBoundingClientRect()
            setTooltip({
                visible: true,
                x: e.clientX - rect.left + 14,
                y: e.clientY - rect.top - 65,
            })
        }
    }

    const handleZoneMove = (e) => {
        if (mapRef.current) {
            const rect = mapRef.current.getBoundingClientRect()
            setTooltip((t) => ({
                ...t,
                x: e.clientX - rect.left + 14,
                y: e.clientY - rect.top - 65,
            }))
        }
    }

    const handleZoneLeave = () => {
        setActive(null)
        setTooltip((t) => ({ ...t, visible: false }))
    }

    /* Render marquee items twice for seamless loop */
    const renderMarqueeItems = () =>
        marqueeAreas.map((area, i) => (
            <span className="marquee-item" key={i}>
                {area}
                <span className="marquee-dot">•</span>
            </span>
        ))

    return (
        <section className="zones" id="zonas" ref={sectionRef}>
            <div className="container">
                <div className="zones-layout">
                    {/* ---- Left content ---- */}
                    <div className="zones-content">
                        <div className="zones-label">Cobertura</div>
                        <h2 className="zones-title">
                            Toda la <em>zona metro</em><br />
                            al alcance
                        </h2>
                        <p className="zones-desc">
                            {zona
                                ? `Cubrimos ${zona} y toda la zona metropolitana. Recolección y entrega sin costo adicional en todas las zonas marcadas.`
                                : 'Cubrimos Ciudad de México y los principales municipios del Estado de México. Recolección y entrega sin costo adicional en todas las zonas marcadas.'
                            }
                        </p>

                        <div className="zones-stats">
                            <div>
                                <span className="zones-stat-value">15+</span>
                                <span className="zones-stat-label">Zonas</span>
                            </div>
                            <div>
                                <span className="zones-stat-value">$0</span>
                                <span className="zones-stat-label">Envío</span>
                            </div>
                            <div>
                                <span className="zones-stat-value">48h</span>
                                <span className="zones-stat-label">Respuesta</span>
                            </div>
                        </div>

                        <a
                            href={whatsappUrl || 'https://wa.me/5215568578613?text=SW-%20Hola%2C%20quiero%20saber%20si%20cubren%20mi%20zona'}
                            className="zones-cta"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Consultar mi zona
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                    </div>

                    {/* ---- Right: SVG Map ---- */}
                    <div className="zones-map-container" ref={mapRef}>
                        <svg
                            className="zones-map"
                            viewBox="0 0 410 370"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Grid dots for atmosphere */}
                            {Array.from({ length: 24 }, (_, row) =>
                                Array.from({ length: 26 }, (_, col) => (
                                    <circle
                                        key={`${row}-${col}`}
                                        cx={col * 16 + 4}
                                        cy={row * 16 + 4}
                                        r="0.5"
                                        fill="rgba(255,255,255,0.04)"
                                    />
                                ))
                            )}

                            {/* Zone shapes */}
                            {zones.map((zone) => (
                                <g
                                    className="zone-group"
                                    key={zone.id}
                                    onMouseEnter={(e) => handleZoneEnter(zone, e)}
                                    onMouseMove={handleZoneMove}
                                    onMouseLeave={handleZoneLeave}
                                >
                                    <path
                                        className={`zone-path ${zone.id === 'edomex-oriente' ? 'zone-edomex-oriente' : zone.id.startsWith('cdmx') ? 'zone-cdmx' : 'zone-edomex'}${active?.id === zone.id ? ' active' : ''}`}
                                        d={zonePaths[zone.id]}
                                    />
                                    <circle className="zone-dot" cx={zone.cx} cy={zone.cy} r="2.5" />
                                    <text className="zone-label" x={zone.cx} y={zone.cy + 4}>
                                        {zone.id.startsWith('edomex')
                                            ? (zone.id === 'edomex-poniente' ? 'Satélite' : 'Oriente')
                                            : zone.name.split(' ')[0]}
                                    </text>
                                </g>
                            ))}

                        </svg>

                        {/* Legend */}
                        <div className="zones-legend">
                            <div className="zones-legend-item">
                                <span className="zones-legend-swatch zones-legend-cdmx"></span>
                                <span>Ciudad de México</span>
                            </div>
                            <div className="zones-legend-item">
                                <span className="zones-legend-swatch zones-legend-edomex"></span>
                                <span>Estado de México</span>
                            </div>
                            <div className="zones-legend-item">
                                <span className="zones-legend-swatch zones-legend-oriente"></span>
                                <span>Fuera de cobertura</span>
                            </div>
                        </div>

                        {/* Tooltip */}
                        <div
                            className={`zones-tooltip${tooltip.visible ? ' visible' : ''}`}
                            style={{ left: tooltip.x, top: tooltip.y }}
                        >
                            {active && (
                                <>
                                    <div className="zones-tooltip-title">{active.name}</div>
                                    <div className="zones-tooltip-areas">{active.areas}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ---- Marquee carousel ---- */}
            <div className="zones-marquee-wrap">
                <div className="zones-marquee">
                    <div className="zones-marquee-track">
                        {renderMarqueeItems()}
                        {renderMarqueeItems()}
                    </div>
                </div>
            </div>
        </section>
    )
}
