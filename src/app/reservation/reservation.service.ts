import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiURL: string = "http://localhost:3001";

  private reservations: Reservation[] = [];

  constructor(private _http: HttpClient) {
    let savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  // CRUD
  getReservations(): Reservation[] {
    return this.reservations;
  }
  // getReservations(): Observable<Reservation[]> {
  //   return this._http.get<Reservation[]>(`${this.apiURL}/reservations`);
  // }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(x => x.id == id);
  }
  // getReservation(id: string): Observable<Reservation | undefined> {
  //   return this._http.get<Reservation>(`${this.apiURL}/reservation/${id}`);
  // }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  // addReservation(reservation: Reservation): Observable<any> {
  //   reservation.id = Date.now().toString();
  //   return this._http.post(`${this.apiURL}/reservation`, reservation);
  // }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(x => x.id == id);
    this.reservations.splice(index, 1);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  // deleteReservation(id: string): Observable<any> {
  //   return this._http.delete(`${this.apiURL}/reservation/${id}`);
  // }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(x => x.id == id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }
  // updateReservation(id: string, updatedReservation: Reservation): Observable<any> {
  //   return this._http.put(`${this.apiURL}/reservation/${id}`, updatedReservation);
  // }

}
