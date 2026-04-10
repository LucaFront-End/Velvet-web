/* ══════════════════════════════════════════════
   Gallery Data — Fetches from Wix CMS + fallback
   Collection: CMSGaleria
   ══════════════════════════════════════════════ */

import wixClient from '../lib/wixClient'

const COLLECTION_ID = 'CMSGaleria'

/**
 * Convert Wix image URL to a public CDN URL.
 * Wix format: wix:image://v1/<media_id>/<filename>#originWidth=W&originHeight=H
 * Public URL:  https://static.wixstatic.com/media/<media_id>
 */
function wixImageToUrl(wixUrl) {
    if (!wixUrl) return ''
    // Already a normal URL
    if (wixUrl.startsWith('http')) return wixUrl

    // Extract the media ID from wix:image://v1/<mediaId>/<filename>#...
    const match = wixUrl.match(/wix:image:\/\/v1\/([^/]+)/)
    if (!match) return ''

    const mediaId = match[1]
    return `https://static.wixstatic.com/media/${mediaId}`
}

function mapCmsItem(item, index) {
    return {
        id: `cms-${item._id || index}`,
        cat: (item.categoria || item.categora || '').toLowerCase().trim() || 'otros',
        src: wixImageToUrl(item.image || item.imagen),
        title: item.title || '',
        fabric: item.tela || '',
        cotizarUrl: item.enlaceDeBotonDeCotizar || item.enlaceDeBottonDeCotizar || '',
        _fromCms: true,
    }
}

// ── Fallback data (current hardcoded gallery) ──
const FALLBACK_GALLERY = [
    { id: 1, cat: 'salas', src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', title: 'Sala terciopelo esmeralda', fabric: 'Terciopelo' },
    { id: 2, cat: 'salas', src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Sofá tres cuerpos', fabric: 'Lino Natural' },
    { id: 3, cat: 'salas', src: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80', title: 'Sillón capitoneado', fabric: 'Piel Sintética' },
    { id: 4, cat: 'salas', src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80', title: 'Sala modular gris', fabric: 'Chenille' },
    { id: 5, cat: 'salas', src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', title: 'Sala familiar renovada', fabric: 'Antimanchas' },
    { id: 6, cat: 'salas', src: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80', title: 'Sofá curvo moderno', fabric: 'Terciopelo Azul' },
    { id: 7, cat: 'sillas', src: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80', title: 'Sillas comedor clásicas', fabric: 'Lino' },
    { id: 8, cat: 'sillas', src: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80', title: 'Silla accent moderna', fabric: 'Microfibra' },
    { id: 9, cat: 'sillas', src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80', title: 'Sillas tapizadas lino', fabric: 'Lino Natural' },
    { id: 10, cat: 'sillas', src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', title: 'Banco restaurado', fabric: 'Vinipiel' },
    { id: 11, cat: 'sillas', src: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&q=80', title: 'Silla de oficina premium', fabric: 'Piel Sintética' },
    { id: 12, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80', title: 'Cabecera capitoneada blanca', fabric: 'Terciopelo' },
    { id: 13, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&q=80', title: 'Cabecera king terciopelo', fabric: 'Terciopelo Rosa' },
    { id: 14, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1617806501553-e8dfb8306aba?w=800&q=80', title: 'Cabecera panel madera', fabric: 'Suede' },
    { id: 15, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', title: 'Recámara completa', fabric: 'Lino' },
    { id: 16, cat: 'cabeceras', src: 'https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&q=80', title: 'Cabecera bastones tela', fabric: 'Bouclé' },
]

// ── Cache ──
let _cache = null
let _cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000

/**
 * Fetch gallery items from Wix CMS.
 * CMS items appear FIRST, then fallback items fill in.
 * If CMS is unavailable, returns only fallback data.
 */
export async function fetchGalleryItems() {
    const now = Date.now()
    if (_cache && (now - _cacheTime) < CACHE_TTL) {
        return _cache
    }

    try {
        if (!wixClient) throw new Error('Wix client not configured')

        const response = await wixClient.items
            .query(COLLECTION_ID)
            .limit(100)
            .find()

        const cmsItems = response.items
            .map(mapCmsItem)
            .filter((item) => item.src) // skip items without images

        if (cmsItems.length > 0) {
            // CMS items first, then fallback for variety
            const combined = [...cmsItems, ...FALLBACK_GALLERY]
            _cache = combined
            _cacheTime = now
            return combined
        }
    } catch (err) {
        console.warn('[CMS] Gallery fetch failed, using fallback:', err.message)
    }

    _cache = FALLBACK_GALLERY
    _cacheTime = now
    return FALLBACK_GALLERY
}

/**
 * Extract unique categories from gallery items.
 * Returns array of { key, label } objects.
 */
export function buildCategories(items) {
    const catSet = new Set()
    items.forEach((item) => {
        if (item.cat) catSet.add(item.cat)
    })

    const cats = [{ key: 'todo', label: 'Todo' }]
    catSet.forEach((cat) => {
        cats.push({
            key: cat,
            label: cat.charAt(0).toUpperCase() + cat.slice(1),
        })
    })
    return cats
}
