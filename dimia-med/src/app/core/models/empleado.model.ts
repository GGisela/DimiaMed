export type EstadoEmpleado = 'Apto' | 'Pendiente' | 'Sin Turno';
export type TipoExamen = 'Preocupacional' | 'Períodico' | 'Egreso';

export interface Empleado {
  nombre: string;
  dni: string;
  tipoExamen: TipoExamen;
  clinica: string | null;
  estado: EstadoEmpleado;
}