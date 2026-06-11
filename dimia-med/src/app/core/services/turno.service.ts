import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Turno, TurnoConfirmado } from '../models/turno.model';
import { Clinica } from '../models/clinica.model';

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private readonly baseUrl = `${environment.apiUrl}/turnos`;

  turnoConfirmado = signal<TurnoConfirmado | null>(null);

  constructor(private http: HttpClient) {}

  solicitarTurno(turno: Turno, clinica: Clinica, candidatoNombre: string, candidatoDni: string): Observable<TurnoConfirmado> {
    // Mock confirmation - replace with real API call when backend implements it
    // return this.http.post<TurnoConfirmado>(this.baseUrl, turno);
    const confirmado: TurnoConfirmado = {
      numeroTurno: `TRN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`,
      candidato: candidatoNombre,
      dni: candidatoDni,
      tipoExamen: this.formatTipoExamen(turno.tipoExamen),
      clinica: clinica.nombre,
      direccionClinica: clinica.direccion,
      fechaHora: `${this.formatFecha(turno.fechaPreferida)} · 09:30 hs`,
      medico: 'Dr. Alejandro Vega · Mat. 48.221',
      estado: 'ASIGNADO'
    };
    this.turnoConfirmado.set(confirmado);
    return of(confirmado);
  }

  private formatTipoExamen(tipo: string): string {
    const map: Record<string, string> = {
      'preocupacional': 'Preocupacional',
      'periodico': 'Periódico anual',
      'egreso': 'Egreso'
    };
    return map[tipo] ?? tipo;
  }

  private formatFecha(fecha: string): string {
    const date = new Date(fecha + 'T12:00:00');
    return date.toLocaleDateString('es-AR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }
}
