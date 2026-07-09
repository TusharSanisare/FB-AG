import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

const EMPTY_FLIGHT: Flight = {
  flightNumber: '',
  departure: '',
  destination: '',
  departureTime: '',
  arrivalTime: '',
  availableSeats: 0,
  price: 0
};

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Search Flights</h2>
        <div class="row">
          <div>
            <label>Departure</label>
            <input [(ngModel)]="searchDeparture" placeholder="e.g. New York" />
          </div>
          <div>
            <label>Destination</label>
            <input [(ngModel)]="searchDestination" placeholder="e.g. London" />
          </div>
        </div>
        <button (click)="search()">Search</button>
        <button class="secondary" (click)="loadAll()" style="margin-left: 8px;">Show All</button>
      </div>

      <div class="card" *ngIf="auth.isAdmin()">
        <h2>{{ editingFlight.id ? 'Edit Flight' : 'Add Flight' }}</h2>
        <div class="error" *ngIf="formError">{{ formError }}</div>
        <div class="row">
          <div>
            <label>Flight Number</label>
            <input [(ngModel)]="editingFlight.flightNumber" />
          </div>
          <div>
            <label>Departure</label>
            <input [(ngModel)]="editingFlight.departure" />
          </div>
          <div>
            <label>Destination</label>
            <input [(ngModel)]="editingFlight.destination" />
          </div>
        </div>
        <div class="row">
          <div>
            <label>Departure Time</label>
            <input type="datetime-local" [(ngModel)]="editingFlight.departureTime" />
          </div>
          <div>
            <label>Arrival Time</label>
            <input type="datetime-local" [(ngModel)]="editingFlight.arrivalTime" />
          </div>
        </div>
        <div class="row">
          <div>
            <label>Available Seats</label>
            <input type="number" [(ngModel)]="editingFlight.availableSeats" />
          </div>
          <div>
            <label>Price</label>
            <input type="number" [(ngModel)]="editingFlight.price" />
          </div>
        </div>
        <button (click)="saveFlight()">{{ editingFlight.id ? 'Update' : 'Add' }} Flight</button>
        <button class="secondary" (click)="resetForm()" style="margin-left: 8px;" *ngIf="editingFlight.id">
          Cancel Edit
        </button>
      </div>

      <div class="card">
        <h2>Flights</h2>
        <div class="success" *ngIf="bookingMessage">{{ bookingMessage }}</div>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>From</th>
              <th>To</th>
              <th>Departs</th>
              <th>Seats</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let flight of flights">
              <td>{{ flight.flightNumber }}</td>
              <td>{{ flight.departure }}</td>
              <td>{{ flight.destination }}</td>
              <td>{{ flight.departureTime | date: 'short' }}</td>
              <td>{{ flight.availableSeats }}</td>
              <td>{{ flight.price | currency }}</td>
              <td>
                <button (click)="book(flight)">Book</button>
                <ng-container *ngIf="auth.isAdmin()">
                  <button class="secondary" (click)="edit(flight)" style="margin-left: 6px;">Edit</button>
                  <button class="danger" (click)="remove(flight)" style="margin-left: 6px;">Delete</button>
                </ng-container>
              </td>
            </tr>
            <tr *ngIf="flights.length === 0">
              <td colspan="7">No flights found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  searchDeparture = '';
  searchDestination = '';
  editingFlight: Flight = { ...EMPTY_FLIGHT };
  formError = '';
  bookingMessage = '';
  passengerId = 1; // simple stand-in since the backend has no logged-in-user-to-passenger link

  constructor(
    private flightService: FlightService,
    private bookingService: BookingService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.flightService.getAll().subscribe((flights) => (this.flights = flights));
  }

  search(): void {
    if (!this.searchDeparture || !this.searchDestination) {
      this.loadAll();
      return;
    }
    this.flightService.search(this.searchDeparture, this.searchDestination).subscribe((flights) => (this.flights = flights));
  }

  book(flight: Flight): void {
    this.bookingMessage = '';
    this.bookingService.create({ passengerId: this.passengerId, flightId: flight.id! }).subscribe({
      next: () => (this.bookingMessage = `Booked flight ${flight.flightNumber} for passenger #${this.passengerId}.`),
      error: () => (this.bookingMessage = 'Booking failed. Please try again.')
    });
  }

  edit(flight: Flight): void {
    this.editingFlight = { ...flight };
    this.formError = '';
  }

  resetForm(): void {
    this.editingFlight = { ...EMPTY_FLIGHT };
    this.formError = '';
  }

  saveFlight(): void {
    this.formError = '';
    const action = this.editingFlight.id
      ? this.flightService.update(this.editingFlight)
      : this.flightService.add(this.editingFlight);

    action.subscribe({
      next: () => {
        this.resetForm();
        this.loadAll();
      },
      error: () => (this.formError = 'Could not save flight. Check the fields and try again.')
    });
  }

  remove(flight: Flight): void {
    if (!flight.id) return;
    this.flightService.delete(flight.id).subscribe(() => this.loadAll());
  }
}
