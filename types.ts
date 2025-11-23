export interface ServiceItem {
  title: string;
  items: string[];
  valueProp: string[];
  icon: React.FC<any>;
}

export interface PortfolioItem {
  title: string;
  problem: string;
  solution: string;
  tech: string;
  result: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}