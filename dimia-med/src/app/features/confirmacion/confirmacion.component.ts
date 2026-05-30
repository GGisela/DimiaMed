import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TurnoService } from '../../core/services/turno.service';
import { TurnoConfirmado } from '../../core/models/turno.model';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {
  turno: TurnoConfirmado | null = null;
  cancelado = false;

  constructor(private turnoService: TurnoService, private router: Router) {}

  ngOnInit(): void {
    this.turno = this.turnoService.turnoConfirmado();
    if (!this.turno) {
      this.router.navigate(['/solicitar-turno']);
    }
  }

  cancelarTurno(): void {
    if (!this.turno) return;
    // Replace with real API call: this.http.delete(`/api/turnos/${id}`)
    this.turno = { ...this.turno, estado: 'CANCELADO' };
    this.turnoService.turnoConfirmado.set(this.turno);
    this.cancelado = true;
  }

  nuevoTurno(): void {
    this.turnoService.turnoConfirmado.set(null);
    this.router.navigate(['/solicitar-turno']);
  }
}
