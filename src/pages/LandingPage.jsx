import { useParams, Navigate } from 'react-router-dom'
import { getLandingBySlug } from '../data/landingPages'

import Hero from '../components/Hero/HeroV3'
import ServicesBento from '../components/ServicesBento/ServicesBento'
import Domicilio from '../components/Domicilio/Domicilio'
import Zones from '../components/Zones/Zones'
import Benefits from '../components/Benefits/Benefits'
import BeforeAfter from '../components/BeforeAfter/BeforeAfter'
import Testimonials from '../components/Testimonials/Testimonials'
import FAQ from '../components/FAQ/FAQ'
import FinalCTA from '../components/FinalCTA/FinalCTA'
import SEO from '../components/SEO/SEO'

/* ══════════════════════════════════════════════
   LANDING PAGE — Dynamic zone-specific homepage
   Same layout as Home, but with CMS-driven
   title, excerpt, SEO, and WhatsApp link
   ══════════════════════════════════════════════ */

export default function LandingPage() {
    const { slug } = useParams()
    const page = getLandingBySlug(slug)

    if (!page) return <Navigate to="/" replace />

    return (
        <>
            <SEO
                rawTitle={page.seoTitle}
                path={`/${page.slug}`}
                description={page.metaDescription}
            />
            <Hero
                preTitle={`Tapicería en ${page.zona}`}
                subtitle={page.excerpt}
            />
            <ServicesBento />
            <Domicilio
                whatsappUrl={page.whatsappUrl}
            />
            <Zones />
            <Benefits />
            <BeforeAfter />
            <Testimonials />
            <FAQ />
            <FinalCTA
                whatsappUrl={page.whatsappUrl}
                title={<>¿Quieres renovar tus muebles en <em>{page.zona}</em>?</>}
                desc={`Cotiza gratis en minutos. Tapicería de muebles a domicilio en ${page.zona}. Envíanos fotos por WhatsApp y recibe tu presupuesto sin compromiso.`}
            />
        </>
    )
}
