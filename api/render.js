/* ══════════════════════════════════════════════
   Vercel Serverless — Dynamic SEO Meta Injector
   Intercepts every page request, reads the raw
   index.html, and replaces <title> and <meta>
   tags with the correct per-page SEO data.
   This ensures crawlers (Google, social media)
   see the right metadata even for a client-side
   rendered SPA.
   ══════════════════════════════════════════════ */

import { createClient, OAuthStrategy } from '@wix/sdk'
import { items } from '@wix/data'
import { readFileSync } from 'fs'
import { join } from 'path'

const DOMAIN = 'https://www.tapiceriavelvet.com'
const WIX_CLIENT_ID = process.env.VITE_WIX_CLIENT_ID
const SITE_NAME = 'Velvet Tapicería'

// ── Static pages SEO data ──
const STATIC_SEO = {
    '/': {
        title: 'Velvet Tapicería en CDMX | Tapicería de Muebles y Tapicero a Domicilio',
        description: '¿Buscas tapicería cerca de mi? En Velvet Tapicería en CDMX retapizamos sillones, salas y sillas. Tapicería de muebles cerca de tu ubicación y tapicero a domicilio.',
    },
    '/nosotros': {
        title: 'Velvet Tapicería en CDMX | Expertos en Tapicería de Muebles',
        description: 'En Velvet Tapicería contamos con tapiceros expertos y asesoría de diseñador de interiores para elegir la mejor tela para tapizar sillones, salas y sillas.',
    },
    '/contacto': {
        title: 'Contacto Velvet Tapicería | Tapicería Cerca de Mi en CDMX',
        description: 'Contáctanos para cotizar tu proyecto de tapicería. Tapicero a domicilio en CDMX y Estado de México. Envía fotos por WhatsApp y recibe presupuesto gratis.',
    },
    '/galeria': {
        title: 'Trabajos de Tapicería en CDMX | Tapizado de Sillones, Salas y Sillas',
        description: 'Galería de proyectos de tapicería realizados por Velvet Tapicería. Retapizado de salas, sillones, sillas de comedor y cabeceras en CDMX y Estado de México.',
    },
    '/servicios': {
        title: 'Servicios de Tapicería en CDMX | Tapizado de Muebles, Sillones y Salas',
        description: 'Servicios profesionales de tapicería: retapizado de salas, sillones, sillas de comedor y cabeceras. Tapicero a domicilio en CDMX y Estado de México.',
    },
    '/servicios/salas': {
        title: 'Tapizado de Salas en CDMX | Retapizado Profesional | Tapicería Velvet',
        description: 'Servicio profesional de tapizado de salas en CDMX. Retapizamos tu sala con telas premium, espuma de alta densidad y acabados de calidad.',
    },
    '/servicios/sillas': {
        title: 'Retapizado de Sillas en CDMX | Tapicería de Sillas de Comedor | Tapicería Velvet',
        description: 'Retapizado profesional de sillas de comedor en CDMX. Renovamos asiento y respaldo con telas resistentes al uso diario.',
    },
    '/servicios/cabeceras': {
        title: 'Cabeceras Tapizadas en CDMX | Diseño a Medida | Tapicería Velvet',
        description: 'Cabeceras tapizadas a medida en CDMX. Diseños capitonados, lisos o con marcos de madera. Fabricación e instalación profesional.',
    },
    '/servicios/telas': {
        title: 'Catálogo de Telas para Tapizar en CDMX | Tapicería Velvet',
        description: 'Más de 200 opciones de telas para tapizar: lino, terciopelo, piel sintética y telas Pet Friendly. Catálogo premium en CDMX.',
    },
    '/zonas': {
        title: 'Zonas de Servicio de Tapicería en CDMX y Edomex | Tapicería Velvet',
        description: 'Servicio de tapicería a domicilio en todas las zonas de CDMX y Estado de México. Encuentra la zona más cercana y cotiza gratis.',
    },
}

// ── CMS cache ──
let _cmsCache = null
let _cmsCacheTime = 0
const CMS_CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// ── HTML template cache ──
let _htmlCache = null

async function fetchCmsPages() {
    const now = Date.now()
    if (_cmsCache && (now - _cmsCacheTime) < CMS_CACHE_TTL) {
        return _cmsCache
    }

    try {
        if (!WIX_CLIENT_ID) throw new Error('No WIX_CLIENT_ID')

        const client = createClient({
            modules: { items },
            auth: OAuthStrategy({ clientId: WIX_CLIENT_ID }),
        })

        const response = await client.items
            .query('CMSInicioDinamico')
            .find()

        const pages = {}
        for (const item of response.items) {
            const slug = item.slug || slugify(item.title || '')
            if (!slug) continue

            pages[`/${slug}`] = {
                title: item.tituloDeSeo || `${item.title} | ${SITE_NAME}`,
                description: item.metadescripcin || item.metadescripcion || '',
            }
        }

        if (Object.keys(pages).length > 0) {
            _cmsCache = pages
            _cmsCacheTime = now
            return pages
        }
    } catch (err) {
        console.warn('[SEO Render] CMS fetch failed:', err.message)
    }

    return _cmsCache || {}
}

function slugify(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
    const url = new URL(req.url, `https://${req.headers.host}`)
    let pathname = url.pathname

    // Normalize: remove trailing slash (except root)
    if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1)
    }

    // Skip non-HTML requests (assets, API, etc.)
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/assets/') ||
        pathname.startsWith('/images/') ||
        pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|map|json|txt|xml)$/)
    ) {
        res.statusCode = 404
        res.end()
        return
    }

    // Read the built index.html (cached after first read)
    if (!_htmlCache) {
        const possiblePaths = [
            join(process.cwd(), 'dist', 'index.html'),
            join(process.cwd(), '.output', 'static', 'index.html'),
            join(process.cwd(), 'index.html'),
        ]
        for (const p of possiblePaths) {
            try {
                _htmlCache = readFileSync(p, 'utf-8')
                break
            } catch { /* try next */ }
        }
        if (!_htmlCache) {
            res.statusCode = 500
            res.end('Internal Server Error — index.html not found')
            return
        }
    }
    let html = _htmlCache

    // Get SEO data
    let seo = STATIC_SEO[pathname]

    // If not a known static page, try CMS
    if (!seo) {
        const cmsPages = await fetchCmsPages()
        seo = cmsPages[pathname]
    }

    // ── Always inject canonical URL for every HTML route ──
    const canonicalUrl = `${DOMAIN}${pathname}`
    if (html.includes('<link rel="canonical"')) {
        html = html.replace(
            /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
            `<link rel="canonical" href="${canonicalUrl}" />`
        )
    } else {
        html = html.replace(
            '</head>',
            `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`
        )
    }

    // ── Inject SEO meta if we have data for this route ──
    if (seo) {
        const safeTitle = escapeHtml(seo.title)
        const safeDesc = escapeHtml(seo.description)

        // Replace <title>
        html = html.replace(
            /<title>[^<]*<\/title>/,
            `<title>${safeTitle}</title>`
        )

        // Replace meta description
        html = html.replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${safeDesc}" />`
        )

        // Replace OG title
        html = html.replace(
            /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:title" content="${safeTitle}" />`
        )

        // Replace OG description
        html = html.replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:description" content="${safeDesc}" />`
        )

        // Replace OG url
        html = html.replace(
            /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
            `<meta property="og:url" content="${canonicalUrl}" />`
        )
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600')
    res.status(200).send(html)
}
