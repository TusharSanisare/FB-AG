import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

const API_URL = 'http://localhost:8080/api/flights';

@Injectable({ providedIn: 'root' })
export class FlightService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Flight[]> {
    return this.http.get<Flight[]>(API_URL);
  }

  search(departure: string, destination: string): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${API_URL}/search`, {
      params: { departure, destination }
    });
  }

  add(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(API_URL, flight);
  }

  update(flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${API_URL}/${flight.id}`, flight);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
