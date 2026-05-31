import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Clinica } from '../models/clinica.model';

@Injectable({ providedIn: 'root' })
export class ClinicaService {
  private readonly baseUrl = `${environment.apiUrl}/clinicas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Clinica[]> {
    console.log(`[ClinicaService] GET ${this.baseUrl}`);
    return this.http.get<Clinica[]>(this.baseUrl).pipe(
      tap(data => console.log('[ClinicaService] ✅ API real respondió:', data)),
      catchError(err => {
        console.warn('[ClinicaService] ⚠️ API no disponible, usando datos mock:', err.message);
        return of(this.getMockClinicas());
      })
    );
  }

  getByZona(zona: string): Observable<Clinica[]> {
    const params = new HttpParams().set('zona', zona);
    const url = `${this.baseUrl}/buscar`;
    console.log(`[ClinicaService] GET ${url}?zona=${zona}`);
    return this.http.get<Clinica[]>(url, { params }).pipe(
      tap(data => console.log('[ClinicaService] ✅ API real respondió:', data)),
      catchError(err => {
        console.warn('[ClinicaService] ⚠️ API no disponible, filtrando datos para la zona:', zona);
        const zonaBusqueda = zona.toLowerCase().trim().replace('-','-');

        return of (this.getMockClinicas().filter(c =>{
          const zonaClinica= c.zona.toLowerCase().trim().replace('-','-');
          return zonaClinica === zonaBusqueda;
        }))
      })
    );
  }

  private getMockClinicas(): Clinica[] {
    return [
      {
        id: 1, nombre: 'Centro Médico Norte', direccion: 'Av. Cabildo 1240, Belgrano',
        zona: 'CABA — Zona Norte', horarios: 'Lun–Vie 8–18h',
        habilitadaSrt: true, turnosDisponibles: 6, calificacion: 4.8
      },
      {
        id: 2, nombre: 'Clínica San Martín', direccion: 'San Martín 540, Villa Urquiza',
        zona: 'CABA — Zona Norte', horarios: 'Lun–Sáb 7–17h',
        habilitadaSrt: true, turnosDisponibles: 2, calificacion: 4.5
      },
      {
        id: 3, nombre: 'Instituto Médico Sur', direccion: 'Av. Rivadavia 5800, Caballito',
        zona: 'CABA — Zona Sur', horarios: 'Lun–Vie 9–19h',
        habilitadaSrt: true, turnosDisponibles: 4, calificacion: 4.2
      },
      {
        id: 4, nombre: 'Centro Diagnóstico Oeste', direccion: 'Av. Gaona 2100, Flores',
        zona: 'CABA — Zona Oeste', horarios: 'Lun–Sáb 8–16h',
        habilitadaSrt: true, turnosDisponibles: 8, calificacion: 3.9
      },
      {
        id: 5, nombre: 'Centro Médico GBA Norte', direccion: 'Av. Maipú 1900, San Isidro',
        zona: 'GBA Norte', horarios: 'Lun–Vie 8–17h',
        habilitadaSrt: true, turnosDisponibles: 5, calificacion: 4.6
      },
      {
        id: 6, nombre: 'Clínica Del Sol', direccion: 'Mitre 450, Quilmes',
        zona: 'GBA Sur', horarios: 'Lun–Sáb 7–20h',
        habilitadaSrt: true, turnosDisponibles: 3, calificacion: 4.4
      },
      {
        id: 7, nombre: 'Sanatorio Regional Oeste', direccion: 'Belgrano 250, Morón',
        zona: 'GBA Oeste', horarios: '24 Horas',
        habilitadaSrt: true, turnosDisponibles: 12, calificacion: 4.1
      }


    ];
  }
}
