import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarOpen = signal(true);

  constructor(public auth: AuthService) {}

  get initials(): string {
    const candidato = this.auth.currentCandidato();
    if (candidato) {
      return `${candidato.apellido.charAt(0)}${candidato.nombre.charAt(0)}`.toUpperCase();
    }
    return 'U';
  }

  get fullName(): string {
    const candidato = this.auth.currentCandidato();
    return candidato ? `${candidato.nombre} ${candidato.apellido}` : 'Paciente';
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  logout(): void {
    this.auth.logout();
  }
}
