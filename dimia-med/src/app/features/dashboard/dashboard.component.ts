import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {signal} from '@angular/core';
import { Empleado } from '../../core/models/empleado.model';
import { computed } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  searcher = signal (''); /* Variable que observa para detectar cambios automáticamente y guarda un valor  */

  empleados: Empleado[] = [
    { nombre: 'Perez, Martina', dni: '32.541.987', tipoExamen: 'Preocupacional', clinica: 'Centro Médico Norte', estado: 'Apto'},
    { nombre: 'Rodriguez, Carlos', dni: '28.104.556', tipoExamen: 'Períodico', clinica: 'Clínica San Martín', estado: 'Pendiente'},
    { nombre: 'López, Valeria', dni: '35.892.341', tipoExamen: 'Preocupacional', clinica: '-', estado: 'Sin Turno'},
    { nombre: 'Méndez, Juan', dni: '30.227.819', tipoExamen: 'Egreso', clinica: 'Centro Médico Norte', estado: 'Apto'},
    { nombre: 'Fernández, Ana', dni: '40.115.772', tipoExamen: 'Preocupacional', clinica: '-', estado: 'Pendiente'},
  ];

  get saludo(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días,';
    if (h < 20) return 'Buenas tardes,';
    return 'Buenas noches,';
  }

  constructor (public auth: AuthService) {}

  get nombreEmpresa(): string {
    const e = this.auth.currentEmpresa();
    return e ? `${e.nombre}` : 'TecnoArg S.A';
  }

  empleadosFiltrados = computed (() => { /* computed calcula un valor basado en otras variables reactivas (signal) */
    const search = this.searcher().toLowerCase().trim();
    if(!search) return this.empleados; /*Si no hay búsqueda, devuelve todos los empleados */
    return this.empleados.filter(employee =>
      employee.nombre.toLowerCase().includes(search) || 
      employee.dni.includes(search) ||
      employee.tipoExamen.toLowerCase().includes(search) ||
      (employee.clinica?.toLowerCase().includes(search) ?? false)
    );
  });
  
  onSearch(valor: string) {
    this.searcher.set(valor); /* Actualiza el valor del signal, lo que a su vez actualiza automáticamente los empleados filtrados */
  }
  
  solicitarTurno (){ /* Método para solicitar un turno */
    console.log('Solicitar turno'); 
  }

  asignarTurno(empleado: Empleado) {
    console.log(`Asignar turno a ${empleado.nombre}`);
  }

  verDetalle(empleado: Empleado) {
    console.log(`Ver detalle de ${empleado.nombre}`);
  }
}
