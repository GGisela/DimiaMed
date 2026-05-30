import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Candidato, LoginRequest, LoginResponse, Usuario } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'dimia_token';
  private readonly USER_KEY = 'dimia_user';
  private readonly CANDIDATO_KEY = 'dimia_candidato';

  isLoggedIn = signal(this.hasToken());
  currentUser = signal<Usuario | null>(this.getStoredUser());
  currentCandidato = signal<Candidato | null>(this.getStoredCandidato());

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Mock auth - replace with real endpoint when backend implements it
    // return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials);
    return this.mockLogin(credentials);
  }

  private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
    const mockUsers: Record<string, LoginResponse> = {
      'paciente@test.com': {
        token: 'mock-jwt-token-candidato-123',
        usuario: { id: 1, email: 'paciente@test.com', rol: 'CANDIDATO' },
        candidato: {
          id: 1,
          nombre: 'Rodríguez',
          apellido: 'Carlos',
          dni: '28.104.556',
          zonaResidencia: 'CABA — Zona Norte',
          usuario: { id: 1, email: 'paciente@test.com', rol: 'CANDIDATO' }
        }
      }
    };

    const response = mockUsers[credentials.email];
    if (response && credentials.password.length >= 6) {
      return of(response).pipe(
        tap(res => this.storeSession(res))
      );
    }
    return throwError(() => new Error('Credenciales inválidas'));
  }

  private storeSession(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.usuario));
    if (response.candidato) {
      localStorage.setItem(this.CANDIDATO_KEY, JSON.stringify(response.candidato));
    }
    this.isLoggedIn.set(true);
    this.currentUser.set(response.usuario);
    this.currentCandidato.set(response.candidato ?? null);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.CANDIDATO_KEY);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.currentCandidato.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUser(): Usuario | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private getStoredCandidato(): Candidato | null {
    const raw = localStorage.getItem(this.CANDIDATO_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
