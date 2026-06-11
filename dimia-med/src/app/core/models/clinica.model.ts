export interface Clinica {
  id: number;
  nombre: string;
  direccion: string;
  zona: string;
  horarios: string;
  habilitadaSrt: boolean;
  turnosDisponibles?: number;
  calificacion?: number;
}
