import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/flights" routerLinkActive="active">Flights</a>
      <a *ngIf="auth.isLoggedIn()" routerLink="/bookings" routerLinkActive="active">My Bookings</a>
      <div class="spacer"></div>
      <ng-container *ngIf="!auth.isLoggedIn(); else loggedIn">
        <a routerLink="/login" routerLinkActive="active">Login</a>
        <a routerLink="/register" routerLinkActive="active">Register</a>
      </ng-container>
      <ng-template #loggedIn>
        <span>{{ auth.getUsername() }}<span *ngIf="auth.isAdmin()"> (admin)</span></span>
        <a href="javascript:void(0)" (click)="logout()">Logout</a>
      </ng-template>
    </nav>
  `
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
