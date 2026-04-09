/* ══════════════════════════════════════════════
   Landing Pages — Dynamic zone-specific pages
   Data from CMS CSV (CMS+Inicio+Dinámico.csv)
   ══════════════════════════════════════════════ */

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

const landingPages = [
    {
        id: '1841c545-69fd-4861-a822-02909ed042ea',
        title: 'Tapicería de salas en Huixquilucan',
        zona: 'Huixquilucan',
        excerpt: 'Transformamos tu sala con diseño, materiales de calidad y asesoría profesional para renovar tu espacio con estilo y armonía.',
        seoTitle: 'Tapicería de Salas en Huixquilucan | Tapicero a Domicilio CDMX',
        metaDescription: '¿Buscas tapicería de salas en Huixquilucan? En Velvet Tapicería ofrecemos tapizado de salas, tapicería de muebles y tapicero a domicilio en CDMX y Estado de México.',
        whatsappUrl: 'https://wa.me/525568578613?text=SW2-%20Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tapicer%C3%ADa%20de%20salas%20en%20Huixquilucan%2C%20%C2%BFme%20pueden%20compartir%20informaci%C3%B3n%20y%20cotizaci%C3%B3n%3F',
    },
]

// Auto-generate slug for each page
landingPages.forEach((page) => {
    page.slug = slugify(page.title)
})

export default landingPages

export function getLandingBySlug(slug) {
    return landingPages.find((p) => p.slug === slug)
}
