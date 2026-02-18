import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Galería', to: '/galeria' },
    { label: 'Nosotros', to: '/nosotros' },
    { label: 'Contacto', to: '/contacto' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const closeMenu = () => setMenuOpen(false)

    return (
        <>
            <header
                className={`header ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}
            >
                <div className="header-inner">
                    {/* Logo */}
                    <Link to="/" className="header-logo" onClick={closeMenu}>
                        <span className="header-logo-text">
                            Velvet
                            <span className="header-logo-dot" />
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="header-nav" aria-label="Navegación principal">
                        <ul className="header-nav-list">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="header-nav-link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Actions: Phone + CTA + Burger */}
                    <div className="header-actions">
                        <a href="tel:+525568578613" className="header-phone">
                            <svg className="header-phone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span>55 6857 8613</span>
                        </a>

                        <Link to="/contacto" className="btn btn-primary header-cta">
                            Cotizar Ahora
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className={`header-burger ${menuOpen ? 'active' : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Menú"
                            aria-expanded={menuOpen}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile fullscreen menu — sibling of header, NOT a child */}
            {menuOpen && (
                <div className="mobile-menu-overlay" onClick={closeMenu}>
                    <nav
                        className="mobile-menu-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="mobile-menu-link"
                                style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="mobile-menu-divider" />

                        <a
                            href="tel:+525568578613"
                            className="mobile-menu-phone"
                            style={{ animationDelay: '0.4s' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            55 6857 8613
                        </a>

                        <Link
                            to="/contacto"
                            className="btn btn-primary mobile-menu-cta"
                            style={{ animationDelay: '0.5s' }}
                            onClick={closeMenu}
                        >
                            Cotizar Ahora
                        </Link>
                    </nav>
                </div>
            )}
        </>
    )
}
