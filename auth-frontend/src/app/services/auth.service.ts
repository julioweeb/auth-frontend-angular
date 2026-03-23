import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'https://localhost:7065/api';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/auth/login`, {
      Email: email,
      Password: password
    }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.api}/auth/register`, {
      Name: name,
      Email: email,
      Password: password
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged() {
    return !!this.getToken();
  }

  getMe() {
    return this.http.get(`${this.api}/users/me`);
  }

  updateProfile(name: string) {
    return this.http.put(`${this.api}/users/me`, { name });
  }

  updatePassword(currentPassword: string, newPassword: string) {
    return this.http.put(`${this.api}/users/me/password`, { currentPassword, newPassword });
  }
}
