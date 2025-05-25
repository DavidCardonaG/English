export interface Trabajo {
  id:string;
  titulo: string;
  descripcion: string;
  contenido:string[];
  imageUrl?: string;
  tags?:string[];
  type?: string;
  audioUrl?: string;
}
