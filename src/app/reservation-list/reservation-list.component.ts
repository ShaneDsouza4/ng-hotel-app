import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../reservation/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {
    // Local Storage
    this.reservations = this.reservationService.getReservations();

    // API Call
    // this.reservationService.getReservations().subscribe(x => {
    //   this.reservations = x;
    // })
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id);
    // this.reservationService.deleteReservation(id).subscribe(x => {
    //   alert(x);
    // });
  }

}
