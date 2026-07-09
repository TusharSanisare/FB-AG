import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="card" style="max-width: 420px; margin: 0 auto;">
        <h2>Register</h2>
        <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
        <div class="success" *ngIf="successMessage">{{ successMessage }}</div>
        <form (ngSubmit)="submit()">
          <label>Username</label>
          <input name="username" [(ngModel)]="username" required minlength="3" maxlength="50" />

          <label>Email</label>
          <input type="email" name="email" [(ngModel)]="email" required />

          <label>Password</label>
          <input type="password" name="password" [(ngModel)]="password" required minlength="10" />
          <small style="display:block; margin-top:-8px; margin-bottom:12px; color:#6b7280;">
            Min 10 characters, with upper/lower case, a digit and a special character.
          </small>

          <button type="submit" [disabled]="loading">{{ loading ? 'Registering...' : 'Register' }}</button>
        </form>
        <p style="margin-top: 12px; font-size: 13px;">
          Already have an account? <a routerLink="/login">Login here</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    this.authService
      .register({ username: this.username, email: this.email, password: this.password, role: 'ROLE_USER' })
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 1200);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.error || 'Registration failed';
        }
      });
  }
}
