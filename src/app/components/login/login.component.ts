import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="card" style="max-width: 400px; margin: 0 auto;">
        <h2>Login</h2>
        <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
        <form (ngSubmit)="submit()">
          <label>Username</label>
          <input name="username" [(ngModel)]="username" required />

          <label>Password</label>
          <input type="password" name="password" [(ngModel)]="password" required />

          <button type="submit" [disabled]="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
        </form>
        <p style="margin-top: 12px; font-size: 13px;">
          No account? <a routerLink="/register">Register here</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit(): void {
    this.errorMessage = '';
    this.loading = true;
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/flights']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Login failed';
      }
    });
  }
}
