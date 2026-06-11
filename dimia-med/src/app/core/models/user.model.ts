export type Rol = 'EMPRESA' | 'CLINICA' | 'CANDIDATO' | 'ADMIN';

export interface Usuario {
  id: number;
  email: string;
  rol: Rol;
}

export interface Candidato {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  zonaResidencia: string;
  usuario: Usuario;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
  candidato?: Candidato;
}

export interface Empresa {
  id: number; 
  usuario: Usuario; 
  nombre: string;
  rol: Empresa;
}