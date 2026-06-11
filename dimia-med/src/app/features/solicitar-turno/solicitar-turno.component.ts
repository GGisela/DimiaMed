import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClinicaService } from '../../core/services/clinica.service';
import { TurnoService } from '../../core/services/turno.service';
import { AuthService } from '../../core/services/auth.service';
import { Clinica } from '../../core/models/clinica.model';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  clinicas: Clinica[] = [];
  clinicasFiltradas: Clinica[] = [];
  clinicaSeleccionada: Clinica | null = null;
  loading = signal(false);
  submitting = signal(false);

  zonas = [
    'CABA — Zona Norte',
    'CABA — Zona Sur',
    'CABA — Zona Oeste',
    'GBA Norte',
    'GBA Sur',
    'GBA Oeste'
  ];

  tiposExamen = [
    { value: 'preocupacional', label: 'Preocupacional' },
    { value: 'períodico', label: 'Períodico' },
    { value: 'egreso', label: 'Egreso' }
  ];

  empleados = [
    { value: 'empleado1', label: 'Rodriguez, Carlos · DNI 28.104.556 ' },
    { value: 'empleado2', label: 'López, Valeria · DNI 35.892.341' },
    { value: 'empleado3', label: 'Fernández, Ana · DNI 40.115.772' }
  ];

  estado = [
    { value: 'apto', label: '·Apto' },
    { value: 'pendiente', label: '·Pendiente' },
    { value: 'sin-turno', label: '·Sin Turno' }
  ]

  form = {
    empleado: '',
    tipoExamen: 'preocupacional',
    fechaPreferida: this.getDefaultDate(),
    zona: '',
    observaciones: ''
  };

  constructor(
    private clinicaService: ClinicaService,
    private turnoService: TurnoService,
    private auth: AuthService,
    private router: Router

  ) {}

  ngOnInit(): void {
    const candidato = this.auth.currentCandidato();
    if (candidato?.zonaResidencia) {
      this.form.zona = candidato.zonaResidencia;
    } else {
      this.form.zona = this.zonas[0];
    }
    this.buscarClinicas();
  }

  buscarClinicas(): void {
    this.loading.set(true);
    this.clinicaSeleccionada = null;
    this.clinicaService.getByZona(this.form.zona).subscribe({
      next: (list) => {
        this.clinicasFiltradas = list;
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  seleccionar(clinica: Clinica): void {
    this.clinicaSeleccionada = clinica;
  }

  cancelar() {
  this.router.navigate(['/dashboard']);
  }

  confirmar(): void {
    if (!this.clinicaSeleccionada) return;
    // 1. Mapeamos los datos según el empleado que se seleccionó en el formulario html
    let nombreEmpleado = 'Carlos';
    let apellidoEmpleado = 'Rodríguez';
    let dniEmpleado = '28.104.556';
    let idEmpleado = 1;

    if (this.form.empleado === 'empleado2') {
      nombreEmpleado = 'Valeria';
      apellidoEmpleado = 'López';
      dniEmpleado = '35.892.341';
      idEmpleado = 2;
    } else if (this.form.empleado === 'empleado3') {
      nombreEmpleado = 'Ana';
      apellidoEmpleado = 'Fernández';
      dniEmpleado = '40.115.772';
      idEmpleado = 3;
    }

    // 2. Intentamos buscar si hay un candidato real en sesión
    const candidatoSesion = this.auth.currentCandidato();
    
    // 3. Si hay sesión real la usamos, sino armamos el objeto dinámico con el empleado elegido
    const candidato = candidatoSesion ? candidatoSesion : { 
      id: idEmpleado,
      nombre: nombreEmpleado,
      apellido: apellidoEmpleado,
      dni: dniEmpleado,
      zonaResidencia: this.form.zona
    };

    this.submitting.set(true);
    this.turnoService.solicitarTurno(
      {
        fechaPreferida: this.form.fechaPreferida,
        tipoExamen: this.form.tipoExamen,
        observaciones: this.form.observaciones,
        clinicaId: this.clinicaSeleccionada.id,
        candidatoId: candidato.id
      },
      this.clinicaSeleccionada,
      `${candidato.nombre} ${candidato.apellido}`,
      candidato.dni
    ).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/confirmacion']);
      },
      error: () => this.submitting.set(false)
    });
  
  }

  getDefaultDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  }

  get canConfirm(): boolean { //Validación de botón "Confirmar turno"
    return (
      this.clinicaSeleccionada !== null && 
      this.form.empleado !== '' &&
      this.form.fechaPreferida !== '' &&
      this.form.zona !== '' &&
      !this.submitting()
    )
  }

}
