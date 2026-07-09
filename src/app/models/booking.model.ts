export type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id?: number;
  passengerId: number;
  flightId: number;
  seatNumber?: string;
  bookingTime?: string;
  status?: BookingStatus;
}
