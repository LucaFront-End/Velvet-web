/* ══════════════════════════════════════════════
   Vercel Serverless — Sitemap Index + Sub-Sitemaps
   Generates a sitemap index linking to three
   sub-sitemaps, each grouping URLs by collection:
     /sitemap.xml          → Sitemap Index
     /pages-sitemap.xml    → Static pages
     /services-sitemap.xml → Service pages
     /landings-sitemap.xml → Dynamic CMS landing pages
   ══════════════════════════════════════════════ */

import { createClient, OAuthStrategy } from '@wix/sdk'
import { items } from '@wix/data'

const DOMAIN = 'https://www.tapiceriavelvet.com'
const WIX_CLIENT_ID = process.env.VITE_WIX_CLIENT_ID

// ── Static pages ──
const PAGES = [
    { path: '/',          changefreq: 'weekly',  priority: '1.0' },
    { path: '/servicios', changefreq: 'monthly', priority: '0.9' },
    { path: '/galeria',   changefreq: 'weekly',  priority: '0.8' },
    { path: '/contacto',  changefreq: 'monthly', priority: '0.7' },
    { path: '/nosotros',  changefreq: 'monthly', priority: '0.7' },
    { path: '/zonas',     changefreq: 'monthly', priority: '0.6' },
]

// ── Service pages ──
const SERVICES = [
    { path: '/servicios/salas',     changefreq: 'monthly', priority: '0.8' },
    { path: '/servicios/sillas',    changefreq: 'monthly', priority: '0.8' },
    { path: '/servicios/cabeceras', changefreq: 'monthly', priority: '0.8' },
    { path: '/servicios/telas',     changefreq: 'monthly', priority: '0.8' },
]

// ── Fallback landing slugs ──
const FALLBACK_SLUGS = [
    'tapiceria-de-salas-en-huixquilucan',
]

// ── CMS cache ──
let _cache = null
let _cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000

async function fetchLandingSlugs() {
    const now = Date.now()
    if (_cache && (now - _cacheTime) < CACHE_TTL) return _cache

    try {
        if (!WIX_CLIENT_ID) throw new Error('No WIX_CLIENT_ID')

        const client = createClient({
            modules: { items },
            auth: OAuthStrategy({ clientId: WIX_CLIENT_ID }),
        })

        const response = await client.items
            .query('CMSInicioDinamico')
            .find()

        const slugs = response.items
            .map((item) => item.slug || slugify(item.title || ''))
            .filter(Boolean)

        if (slugs.length > 0) {
            _cache = slugs
            _cacheTime = now
            return slugs
        }
    } catch (err) {
        console.warn('[Sitemap] CMS fetch failed, using fallback:', err.message)
    }

    _cache = FALLBACK_SLUGS
    _cacheTime = now
    return FALLBACK_SLUGS
}

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

// ── XML helpers ──
const today = () => new Date().toISOString().split('T')[0]

function buildUrl(path, changefreq, priority) {
    return `  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${today()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function wrapUrlset(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`
}

function buildSitemapIndex() {
    const sitemaps = [
        'pages-sitemap.xml',
        'services-sitemap.xml',
        'landings-sitemap.xml',
    ]
    const entries = sitemaps.map((name) =>
        `  <sitemap>
    <loc>${DOMAIN}/${name}</loc>
    <lastmod>${today()}</lastmod>
  </sitemap>`
    )
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</sitemapindex>`
}

// ── Handler ──
export default async function handler(req, res) {
    const url = new URL(req.url, `https://${req.headers.host}`)
    const pathname = url.pathname

    let xml

    if (pathname === '/pages-sitemap.xml') {
        // Static pages sub-sitemap
        const urls = PAGES.map((r) => buildUrl(r.path, r.changefreq, r.priority))
        xml = wrapUrlset(urls)

    } else if (pathname === '/services-sitemap.xml') {
        // Services sub-sitemap
        const urls = SERVICES.map((r) => buildUrl(r.path, r.changefreq, r.priority))
        xml = wrapUrlset(urls)

    } else if (pathname === '/landings-sitemap.xml') {
        // Dynamic landing pages sub-sitemap (from Wix CMS)
        const slugs = await fetchLandingSlugs()
        const urls = slugs.map((slug) => buildUrl(`/${slug}`, 'monthly', '0.7'))
        xml = wrapUrlset(urls)

    } else {
        // Default: Sitemap Index
        xml = buildSitemapIndex()
    }

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600')
    res.status(200).send(xml)
}
