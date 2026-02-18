import { Link } from 'react-router-dom'
import './Footer.css'

const seoKeywords = [
    'tapicería cerca de mí',
    'tapizado de muebles',
    'tapicería de salas',
    'tapicero a domicilio',
    'tela para tapizar',
    'retapizado CDMX',
    'tapicería Estado de México',
    'retapizado de sillas',
    'tapicería automotriz',
    'telas para muebles',
    'tapicería a domicilio',
    'restauración de muebles',
    'tapizado personalizado',
    'muebles retapizados',
]

const navLinks = [
    { label: 'Inicio', to: '/' },
    { label: 'Servicios', to: '/servicios' },
    { label: 'Galería', to: '/galeria' },
    { label: 'Nosotros', to: '/nosotros' },
    { label: 'Contacto', to: '/contacto' },
    { label: 'Estatus de Pedido', to: '/dashboard' },
]

const serviceLinks = [
    { label: 'Tapizado de Salas', to: '/servicios/salas' },
    { label: 'Tapizado de Sillas', to: '/servicios/sillas' },
    { label: 'Tapizado de Cabeceras', to: '/servicios/cabeceras' },
    { label: 'Tapicería Automotriz', to: '/servicios/automotriz' },
    { label: 'Catálogo de Telas', to: '/servicios/telas' },
]

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const whatsappUrl = 'https://wa.me/5215568578613?text=Hola%20Velvet%20Tapicería,%20me%20gustaría%20cotizar%20un%20retapizado.'

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-brand-logo">
                            Velvet
                            <span className="footer-brand-dot" />
                        </div>
                        <p className="footer-brand-text">
                            Expertos en tapizado de muebles y retapizados personalizados.
                            Transformamos tus espacios con materiales premium y atención a domicilio
                            en Ciudad de México y Estado de México.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-whatsapp"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            55 6857 8613
                        </a>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="footer-heading">Navegación</h4>
                        <nav className="footer-links">
                            {navLinks.map((link) => (
                                <Link key={link.to} to={link.to} className="footer-link">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="footer-heading">Servicios</h4>
                        <nav className="footer-links">
                            {serviceLinks.map((link) => (
                                <Link key={link.to} to={link.to} className="footer-link">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* SEO Keyword Cloud */}
                <div className="footer-keywords">
                    <div className="footer-keywords-cloud">
                        {seoKeywords.map((keyword) => (
                            <span key={keyword} className="footer-keyword">
                                {keyword}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer-bottom">
                    <span>© {currentYear} Velvet Tapicería. Todos los derechos reservados.</span>
                    <span>CDMX & Estado de México</span>
                </div>
            </div>
        </footer>
    )
}
