import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface TurnoReciente {
  numero: string;
  clinica: string;
  tipo: string;
  fecha: string;
  estado: 'PENDIENTE' | 'ASIGNADO' | 'REALIZADO' | 'CANCELADO';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  turnosRecientes: TurnoReciente[] = [
    { numero: 'TRN-2025-04817', clinica: 'Centro Médico Norte', tipo: 'Periódico anual', fecha: '15 Jun 2025', estado: 'ASIGNADO' },
    { numero: 'TRN-2024-03120', clinica: 'Clínica San Martín', tipo: 'Preocupacional', fecha: '10 Mar 2024', estado: 'REALIZADO' },
    { numero: 'TRN-2023-01984', clinica: 'Instituto Médico Sur', tipo: 'Preocupacional', fecha: '22 Ago 2023', estado: 'REALIZADO' }
  ];

  constructor(public auth: AuthService) {}

  get saludo(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días,';
    if (h < 20) return 'Buenas tardes,';
    return 'Buenas noches,';
  }

  get nombrePaciente(): string {
    const c = this.auth.currentCandidato();
    return c ? `${c.nombre} ${c.apellido}` : 'Paciente';
  }

  estadoBadge(estado: string): string {
    const map: Record<string, string> = {
      ASIGNADO: 'badge--blue',
      REALIZADO: 'badge--green',
      PENDIENTE: 'badge--yellow',
      CANCELADO: 'badge--red'
    };
    return map[estado] ?? 'badge--gray';
  }

  estadoLabel(estado: string): string {
    const map: Record<string, string> = {
      ASIGNADO: 'Confirmado',
      REALIZADO: 'Realizado',
      PENDIENTE: 'Pendiente',
      CANCELADO: 'Cancelado'
    };
    return map[estado] ?? estado;
  }
}
