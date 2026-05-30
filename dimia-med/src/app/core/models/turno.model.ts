export type EstadoTurno = 'PENDIENTE' | 'ASIGNADO' | 'REALIZADO' | 'CANCELADO';

export interface Turno {
  id?: number;
  fechaPreferida: string;
  tipoExamen: string;
  observaciones?: string;
  estado?: EstadoTurno;
  clinicaId: number;
  candidatoId: number;
  empresaId?: number;
  numeroTurno?: string;
  medico?: string;
  hora?: string;
}

export interface TurnoConfirmado {
  numeroTurno: string;
  candidato: string;
  dni: string;
  tipoExamen: string;
  clinica: string;
  direccionClinica: string;
  fechaHora: string;
  medico: string;
  estado: EstadoTurno;
}
