

export type Language = 'en' | 'es';

export const UI_TEXT = {
  en: {
    homeLabels: {
      overview: "Overview",
      collaboration: "Collaboration",
      future: "Future"
    },
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
      solution: "Solution",
      modal: {
        caseStudy: "Case Study",
        overview: "Overview",
        presentation: "Presentation / Slides",
        demoVideo: "Demo Video",
        watchDemo: "Watch Demo Video",
        externalLink: "External Link",
        features: "Features",
        techStack: "Key Packages",
        documentation: "Documentation",
        roadmap: "Roadmap",
        viewRepo: "View Repository",
        openTab: "Open in new tab",
        downloadPdf: "Download PDF",
        pdfError: "PDF viewing not supported."
      }
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
    homeLabels: {
      overview: "Resumen",
      collaboration: "Colaboración",
      future: "Futuro"
    },
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
      solution: "Solución",
      modal: {
        caseStudy: "Caso de Estudio",
        overview: "Resumen",
        presentation: "Presentación / Diapositivas",
        demoVideo: "Video Demo",
        watchDemo: "Ver Video Demo",
        externalLink: "Enlace Externo",
        features: "Funcionalidades",
        techStack: "Paquetes Clave",
        documentation: "Documentación",
        roadmap: "Próximos Pasos",
        viewRepo: "Ver Repositorio",
        openTab: "Abrir en nueva pestaña",
        downloadPdf: "Descargar PDF",
        pdfError: "Visualización de PDF no soportada."
      }
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
      title: "GymApp iOS 🏋️‍♂️",
      problem: "Membership and service management for gyms.",
      solution: "Complete experience for users and admins with SwiftUI & Auth0.",
      tech: "Swift, SwiftUI, Combine, Auth0",
      result: "Smart access & 60% time reduction",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
      repoUrl: "https://github.com/bryanvrgsc/GymApp",
      screenshots: [
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1381&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop"
      ],
      details: {
        currentFeatures: [
          "Secure Login with Auth0",
          "User Profile with membership status",
          "Temporary Access QR",
          "Service and routine visualization"
        ],
        upcomingFeatures: [
          "Discord-style badge system for active members",
          "Entry/Exit logs (Attendance Calendar)",
          "Real-time gym occupancy visualization",
          "Equipment/Activity preference system"
        ]
      }
    },
    {
      title: "Data Warehouse for Grief Support Foundation 🗄️",
      problem: "Inefficient management of large amounts of data generated by the foundation.",
      solution: "Multidimensional Data Warehouse implementation to improve decision making and service quality.",
      tech: "SQL, ETL, PowerBI, Data Warehousing",
      result: "Integral vision & 360° impact analysis",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
      presentationUrl: "https://drive.google.com/file/d/1OauLDXENNzBNTkMUJIbVB8aAfAtEk6ff/preview",
      details: {
        currentFeatures: [
          "Multidimensional approach (Dimensions & Measures)",
          "User & demographic data tracking",
          "Therapy session records",
          "Satisfaction surveys & key indicators"
        ],
        documents: [
            { label: "Protocol Presentation", url: "https://drive.google.com/file/d/11ADH9y-pT6UXNRyyk5o4U6tU0gmWvHK4/view?usp=sharing" },
            { label: "First Partial Presentation", url: "https://drive.google.com/file/d/1Vs70UklnOSp8Lsa_LYClKJCdIIGORaH7/view?usp=sharing" },
            { label: "Second Partial Presentation", url: "https://drive.google.com/file/d/17j3byjWpVAELKkmkp3TAeEOkYLBgFV_a/view?usp=sharing" },
            { label: "Final Presentation", url: "https://drive.google.com/file/d/1OauLDXENNzBNTkMUJIbVB8aAfAtEk6ff/view?usp=sharing" }
        ]
      }
    },
    {
      title: "Mobile Controlled C Animation 🌐",
      problem: "3D animation project controlled remotely via mobile sensors.",
      solution: "Flutter app captures sensor data and sends it to a C server rendering in OpenGL via TCP/IP Sockets.",
      tech: "C, OpenGL, Flutter, Dart, Sockets TCP/IP",
      result: "Real-time sensor synchronization",
      image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1470&auto=format&fit=crop",
      videoUrl: "https://youtu.be/0tyqM-I_Pr8?si=UrBlcPtQ-MtfW9RI",
      repoUrl: "https://github.com/FrancoGL20/Animacion-con-C-desde-Celular",
      details: {
        currentFeatures: [
          "Motion capture via Flutter sensors",
          "Real-time communication with C server via sockets",
          "3D animation rendering on computer (OpenGL)",
          "IP and port configuration for remote connection"
        ]
      }
    },
    {
      title: "iOS Online Store 🛒",
      problem: "Native e-commerce application for iOS devices.",
      solution: "Developed in Swift with a Node.js (Glitch) backend and PostgreSQL database.",
      tech: "Swift, Node.js, PostgreSQL, Glitch",
      result: "Full-stack mobile commerce",
      image: "https://muchosnegociosrentables.com/wp-content/uploads/2020/05/monta-tu-propia-tienda-online.jpg",
      repoUrl: "https://github.com/bryanvrgsc/swift_proyecto_final_apps",
      presentationUrl: "https://drive.google.com/file/d/1zPVJDoTwf-qF96tzLYfjyfU_VN-EKvJv/preview",
      details: {
        currentFeatures: [
          "User Registration",
          "Add products to shopping cart",
          "Make purchases",
          "View purchase history",
          "Review and edit user profile"
        ],
        techStack: [
            "Swift (iOS Frontend)",
            "Node.js (Backend on Glitch)",
            "PostgreSQL (ElephantSQL Database)",
            "Glitch (Hosting)"
        ]
      }
    },
    {
      title: "Appointment Scheduling App 📅",
      problem: "Multi-platform app (iOS & Android) for membership and physical access management.",
      solution: "Comprehensive solution with Flutter, Firebase, and QR attendance control.",
      tech: "Flutter, Dart, Firebase, QR Scanner",
      result: "Efficient appointment & access management",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop",
      repoUrl: "https://github.com/bryanvrgsc/flutter_proyecto_final_apps",
      videoUrl: "https://drive.google.com/file/d/1VYnOJINVIiF5S1bowKk9b6_3pj_YH1JV/preview",
      presentationUrl: "https://drive.google.com/file/d/1dbOOiEP8nNVQ8_Vptm4W59EfMWhpyWPL/preview",
      details: {
        currentFeatures: [
           "Secure authentication with Firebase Auth",
           "Membership and service management",
           "QR code generation and scanning",
           "Attendance calendar (Entry/Exit logs)",
           "Cross-platform interface for iOS and Android"
        ],
        techStack: [
            "firebase_auth, cloud_firestore, firebase_core",
            "qr_flutter, qr_code_scanner",
            "syncfusion_flutter_calendar",
            "url_launcher"
        ]
      }
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
      title: "GymApp iOS 🏋️‍♂️",
      problem: "App para gestionar membresías y servicios de un gimnasio.",
      solution: "Experiencia completa para usuarios y administradores con SwiftUI y Auth0.",
      tech: "Swift, SwiftUI, Combine, Auth0",
      result: "Acceso inteligente y reducción de tiempos en 60%",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
      repoUrl: "https://github.com/bryanvrgsc/GymApp",
      screenshots: [
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1381&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop"
      ],
      details: {
        currentFeatures: [
          "Login seguro con Auth0",
          "Perfil de usuario con estado de membresía",
          "QR de acceso temporal",
          "Visualización de servicios y rutinas"
        ],
        upcomingFeatures: [
          "Sistema de badges tipo Discord para usuarios que mantienen su membresía activa",
          "Registro de entradas y salidas (Calendario de asistencias)",
          "Visualización del volumen de usuarios dentro del gimnasio en tiempo real",
          "Sistema de preferencias de equipos o actividades"
        ]
      }
    },
    {
      title: "Data Warehouse para Fundación de Acompañamiento de Duelo 🗄️",
      problem: "Gestión ineficiente de gran cantidad de datos generados por la fundación.",
      solution: "Implementación de un Data Warehouse multidimensional para mejorar la toma de decisiones y calidad de servicios.",
      tech: "SQL, ETL, PowerBI, Data Warehousing",
      result: "Visión integral y análisis de impacto 360°",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
      presentationUrl: "https://drive.google.com/file/d/1OauLDXENNzBNTkMUJIbVB8aAfAtEk6ff/preview",
      details: {
        currentFeatures: [
          "Enfoque multidimensional (Dimensiones y medidas)",
          "Tipos de datos: Información de usuarios y demográficos",
          "Registros de sesiones de terapia",
          "Encuestas de satisfacción e indicadores clave"
        ],
        documents: [
            { label: "Presentación Protocolo", url: "https://drive.google.com/file/d/11ADH9y-pT6UXNRyyk5o4U6tU0gmWvHK4/view?usp=sharing" },
            { label: "Presentación Primer Parcial", url: "https://drive.google.com/file/d/1Vs70UklnOSp8Lsa_LYClKJCdIIGORaH7/view?usp=sharing" },
            { label: "Presentación Segundo Parcial", url: "https://drive.google.com/file/d/17j3byjWpVAELKkmkp3TAeEOkYLBgFV_a/view?usp=sharing" },
            { label: "Presentación Final", url: "https://drive.google.com/file/d/1OauLDXENNzBNTkMUJIbVB8aAfAtEk6ff/view?usp=sharing" }
        ]
      }
    },
    {
      title: "Animación con C controlada desde celular 🌐",
      problem: "Proyecto de animación en 3D cuyo movimiento se controla desde un celular conectado a una computadora.",
      solution: "App de Flutter captura los sensores del dispositivo móvil y envía los datos al servidor en C, que renderiza la animación en tiempo real.",
      tech: "C, OpenGL, Flutter, Dart, Sockets TCP/IP",
      result: "Sincronización en tiempo real",
      image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1470&auto=format&fit=crop",
      videoUrl: "https://youtu.be/0tyqM-I_Pr8?si=UrBlcPtQ-MtfW9RI",
      repoUrl: "https://github.com/FrancoGL20/Animacion-con-C-desde-Celular",
      details: {
        currentFeatures: [
          "Captura de movimiento del celular mediante sensores Flutter",
          "Comunicación en tiempo real con un servidor C vía sockets",
          "Renderizado de animaciones 3D en la computadora",
          "Configuración de IP y puerto para conexión remota"
        ]
      }
    },
    {
      title: "Tienda Online iOS 🛒",
      problem: "Aplicación de comercio electrónico desarrollada en Swift para iOS.",
      solution: "Backend en Node.js (Glitch) y base de datos PostgreSQL en ElephantSQL.",
      tech: "Swift, Node.js, PostgreSQL, Glitch",
      result: "Experiencia de compra completa",
      image: "https://muchosnegociosrentables.com/wp-content/uploads/2020/05/monta-tu-propia-tienda-online.jpg",
      repoUrl: "https://github.com/bryanvrgsc/swift_proyecto_final_apps",
      presentationUrl: "https://drive.google.com/file/d/1zPVJDoTwf-qF96tzLYfjyfU_VN-EKvJv/preview",
      details: {
        currentFeatures: [
          "Registro de usuario",
          "Agregar productos al carrito de compras",
          "Realizar compras",
          "Visualizar historial de compras",
          "Revisar y editar perfil de usuario"
        ],
        techStack: [
            "Swift (iOS)",
            "Node.js (Backend en Glitch)",
            "PostgreSQL (ElephantSQL)",
            "Glitch (Hosting)"
        ]
      }
    },
    {
      title: "Calendarización de Citas 📅",
      problem: "App multiplataforma (iOS y Android) para gestión de membresías y acceso físico.",
      solution: "Solución integral con Flutter, Firebase, y QR Scanner, ideal para gestión de servicios y acceso mediante QR.",
      tech: "Flutter, Dart, Firebase, QR Scanner",
      result: "Gestión eficiente de citas y accesos",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1470&auto=format&fit=crop",
      repoUrl: "https://github.com/bryanvrgsc/flutter_proyecto_final_apps",
      videoUrl: "https://drive.google.com/file/d/1VYnOJINVIiF5S1bowKk9b6_3pj_YH1JV/preview",
      presentationUrl: "https://drive.google.com/file/d/1dbOOiEP8nNVQ8_Vptm4W59EfMWhpyWPL/preview",
      details: {
        currentFeatures: [
           "Autenticación segura con Firebase Auth",
           "Gestión de membresías y servicios",
           "Generación y escaneo de códigos QR de acceso",
           "Calendario de asistencias / registro de entradas y salidas",
           "Interfaz multiplataforma para iOS y Android"
        ],
        techStack: [
            "firebase_auth, cloud_firestore, firebase_core",
            "qr_flutter, qr_code_scanner",
            "syncfusion_flutter_calendar (para calendario de asistencias)",
            "url_launcher",
            "Entre otros utilitarios para manejo de datos y UI"
        ]
      }
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