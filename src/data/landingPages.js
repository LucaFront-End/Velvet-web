/* ══════════════════════════════════════════════
   Landing Pages — Dynamic CMS fetch + fallback
   Fetches from Wix CMS collection at runtime.
   Falls back to hardcoded data if API unavailable.
   ══════════════════════════════════════════════ */

import wixClient from '../lib/wixClient'

// ── Collection name in Wix CMS ──
const COLLECTION_ID = 'CMSInicioDinamico'

// ── Field mapping: Wix camelCase keys → our model ──
function mapCmsItem(item) {
    return {
        id: item._id || '',
        title: item.title || '',
        zona: item.zona || '',
        excerpt: item.excerpt || '',
        seoTitle: item.tituloDeSeo || '',
        metaDescription: item.metadescripcin || item.metadescripcion || '',
        whatsappUrl: item.urlDeWhatsapp || '',
        slug: item.slug || slugify(item.title || ''),
    }
}

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// ── Fallback data (from CSV export) ──
const FALLBACK_DATA = [
    {
        id: '1841c545-69fd-4861-a822-02909ed042ea',
        title: 'Tapicería de salas en Huixquilucan',
        zona: 'Huixquilucan',
        excerpt: 'Transformamos tu sala con diseño, materiales de calidad y asesoría profesional para renovar tu espacio con estilo y armonía.',
        seoTitle: 'Tapicería de Salas en Huixquilucan | Tapicero a Domicilio CDMX',
        metaDescription: '¿Buscas tapicería de salas en Huixquilucan? En Velvet Tapicería ofrecemos tapizado de salas, tapicería de muebles y tapicero a domicilio en CDMX y Estado de México.',
        whatsappUrl: 'https://wa.me/525568578613?text=SW2-%20Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tapicer%C3%ADa%20de%20salas%20en%20Huixquilucan%2C%20%C2%BFme%20pueden%20compartir%20informaci%C3%B3n%20y%20cotizaci%C3%B3n%3F',
        slug: 'tapiceria-de-salas-en-huixquilucan',
    },
]

// ── Cache ──
let _cache = null
let _cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Fetch all landing pages from Wix CMS.
 * Returns cached data if available and fresh.
 * Falls back to hardcoded data on error.
 */
export async function fetchLandingPages() {
    const now = Date.now()
    if (_cache && (now - _cacheTime) < CACHE_TTL) {
        return _cache
    }

    try {
        if (!wixClient) throw new Error('Wix client not configured')

        const response = await wixClient.items
            .query(COLLECTION_ID)
            .find()

        const pages = response.items
            .map(mapCmsItem)
            .filter((p) => p.slug) // skip entries without a slug

        if (pages.length > 0) {
            _cache = pages
            _cacheTime = now
            return pages
        }
    } catch (err) {
        console.warn('[CMS] Failed to fetch landing pages, using fallback:', err.message)
    }

    // Fallback
    _cache = FALLBACK_DATA
    _cacheTime = now
    return FALLBACK_DATA
}

/**
 * Fetch a single landing page by slug.
 */
export async function getLandingBySlug(slug) {
    const pages = await fetchLandingPages()
    return pages.find((p) => p.slug === slug) || null
}
