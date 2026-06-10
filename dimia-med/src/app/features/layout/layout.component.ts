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
    const empresa = this.auth.currentEmpresa();
    return empresa?.nombre 
    ? empresa.nombre.charAt(0).toUpperCase(): 'T';
  }

  get fullName(): string {
    const empresa = this.auth.currentEmpresa();
    return empresa?.nombre ?? 'Tecno Arg S.A';
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  logout(): void {
    this.auth.logout();
  }
}
