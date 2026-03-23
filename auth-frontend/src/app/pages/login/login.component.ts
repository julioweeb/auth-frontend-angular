import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';  
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(
  private authService: AuthService,
  private router: Router
) {}


  login() {
  this.error = '';
  this.isLoading = true;
  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      this.isLoading = false;
      console.error('Erro completo:', err);
      this.error = err.error?.message || err.message || 'Email ou senha inválidos';
    }
  });
}
}
