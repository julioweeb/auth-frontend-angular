import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  error = '';
  success = '';
  isLoading = false;
  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.error = '';
    this.isLoading = true;
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.success = 'Conta criada com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err: any) => {
        this.isLoading = false;
        console.error('Erro de Register:', err);
        this.error = err.error?.message || err.message || 'Erro ao criar conta';
      }
    });
  }
}
