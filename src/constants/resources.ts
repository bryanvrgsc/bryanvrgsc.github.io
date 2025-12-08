/**
 * Digital Library Documents Data
 * 
 * Contains metadata for all PDF documents in the digital library.
 * Documents are located in public/docs/files/
 */

export interface Document {
    id: string;
    filename: string;
    path: string;
    type: 'paper' | 'slides';
    title: {
        en: string;
        es: string;
    };
    description: {
        en: string;
        es: string;
    };
    category: {
        en: string;
        es: string;
    };
}

export const DOCUMENTS: Document[] = [
    {
        id: 'calidad-software',
        filename: 'paper - Calidad del producto software.pdf',
        path: '/docs/files/paper - Calidad del producto software.pdf',
        type: 'paper',
        title: {
            en: 'Software Product Quality',
            es: 'Calidad del producto software'
        },
        description: {
            en: 'Comprehensive analysis of software quality metrics, standards, and best practices for delivering high-quality software products.',
            es: 'Análisis exhaustivo de métricas de calidad del software, estándares y mejores prácticas para entregar productos de software de alta calidad.'
        },
        category: {
            en: 'Quality Assurance',
            es: 'Aseguramiento de Calidad'
        }
    },
    {
        id: 'madurez-empresa',
        filename: 'paper - Etapas de madurez de una empresa.pdf',
        path: '/docs/files/paper - Etapas de madurez de una empresa.pdf',
        type: 'paper',
        title: {
            en: 'Company Maturity Stages',
            es: 'Etapas de madurez de una empresa'
        },
        description: {
            en: 'Framework for understanding organizational maturity levels and the evolution path of technology companies.',
            es: 'Marco para comprender los niveles de madurez organizacional y la ruta de evolución de las empresas tecnológicas.'
        },
        category: {
            en: 'Business Strategy',
            es: 'Estrategia Empresarial'
        }
    },
    {
        id: 'rsa-cryptography',
        filename: 'paper - A Method for Obtaining Digital Signatures and Public-Key Cryptosystems.pdf',
        path: '/docs/files/paper - A Method for Obtaining Digital Signatures and Public-Key Cryptosystems.pdf',
        type: 'paper',
        title: {
            en: 'A Method for Obtaining Digital Signatures and Public-Key Cryptosystems',
            es: 'Un método para obtener firmas digitales y criptosistemas de clave pública'
        },
        description: {
            en: 'The original 1978 paper by Rivest, Shamir, and Adleman introducing the RSA algorithm - a groundbreaking public-key cryptosystem that revolutionized digital security and remains fundamental to modern encryption.',
            es: 'El paper original de 1978 por Rivest, Shamir y Adleman que introduce el algoritmo RSA - un criptosistema de clave pública revolucionario que transformó la seguridad digital y sigue siendo fundamental para el cifrado moderno.'
        },
        category: {
            en: 'Cybersecurity',
            es: 'Ciberseguridad'
        }
    },
    {
        id: 'roi-agile',
        filename: 'paper - Retorno Sobre la Inversión en Proyectos de Software Agiles.pdf',
        path: '/docs/files/paper - Retorno Sobre la Inversión en Proyectos de Software Agiles.pdf',
        type: 'paper',
        title: {
            en: 'ROI in Agile Software Projects',
            es: 'Retorno Sobre la Inversión en Proyectos de Software Ágiles'
        },
        description: {
            en: 'Methodology for calculating and maximizing return on investment in agile software development projects.',
            es: 'Metodología para calcular y maximizar el retorno de inversión en proyectos de desarrollo de software ágil.'
        },
        category: {
            en: 'Project Management',
            es: 'Gestión de Proyectos'
        }
    },
    {
        id: 'roi-tech-slides',
        filename: 'slides - Como medir el ROI de un proyecto tecnologico.pdf',
        path: '/docs/files/slides - Como medir el ROI de un proyecto tecnologico.pdf',
        type: 'slides',
        title: {
            en: 'How to Measure ROI in Tech Projects',
            es: 'Cómo medir el ROI de un proyecto tecnológico'
        },
        description: {
            en: 'Practical presentation on metrics, KPIs, and frameworks for measuring return on investment in technology initiatives.',
            es: 'Presentación práctica sobre métricas, KPIs y marcos para medir el retorno de inversión en iniciativas tecnológicas.'
        },
        category: {
            en: 'Business Intelligence',
            es: 'Inteligencia de Negocios'
        }
    }
];

// Legacy export for backwards compatibility (if needed)
export const RESOURCES = {
    en: DOCUMENTS.map(doc => ({
        title: doc.title.en,
        excerpt: doc.description.en,
        date: '',
        category: doc.category.en
    })),
    es: DOCUMENTS.map(doc => ({
        title: doc.title.es,
        excerpt: doc.description.es,
        date: '',
        category: doc.category.es
    }))
};
