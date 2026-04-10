import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getLandingBySlug } from '../data/landingPages'
import { useWhatsAppContext } from '../App'

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
   Fetches data from Wix CMS by slug.
   Same layout as Home, but with CMS-driven
   title, excerpt, SEO, WhatsApp link, and
   floating WhatsApp button per landing.
   ══════════════════════════════════════════════ */

export default function LandingPage() {
    const { slug } = useParams()
    const [page, setPage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const { setWhatsappUrl } = useWhatsAppContext()

    useEffect(() => {
        let cancelled = false

        async function load() {
            setLoading(true)
            setNotFound(false)

            const data = await getLandingBySlug(slug)

            if (cancelled) return

            if (!data) {
                setNotFound(true)
            } else {
                setPage(data)
                // Set the floating WhatsApp button URL for this landing
                if (data.whatsappUrl) {
                    setWhatsappUrl(data.whatsappUrl)
                }
            }
            setLoading(false)
        }

        load()
        return () => {
            cancelled = true
            // Reset the floating WhatsApp button when leaving the landing
            setWhatsappUrl(null)
        }
    }, [slug, setWhatsappUrl])

    // Redirect to home if page not found
    if (notFound) return <Navigate to="/" replace />

    // Loading skeleton
    if (loading || !page) {
        return (
            <div className="landing-loading" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-bg, #0a0a0a)',
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
        )
    }

    return (
        <>
            <SEO
                rawTitle={page.seoTitle}
                path={`/${page.slug}`}
                description={page.metaDescription}
            />
            <Hero
                preTitle={page.title || `Tapicería en ${page.zona}`}
                subtitle={page.excerpt}
                whatsappUrl={page.whatsappUrl}
            />
            <ServicesBento zona={page.zona} />
            <Domicilio
                whatsappUrl={page.whatsappUrl}
                zona={page.zona}
            />
            <Zones zona={page.zona} whatsappUrl={page.whatsappUrl} />
            <Benefits zona={page.zona} />
            <BeforeAfter />
            <Testimonials />
            <FAQ zona={page.zona} />
            <FinalCTA
                whatsappUrl={page.whatsappUrl}
                title={<>¿Quieres renovar tus muebles en <em>{page.zona}</em>?</>}
                desc={`Cotiza gratis en minutos. Tapicería de muebles a domicilio en ${page.zona}. Envíanos fotos por WhatsApp y recibe tu presupuesto sin compromiso.`}
            />
        </>
    )
}
