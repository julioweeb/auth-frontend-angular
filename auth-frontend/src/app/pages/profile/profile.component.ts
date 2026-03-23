import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: any = null;

  // Dados do formulário de nome
  name = '';
  profileSuccess = '';
  profileError = '';
  profileLoading = false;

  // Dados do formulário de senha
  currentPassword = '';
  newPassword = '';
  passwordSuccess = '';
  passwordError = '';
  passwordLoading = false;
  showCurrentPassword = false;
  showNewPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (res: any) => {
        this.user = res;
        this.name = res.name;
      },
      error: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  updateProfile() {
    this.profileError = '';
    this.profileSuccess = '';
    this.profileLoading = true;
    this.authService.updateProfile(this.name).subscribe({
      next: () => {
        this.profileLoading = false;
        this.profileSuccess = 'Nome atualizado com sucesso!';
        if (this.user) this.user.name = this.name;
      },
      error: (err: any) => {
        this.profileLoading = false;
        this.profileError = err.error?.message || 'Erro ao atualizar perfil';
      }
    });
  }

  updatePassword() {
    this.passwordError = '';
    this.passwordSuccess = '';
    this.passwordLoading = true;
    this.authService.updatePassword(this.currentPassword, this.newPassword).subscribe({
      next: () => {
        this.passwordLoading = false;
        this.passwordSuccess = 'Senha alterada com sucesso!';
        this.currentPassword = '';
        this.newPassword = '';
      },
      error: (err: any) => {
        this.passwordLoading = false;
        this.passwordError = err.error?.message || 'Erro ao alterar senha';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
