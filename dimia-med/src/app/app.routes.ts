import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./features/layout/layout.component').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'solicitar-turno',
        loadComponent: () => import('./features/solicitar-turno/solicitar-turno.component').then(m => m.SolicitarTurnoComponent)
      },
      {
        path: 'confirmacion',
        loadComponent: () => import('./features/confirmacion/confirmacion.component').then(m => m.ConfirmacionComponent)
      },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
