import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Candidato, LoginRequest, LoginResponse, Usuario, Empresa } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'dimia_token';
  private readonly USER_KEY = 'dimia_user';
  private readonly EMPRESA_KEY = 'dimia_empresa';
  private readonly CANDIDATO_KEY = 'dimia_candidato';

  isLoggedIn = signal(this.hasToken());
  currentUser = signal<Usuario | null>(this.getStoredUser());
  currentCandidato = signal<Candidato | null>(this.getStoredCandidato());
  currentEmpresa = signal<Empresa | null>(this.getStoredEmpresa());

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.mockLogin(credentials);
  }

  private mockLogin(credentials: LoginRequest): Observable<LoginResponse> {
    const mockUsers: Record<string, LoginResponse> = {
      'rrhh@test.com': {
        token: 'mock-jwt-token-empresa-123',
        usuario: { id: 1, email: 'rrhh@test.com', rol: 'EMPRESA' },
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

  private getStoredEmpresa(): Empresa | null {
  const raw = localStorage.getItem(this.EMPRESA_KEY);
  return raw ? JSON.parse(raw) : null;
}
}
