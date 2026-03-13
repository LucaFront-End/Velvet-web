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
                rawTitle="Velvet Tapicería en CDMX | Tapicería de Muebles y Tapicero a Domicilio"
                path="/home-v2"
                description="¿Buscas tapicería cerca de mi? En Velvet Tapicería en CDMX retapizamos sillones, salas y sillas. Tapicería de muebles cerca de tu ubicación y tapicero a domicilio."
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
