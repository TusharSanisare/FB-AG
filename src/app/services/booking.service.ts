import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

const API_URL = 'http://localhost:8080/api/bookings';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(API_URL, booking);
  }

  getByPassenger(passengerId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${API_URL}/passenger/${passengerId}`);
  }

  cancel(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}/cancel`);
  }
}
