import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Notificacion {
  id: number;
  icono: string;
  categoria: string;
  mensaje: string;
  tiempo: string;
  leida: boolean;
}

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent {
  nuevas = signal<Notificacion[]>([
    {
      id: 1,
      icono: '📅',
      categoria: 'Recordatorio',
      mensaje: 'Tenés un turno mañana a las 09:30hs en Centro Médico Norte. ¡No olvides tu DNI!',
      tiempo: 'Hace 2 horas',
      leida: false
    },
    {
      id: 2,
      icono: '⚠️',
      categoria: 'Alerta',
      mensaje: 'Tu certificado periódico vence en 90 días. Te recomendamos sacar turno pronto.',
      tiempo: 'Hace 1 día',
      leida: false
    }
  ]);

  anteriores = signal<Notificacion[]>([
    {
      id: 3,
      icono: '✅',
      categoria: '',
      mensaje: 'Tu turno del 15/06 fue confirmado exitosamente por DimiaMed.',
      tiempo: 'Hace 3 días',
      leida: true
    },
    {
      id: 4,
      icono: '📄',
      categoria: '',
      mensaje: 'Tu certificado de aptitud fue cargado por el Dr. Vega. Podés descargarlo desde Mis Certificados.',
      tiempo: '22/03/2024',
      leida: true
    },
    {
      id: 5,
      icono: '📋',
      categoria: '',
      mensaje: 'RR.HH. te asignó un turno en Clínica San Martín para el 22/03/2024.',
      tiempo: '20/03/2024',
      leida: true
    }
  ]);

  get totalNoLeidas(): number {
    return this.nuevas().filter(n => !n.leida).length;
  }

  leerTodas(): void {
    this.nuevas.update(list =>
      list.map(n => ({ ...n, leida: true }))
    );
    this.anteriores.update(prev => [
      ...this.nuevas().map(n => ({ ...n, leida: true })),
      ...prev
    ]);
    this.nuevas.set([]);
  }

  marcarLeida(id: number): void {
    const notif = this.nuevas().find(n => n.id === id);
    if (!notif) return;
    this.nuevas.update(list => list.filter(n => n.id !== id));
    this.anteriores.update(list => [{ ...notif, leida: true }, ...list]);
  }
}
