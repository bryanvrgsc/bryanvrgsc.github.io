export type Language = 'en' | 'es';

export interface Article {
    title: string;
    filename: string;
    path: string;
}

// List of PDF articles in public/docs/articles
// This will be manually maintained for now since we can't dynamically read filesystem in browser
export const ARTICLES: Article[] = [
    {
        title: "Cómo medir el ROI de un proyecto tecnológico",
        filename: "Cómo medir el ROI de un proyecto tecnológico.pdf",
        path: "/docs/articles/Cómo medir el ROI de un proyecto tecnológico.pdf"
    },
    {
        title: "Retorno Sobre la Inversión en Proyectos de Software Ágiles",
        filename: "Retorno Sobre la Inversión en Proyectos de Software Agiles.pdf",
        path: "/docs/articles/Retorno Sobre la Inversión en Proyectos de Software Agiles.pdf"
    }
];

export const getArticles = (): Article[] => {
    return ARTICLES;
};
