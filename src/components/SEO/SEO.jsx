import { Helmet } from 'react-helmet-async'

/* ══════════════════════════════════════════════
   SEO Component — Dynamic page-level meta tags
   Usage: <SEO title="Page Title" description="..." />
   ══════════════════════════════════════════════ */

const SITE_NAME = 'Velvet Tapicería'
const BASE_URL = 'https://www.tapiceriavelvet.com'
const DEFAULT_DESCRIPTION =
    'Velvet Tapicería: expertos en tapizado de muebles, tapicería de salas y retapizados personalizados. Tapicero a domicilio en CDMX y Estado de México.'

export default function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    path = '',
    image,
    type = 'website',
}) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Tapizado de Muebles y Tapicero a Domicilio en CDMX y Edomex`
    const url = `${BASE_URL}${path}`

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="es_MX" />
            {image && <meta property="og:image" content={image} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
        </Helmet>
    )
}
