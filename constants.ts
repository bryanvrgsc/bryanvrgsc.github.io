

export type Language = 'en' | 'es';

export const UI_TEXT = {
  en: {
    heroTitle: "Future Architects.",
    heroSubtitle: "Engineering the next generation of digital experiences.",
    heroTags: "iOS • Web • Intelligence",
    startProject: "Start Project",
    exploreWork: "Explore Work",
    stats: {
      latency: "Latency",
      uptime: "Uptime",
      security: "Security",
      global: "Global"
    },
    mission: {
      title: "Mission",
      content: "Develop innovative technological solutions that drive efficiency, business intelligence, and strategic decision-making for our clients, through custom software, data analysis, and high-impact digital platforms."
    },
    vision: {
      title: "Vision",
      content: "To become a leading company in digital solutions and advanced analytics in Latin America, recognized for transforming data into value, optimizing processes, and creating technological products that drive sustainable growth for our clients."
    },
    services: {
      title: "Services",
      subtitle: "High-performance engineering solutions.",
      impact: "Impact"
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Selected works and case studies.",
      result: "Result",
      challenge: "Challenge",
      solution: "Solution"
    },
    blog: {
      title: "Insights",
      subtitle: "Strategic thinking and tech deep dives."
    },
    contact: {
      title: "Let's talk business.",
      subtitle: "Schedule a strategic 30-minute call. We'll analyze your current architecture and growth opportunities.",
      successTitle: "Message Received.",
      successMessage: "Thank you for reaching out, {name}. We'll analyze your request and get back to you within 2 hours.",
      sendAnother: "Send another message",
      placeholders: {
        name: "Name",
        email: "Email",
        message: "Tell us about your project..."
      },
      button: {
        default: "Schedule Call",
        sending: "Sending...",
      },
      responseTime: "Average response time: 2 hours.",
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        message: "Please tell us about your project.",
        network: "Network error. Please try again.",
        generic: "Something went wrong. Please try again."
      }
    },
    nav: {
      home: "Home",
      services: "Services",
      work: "Work",
      blog: "Blog",
      contact: "Contact"
    }
  },
  es: {
    heroTitle: "Arquitectos del Futuro.",
    heroSubtitle: "Ingeniería para la próxima generación de experiencias digitales.",
    heroTags: "iOS • Web • Inteligencia",
    startProject: "Iniciar Proyecto",
    exploreWork: "Ver Portafolio",
    stats: {
      latency: "Latencia",
      uptime: "Uptime",
      security: "Seguridad",
      global: "Global"
    },
    mission: {
      title: "Misión",
      content: "Desarrollar soluciones tecnológicas innovadoras que impulsen la eficiencia, la inteligencia empresarial y la toma de decisiones estratégicas de nuestros clientes, mediante software a la medida, análisis de datos y plataformas digitales de alto impacto."
    },
    vision: {
      title: "Visión",
      content: "Convertirnos en una empresa líder en soluciones digitales y analítica avanzada en Latinoamérica, reconocida por transformar datos en valor, optimizar procesos y crear productos tecnológicos que impulsen el crecimiento sostenible de nuestros clientes."
    },
    services: {
      title: "Servicios",
      subtitle: "Soluciones de ingeniería de alto rendimiento.",
      impact: "Impacto"
    },
    portfolio: {
      title: "Portafolio",
      subtitle: "Trabajos seleccionados y casos de estudio.",
      result: "Resultado",
      challenge: "Desafío",
      solution: "Solución"
    },
    blog: {
      title: "Insights",
      subtitle: "Pensamiento estratégico y tecnología profunda."
    },
    contact: {
      title: "Hablemos de negocios.",
      subtitle: "Agenda una llamada estratégica de 30 minutos. Analizaremos tu arquitectura actual y oportunidades de crecimiento.",
      successTitle: "Mensaje Recibido.",
      successMessage: "Gracias por contactarnos, {name}. Analizaremos tu solicitud y te responderemos en menos de 2 horas.",
      sendAnother: "Enviar otro mensaje",
      placeholders: {
        name: "Nombre",
        email: "Correo electrónico",
        message: "Cuéntanos sobre tu proyecto..."
      },
      button: {
        default: "Agendar Llamada",
        sending: "Enviando...",
      },
      responseTime: "Tiempo de respuesta promedio: 2 horas.",
      errors: {
        name: "Por favor ingresa tu nombre.",
        email: "Por favor ingresa un correo válido.",
        message: "Por favor cuéntanos sobre tu proyecto.",
        network: "Error de red. Intenta de nuevo.",
        generic: "Algo salió mal. Intenta de nuevo."
      }
    },
    nav: {
      home: "Inicio",
      services: "Servicios",
      work: "Portafolio",
      blog: "Blog",
      contact: "Contacto"
    }
  }
};

export const SERVICES = {
  en: [
    {
      title: "App Development",
      iconName: "Smartphone",
      items: ["iOS Apps (SwiftUI, Combine)", "Flutter Apps (iOS/Android)", "Web Apps & APIs", "Integrations (Auth0, Firebase)"],
      valueProp: ["Digitize processes", "Reduce operating costs", "Solid & scalable apps"]
    },
    {
      title: "Cloud & DevOps",
      iconName: "Cloud",
      items: ["Cloud Infrastructure (AWS / GCP / Azure)", "Serverless Backend & Containers", "CI/CD with GitHub Actions", "Cloud Databases (SQL/NoSQL)", "Cloud Cost Optimization"],
      valueProp: ["High availability", "Automated deployments", "Scalability"]
    },
    {
      title: "Business Intelligence",
      iconName: "ChartBar",
      items: ["Interactive Dashboards", "KPI Reporting Models", "Report Automation", "Data Consulting"],
      valueProp: ["Data-driven decisions", "Key metric clarity", "Alerts & predictive analysis"]
    },
    {
      title: "Tech Consulting",
      iconName: "ShieldCheck",
      items: ["Architecture Assessment", "App Optimization", "Tech Migration", "Security & Auth"],
      valueProp: ["Avoid costly mistakes", "Reliable systems", "Guaranteed scalability"]
    },
    {
      title: "Networks & Connectivity",
      iconName: "Wifi",
      items: ["Residential/Business Wi-Fi Optimization", "Mesh Network Design", "IoT Device Integration", "Network Performance Diagnostic"],
      valueProp: ["Stable connection", "Full coverage", "Secure ecosystem"]
    }
  ],
  es: [
    {
      title: "Desarrollo de Apps",
      iconName: "Smartphone",
      items: ["Apps iOS (SwiftUI, Combine)", "Apps Flutter (iOS/Android)", "Web Apps y APIs", "Integraciones (Auth0, Firebase)"],
      valueProp: ["Digitalizar procesos", "Reducir costos operativos", "Apps sólidas y escalables"]
    },
    {
      title: "Cloud & DevOps",
      iconName: "Cloud",
      items: ["Infraestructura en la nube (AWS / GCP / Azure)", "Backend serverless y contenedores", "CI/CD con GitHub Actions", "Bases de datos en la nube (SQL/NoSQL)", "Optimización de costos en nube"],
      valueProp: ["Alta disponibilidad", "Despliegues automatizados", "Escalabilidad"]
    },
    {
      title: "Business Intelligence",
      iconName: "ChartBar",
      items: ["Dashboards interactivos", "Modelos de reporte para KPI’s", "Automatización de reportes", "Consultoría de datos"],
      valueProp: ["Decisiones basadas en datos", "Claridad en indicadores clave", "Alertas y análisis predictivo"]
    },
    {
      title: "Consultoría Tecnológica",
      iconName: "ShieldCheck",
      items: ["Evaluación de arquitectura", "Optimización de apps", "Migración tecnológica", "Seguridad y autenticación"],
      valueProp: ["Evitar errores costosos", "Sistemas confiables", "Escalabilidad garantizada"]
    },
    {
      title: "Redes y Conectividad",
      iconName: "Wifi",
      items: ["Optimización de Wi-Fi residencial/empresarial", "Diseño de redes Mesh", "Integración de dispositivos IoT", "Diagnóstico de rendimiento de red"],
      valueProp: ["Conexión estable", "Cobertura total", "Ecosistema seguro"]
    }
  ]
};

export const PORTFOLIO = {
  en: [
    {
      title: "Gym App with QR",
      problem: "Long queues at reception and shared access fraud.",
      solution: "Mobile app with dynamic QR generation and real-time validation.",
      tech: "Flutter, Firebase, Node.js",
      result: "Smart access & 60% time reduction",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "BI Dashboard",
      problem: "Lack of daily visibility into sales and inventory.",
      solution: "Automated dashboard connected to ERP with predictive alerts.",
      tech: "React, Python ETL, PowerBI",
      result: "Automated insights for decision making",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Flutter App + Backend",
      problem: "Manual operational processes on paper and excel.",
      solution: "Complete platform for digitizing field operations.",
      tech: "Flutter, NestJS, PostgreSQL",
      result: "100% digitalization of operations",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "Predictive Analysis Scripts",
      problem: "Overstock and inefficient purchasing.",
      solution: "Python algorithms for seasonal demand prediction.",
      tech: "Python, Pandas, Scikit-learn",
      result: "25% inventory optimization",
      image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1470&auto=format&fit=crop"
    }
  ],
  es: [
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
  ]
};

export const BLOG_POSTS = {
  en: [
    {
      title: "How a mobile app can automate your business",
      excerpt: "Digitizing processes is not a luxury, it is a necessity to reduce operating costs.",
      date: "Oct 12, 2023",
      category: "Automation"
    },
    {
      title: "Why your company needs a BI dashboard",
      excerpt: "Stop operating by instinct and start deciding with real data is the definitive step to scale.",
      date: "Sep 28, 2023",
      category: "Business Intelligence"
    },
    {
      title: "SwiftUI or Flutter: which is better for your app",
      excerpt: "We analyze costs, development times and maintenance for your project.",
      date: "Aug 15, 2023",
      category: "Technology"
    }
  ],
  es: [
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
  ]
};

export const ENGAGEMENT_MODELS = {
  en: [
    { iconName: "Layers", label: "Full Project" },
    { iconName: "Code", label: "Hourly" },
    { iconName: "Briefcase", label: "Monthly Retainer" },
    { iconName: "Rocket", label: "Consulting" }
  ],
  es: [
    { iconName: "Layers", label: "Proyecto Completo" },
    { iconName: "Code", label: "Por Hora" },
    { iconName: "Briefcase", label: "Retainer Mensual" },
    { iconName: "Rocket", label: "Consultoría" }
  ]
};
