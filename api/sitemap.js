/* ══════════════════════════════════════════════
   Vercel Serverless Function — Dynamic Sitemap
   Fetches landing pages from Wix CMS and returns
   an always-fresh sitemap.xml with all routes.
   ══════════════════════════════════════════════ */

import { createClient, OAuthStrategy } from '@wix/sdk'
import { items } from '@wix/data'

const DOMAIN = 'https://www.tapiceriavelvet.com'
const WIX_CLIENT_ID = process.env.VITE_WIX_CLIENT_ID

// ── Static routes ──
const STATIC_ROUTES = [
    { path: '/',                    changefreq: 'weekly',  priority: '1.0' },
    { path: '/servicios',           changefreq: 'monthly', priority: '0.9' },
    { path: '/servicios/salas',     changefreq: 'monthly', priority: '0.8' },
    { path: '/servicios/sillas',    changefreq: 'monthly', priority: '0.8' },
    { path: '/servicios/cabeceras', changefreq: 'monthly', priority: '0.8' },
    { path: '/servicios/telas',     changefreq: 'monthly', priority: '0.8' },
    { path: '/galeria',             changefreq: 'weekly',  priority: '0.8' },
    { path: '/contacto',            changefreq: 'monthly', priority: '0.7' },
    { path: '/nosotros',            changefreq: 'monthly', priority: '0.7' },
]

// ── Fallback landing pages (used if CMS is unavailable) ──
const FALLBACK_SLUGS = [
    'tapiceria-de-salas-en-huixquilucan',
]

function buildUrl(path, changefreq, priority) {
    return `  <url>
    <loc>${DOMAIN}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export default async function handler(req, res) {
    let landingSlugs = [...FALLBACK_SLUGS]

    // Try to fetch fresh landing pages from Wix CMS
    try {
        if (WIX_CLIENT_ID) {
            const client = createClient({
                modules: { items },
                auth: OAuthStrategy({ clientId: WIX_CLIENT_ID }),
            })

            const response = await client.items
                .query('CMSInicioDinamico')
                .find()

            const cmsSlugs = response.items
                .map((item) => item.slug || slugify(item.title || ''))
                .filter(Boolean)

            if (cmsSlugs.length > 0) {
                landingSlugs = cmsSlugs
            }
        }
    } catch (err) {
        console.warn('[Sitemap] CMS fetch failed, using fallback:', err.message)
    }

    // Build XML
    const urls = [
        ...STATIC_ROUTES.map((r) => buildUrl(r.path, r.changefreq, r.priority)),
        ...landingSlugs.map((slug) => buildUrl(`/${slug}`, 'monthly', '0.8')),
    ]

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600')
    res.status(200).send(xml)
}

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}
