import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlightListComponent } from './components/flight-list/flight-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'flights', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'flights', component: FlightListComponent, canActivate: [authGuard] },
  { path: 'bookings', component: BookingListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'flights' }
];
