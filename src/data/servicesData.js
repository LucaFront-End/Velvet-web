/* ============================================
   SERVICES DATA — Centralized service info
   Used by: ServicesBento (Home), ServicePage
   ============================================ */

import sillasHeroImg from '../assets/sillas-hero.jpg'

const services = [
    {
        slug: 'salas',
        title: 'Tapicería de Salas',
        tagline: 'Tu sala, completamente renovada',
        tag: 'Más popular',
        description:
            'Transformamos completamente tu sala con telas premium — lino, terciopelo, piel sintética. Recogemos y entregamos a domicilio.',
        longDescription:
            'Tu sala es el centro de tu hogar. Con el tiempo, el desgaste de las telas, las manchas y los cambios de estilo hacen que necesite una renovación. En Velvet Tapicería nos especializamos en devolver la vida a tu sala con materiales de la más alta calidad. Trabajamos con una amplia variedad de telas: desde terciopelo italiano hasta piel sintética de última generación, pasando por linos naturales y telas antimanchas ideales para hogares con mascotas o niños. Nuestro proceso incluye el desarmado completo del mueble, cambio de espuma si es necesario, y un retapizado impecable que hará que tu sala se vea como nueva — o mejor.',
        heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
        features: [
            'Recolección y entrega a domicilio sin costo',
            'Más de 200 telas premium disponibles',
            'Cambio de espuma y relleno incluido',
            'Garantía de 1 año en acabados',
            'Presupuesto en menos de 5 minutos',
            'Cobertura en CDMX y Estado de México',
        ],
        process: [
            { num: '01', title: 'Envía fotos', desc: 'Mándanos fotos por WhatsApp o formulario para cotizar.' },
            { num: '02', title: 'Elige tu tela', desc: 'Te llevamos muestras a domicilio para que elijas la ideal.' },
            { num: '03', title: 'Retapizado', desc: 'Recogemos tu sala y nuestro equipo la transforma.' },
            { num: '04', title: 'Entrega', desc: 'Devolvemos tu sala renovada, lista para estrenar.' },
        ],
        fabrics: ['Terciopelo', 'Lino Natural', 'Piel Sintética', 'Chenille', 'Tela Antimanchas', 'Microfibra'],
        gallery: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
            'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80',
            'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80',
        ],
        stats: { projects: '80+', satisfaction: '99%', avgTime: '7 días' },
        bentoStats: [
            { label: 'Proyectos', value: '80+' },
            { label: 'Satisfacción', value: '99%' },
        ],
        seo: {
            title: 'Tapicería de Salas en CDMX — Retapizado Premium | Velvet',
            description: 'Servicio profesional de tapicería de salas en Ciudad de México y Estado de México. Recolección a domicilio, telas premium y garantía.',
        },
    },
    {
        slug: 'sillas',
        title: 'Retapizado de Sillas',
        tagline: 'Cada silla, como nueva',
        tag: 'Comedor & oficina',
        description: 'Comedor, oficina o diseñador — devolvemos la vida a cada pieza.',
        longDescription:
            'Las sillas son de las piezas que más uso reciben en cualquier hogar u oficina. Con el tiempo, los asientos se hunden, las telas se desgastan y los marcos se aflojan. En Velvet Tapicería restauramos sillas de comedor, sillas de oficina, sillas de diseñador y sillas antiguas con la misma dedicación y atención al detalle. Nuestro equipo evalúa la estructura completa, reemplaza espuma y relleno cuando es necesario, refuerza marcos y aplica el nuevo tapizado con acabados de primera. Ya sea que tengas un juego de 4, 6 u 8 sillas, trabajamos en lote para mantener consistencia perfecta en cada pieza.',
        heroImage: sillasHeroImg,
        image: sillasHeroImg,
        features: [
            'Trabajo en lote para sets completos',
            'Refuerzo estructural de marcos',
            'Espuma de alta densidad',
            'Acabados uniformes en todas las piezas',
            'Descuento por volumen (6+ sillas)',
            'Recolección a domicilio',
        ],
        process: [
            { num: '01', title: 'Cotización', desc: 'Envíanos fotos de tus sillas para un presupuesto rápido.' },
            { num: '02', title: 'Selección', desc: 'Elige entre nuestro catálogo de telas y colores.' },
            { num: '03', title: 'Restauración', desc: 'Reforzamos estructura y aplicamos el nuevo tapizado.' },
            { num: '04', title: 'Entrega', desc: 'Tus sillas restauradas, de vuelta en tu espacio.' },
        ],
        fabrics: ['Vinipiel', 'Tela Texturizada', 'Lino', 'Microfibra', 'Piel Sintética'],
        gallery: [
            sillasHeroImg,
            'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&q=80',
            'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80',
            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
        ],
        stats: { projects: '45+', satisfaction: '98%', avgTime: '5 días' },
        seo: {
            title: 'Retapizado de Sillas en CDMX — Comedor y Oficina | Velvet',
            description: 'Retapizado profesional de sillas de comedor, oficina y diseñador en CDMX. Trabajo en lote, telas premium, recolección a domicilio.',
        },
    },
    {
        slug: 'cabeceras',
        title: 'Cabeceras a Medida',
        tagline: 'El toque perfecto para tu recámara',
        tag: 'Recámaras',
        description: 'Diseños personalizados para transformar tu recámara.',
        longDescription:
            'Una cabecera bien diseñada transforma por completo la estética de cualquier recámara. En Velvet Tapicería fabricamos cabeceras a medida según el tamaño de tu cama y el estilo que buscas. Desde diseños capitoneados clásicos hasta líneas modernas y minimalistas. Trabajamos con terciopelo, lino, piel sintética y telas técnicas. Cada cabecera se fabrica en nuestro taller con estructura de madera reforzada y espuma de alta densidad para un acabado firme y duradero. Instalamos a domicilio para asegurar el ajuste perfecto.',
        heroImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=80',
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
        features: [
            'Diseño personalizado a tu medida',
            'Capitoneado, liso o con bastones',
            'Estructura de madera reforzada',
            'Espuma de alta densidad',
            'Instalación a domicilio incluida',
            'Disponible para todas las medidas de cama',
        ],
        process: [
            { num: '01', title: 'Diseño', desc: 'Define estilo, medidas y tipo de acabado.' },
            { num: '02', title: 'Material', desc: 'Elige la tela perfecta de nuestro catálogo.' },
            { num: '03', title: 'Fabricación', desc: 'Construimos tu cabecera en nuestro taller.' },
            { num: '04', title: 'Instalación', desc: 'La instalamos en tu recámara, lista para usar.' },
        ],
        fabrics: ['Terciopelo', 'Lino', 'Piel Sintética', 'Suede', 'Tela Bouclé'],
        gallery: [
            'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
            'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=600&q=80',
            'https://images.unsplash.com/photo-1617806501553-e8dfb8306aba?w=600&q=80',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
        ],
        stats: { projects: '35+', satisfaction: '100%', avgTime: '10 días' },
        seo: {
            title: 'Cabeceras a Medida en CDMX — Diseño Personalizado | Velvet',
            description: 'Fabricación de cabeceras a medida en Ciudad de México. Diseño personalizado, capitoneado, telas premium e instalación a domicilio.',
        },
    },
    {
        slug: 'telas',
        title: 'Catálogo de Telas',
        tagline: 'Más de 200 opciones para tu proyecto',
        tag: 'Materiales',
        description: 'Explora nuestra selección de materiales y texturas premium.',
        longDescription:
            'La elección de la tela es el paso más importante en cualquier proyecto de tapicería. En Velvet trabajamos con proveedores nacionales e internacionales para ofrecerte más de 200 opciones de telas en diferentes texturas, colores y niveles de resistencia. Desde terciopelos suaves y linos naturales hasta pieles sintéticas de última generación y telas antimanchas con tecnología de protección. Nuestro equipo te ayuda a elegir la tela perfecta según el uso, el estilo y el presupuesto de tu proyecto. Ofrecemos servicio de muestras a domicilio para que veas y toques las telas antes de decidir.',
        heroImage: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1400&q=80',
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
        features: [
            'Más de 200 telas disponibles',
            'Muestras a domicilio sin costo',
            'Telas antimanchas y pet-friendly',
            'Telas para interiores y exteriores',
            'Asesoría personalizada de color y textura',
            'Precios para todos los presupuestos',
        ],
        process: [
            { num: '01', title: 'Consulta', desc: 'Dinos qué proyecto tienes en mente.' },
            { num: '02', title: 'Muestras', desc: 'Te llevamos muestras a domicilio para que elijas.' },
            { num: '03', title: 'Asesoría', desc: 'Te ayudamos a elegir la tela ideal según tu uso.' },
            { num: '04', title: 'Proyecto', desc: 'Aplicamos la tela elegida en tu mueble.' },
        ],
        fabrics: ['Terciopelo', 'Lino', 'Chenille', 'Piel Sintética', 'Bouclé', 'Microfibra', 'Antimanchas', 'Outdoor'],
        gallery: [
            'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
            'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80',
        ],
        stats: { projects: '200+', satisfaction: '100%', avgTime: 'Inmediato' },
        seo: {
            title: 'Catálogo de Telas para Tapicería — Premium | Velvet',
            description: 'Catálogo con más de 200 telas para tapicería. Terciopelo, lino, piel sintética, antimanchas. Muestras a domicilio gratis en CDMX.',
        },
    },
]

export default services

/**
 * Helper — find a service by slug, returns undefined if not found.
 */
export function getServiceBySlug(slug) {
    return services.find((s) => s.slug === slug)
}
