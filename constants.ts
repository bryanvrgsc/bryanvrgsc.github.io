import { ServiceItem, PortfolioItem, Testimonial, BlogPost, ProcessStep } from './types';
import { SmartphoneIcon, ChartBarIcon, ShieldCheckIcon } from './components/Icons';

export const SERVICES: ServiceItem[] = [
  {
    title: "Desarrollo de Aplicaciones",
    icon: SmartphoneIcon,
    items: [
      "Apps iOS (SwiftUI, Combine)",
      "Apps Flutter (iOS/Android)",
      "Web Apps y APIs",
      "Integraciones (Auth0, Firebase, Pagos, IoT)"
    ],
    valueProp: [
      "Digitalizar procesos",
      "Reducir costos operativos",
      "Apps sólidas y escalables"
    ]
  },
  {
    title: "Business Intelligence",
    icon: ChartBarIcon,
    items: [
      "Dashboards interactivos",
      "Modelos de reporte para KPI’s",
      "Automatización de reportes",
      "Consultoría de toma de decisiones"
    ],
    valueProp: [
      "Decisiones basadas en datos",
      "Claridad en indicadores clave",
      "Alertas y análisis predictivo"
    ]
  },
  {
    title: "Consultoría en Tecnología",
    icon: ShieldCheckIcon,
    items: [
      "Evaluación de arquitectura",
      "Optimización de apps o infraestructura",
      "Migración tecnológica",
      "Seguridad y autenticación (Auth0, JWT)"
    ],
    valueProp: [
      "Evitar errores costosos",
      "Sistemas confiables y seguros",
      "Escalabilidad garantizada"
    ]
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    title: "App de Gimnasio con QR",
    problem: "Largas filas en recepción y fraude en accesos compartidos.",
    solution: "App móvil con generación dinámica de QR y validación en tiempo real.",
    tech: "Flutter, Firebase, Node.js",
    result: "Acceso inteligente y reducción de tiempos en 60%",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Dashboard de BI",
    problem: "Falta de visibilidad diaria en ventas e inventario.",
    solution: "Dashboard automatizado conectado al ERP con alertas predictivas.",
    tech: "React, Python ETL, PowerBI",
    result: "Insights automáticos para toma de decisiones",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "App Flutter + Backend",
    problem: "Procesos operativos manuales en papel y excel.",
    solution: "Plataforma completa de digitalización de operaciones en campo.",
    tech: "Flutter, NestJS, PostgreSQL",
    result: "Digitalización de operaciones al 100%",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop"
  },
  {
    title: "Scripts de Análisis Predictivo",
    problem: "Exceso de stock y compras ineficientes.",
    solution: "Algoritmos en Python para predicción de demanda estacional.",
    tech: "Python, Pandas, Scikit-learn",
    result: "Optimización de inventario en un 25%",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1470&auto=format&fit=crop"
  }
];

export const PROCESS: ProcessStep[] = [
  { number: "01", title: "Llamada inicial (30 min)", description: "Entender tu negocio y validar si somos buen match." },
  { number: "02", title: "Propuesta + Cotización", description: "Plan claro, costos definidos y arquitectura sugerida." },
  { number: "03", title: "Diseño + Desarrollo", description: "Construcción ágil por fases con entregables visibles." },
  { number: "04", title: "Entrega y Soporte", description: "Despliegue final, capacitación y garantía de funcionamiento." }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos Mendoza",
    role: "CEO",
    company: "Logística FastTrack",
    text: "La transformación digital que logramos nos permitió escalar a dos nuevas ciudades. La app móvil es sólida y el soporte ha sido excelente."
  },
  {
    name: "Ana Rivas",
    role: "Directora de Operaciones",
    company: "FitLife Gyms",
    text: "El sistema de acceso QR eliminó por completo los problemas en recepción. Entendieron perfectamente nuestro problema de negocio."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Cómo una app móvil puede automatizar tu negocio",
    excerpt: "Digitalizar procesos no es un lujo, es una necesidad para reducir costos operativos.",
    date: "Oct 12, 2023",
    category: "Automatización"
  },
  {
    title: "Por qué tu empresa necesita un dashboard BI",
    excerpt: "Dejar de operar por instinto y empezar a decidir con datos reales es el paso definitivo para escalar.",
    date: "Sep 28, 2023",
    category: "Business Intelligence"
  },
  {
    title: "SwiftUI o Flutter: qué conviene para tu app",
    excerpt: "Analizamos costos, tiempos de desarrollo y mantenimiento para tu proyecto.",
    date: "Ago 15, 2023",
    category: "Tecnología"
  }
];