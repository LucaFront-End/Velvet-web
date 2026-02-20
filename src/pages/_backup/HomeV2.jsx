import HeroV2 from '../components/Hero/HeroV2'
import ServicesBento from '../components/ServicesBento/ServicesBento'
import Domicilio from '../components/Domicilio/Domicilio'
import Zones from '../components/Zones/Zones'
import Benefits from '../components/Benefits/Benefits'
import BeforeAfter from '../components/BeforeAfter/BeforeAfter'
import Testimonials from '../components/Testimonials/Testimonials'
import FAQ from '../components/FAQ/FAQ'
import FinalCTA from '../components/FinalCTA/FinalCTA'
import SEO from '../components/SEO/SEO'

export default function HomeV2() {
    return (
        <>
            <SEO
                path="/home-v2"
                description="Velvet Tapicería: expertos en tapizado de muebles, tapicería de salas y retapizados personalizados. Tapicero a domicilio en CDMX y Estado de México. Telas premium y garantía."
            />
            <HeroV2 />
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
