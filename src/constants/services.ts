import type { Service } from '../types';

export const SERVICES: Record<'en' | 'es', Service[]> = {
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
            items: ["Dashboards interactivos", "Modelos de reporte para KPI's", "Automatización de reportes", "Consultoría de datos"],
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
