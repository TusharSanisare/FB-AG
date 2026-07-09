import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>My Bookings</h2>
        <label>Passenger ID</label>
        <div class="row">
          <input type="number" [(ngModel)]="passengerId" />
          <button (click)="load()" style="max-width: 120px;">Load</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Flight ID</th>
              <th>Seat</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let booking of bookings">
              <td>{{ booking.id }}</td>
              <td>{{ booking.flightId }}</td>
              <td>{{ booking.seatNumber || '-' }}</td>
              <td>{{ booking.status }}</td>
              <td>
                <button class="danger" (click)="cancel(booking)" *ngIf="booking.status === 'CONFIRMED'">
                  Cancel
                </button>
              </td>
            </tr>
            <tr *ngIf="bookings.length === 0">
              <td colspan="5">No bookings found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BookingListComponent {
  passengerId = 1;
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {
    this.load();
  }

  load(): void {
    this.bookingService.getByPassenger(this.passengerId).subscribe((bookings) => (this.bookings = bookings));
  }

  cancel(booking: Booking): void {
    if (!booking.id) return;
    this.bookingService.cancel(booking.id).subscribe(() => this.load());
  }
}
