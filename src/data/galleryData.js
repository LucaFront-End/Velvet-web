/* ══════════════════════════════════════════════
   Gallery Data — 100% dynamic from Wix CMS
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
    if (wixUrl.startsWith('http')) return wixUrl

    const match = wixUrl.match(/wix:image:\/\/v1\/([^/]+)/)
    if (!match) return ''

    return `https://static.wixstatic.com/media/${match[1]}`
}

function mapCmsItem(item, index) {
    return {
        id: `cms-${item._id || index}`,
        cat: (item.categoria || item.categora || '').toLowerCase().trim() || '',
        src: wixImageToUrl(item.image || item.imagen),
        title: item.title || '',
        fabric: item.tela || '',
        cotizarUrl: item.enlaceDeBotonDeCotizar || item.enlaceDeBottonDeCotizar || '',
    }
}

// ── Cache ──
let _cache = null
let _cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000

/**
 * Fetch gallery items from Wix CMS.
 * Returns only CMS items — no placeholders.
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

        const items = response.items
            .map(mapCmsItem)
            .filter((item) => item.src) // skip items without images

        _cache = items
        _cacheTime = now
        return items
    } catch (err) {
        console.warn('[CMS] Gallery fetch failed:', err.message)
    }

    // Return empty if CMS fails — no placeholders
    _cache = []
    _cacheTime = now
    return []
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
