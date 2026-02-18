import Hero from '../components/Hero/Hero'
import ServicesBento from '../components/ServicesBento/ServicesBento'
import Domicilio from '../components/Domicilio/Domicilio'
import Zones from '../components/Zones/Zones'
import Benefits from '../components/Benefits/Benefits'
import BeforeAfter from '../components/BeforeAfter/BeforeAfter'
import Testimonials from '../components/Testimonials/Testimonials'
import FAQ from '../components/FAQ/FAQ'
import FinalCTA from '../components/FinalCTA/FinalCTA'
import SEO from '../components/SEO/SEO'

export default function Home() {
    return (
        <>
            <SEO
                path="/"
                description="Velvet Tapicería: expertos en tapizado de muebles, tapicería de salas y retapizados personalizados. Tapicero a domicilio en CDMX y Estado de México. Telas premium y garantía."
            />
            <Hero />
            <ServicesBento />
            <Domicilio />
            <Zones />
            <Benefits />
            <BeforeAfter />
            <Testimonials />
            <FAQ />
            <FinalCTA />
        </>
    )
}
