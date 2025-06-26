export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  gif?: string; // Optional GIF for animations
  category: string;
  year: number;
  techniques: string[];
  featured: boolean;
}
