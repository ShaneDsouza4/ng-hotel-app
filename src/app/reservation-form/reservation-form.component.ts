import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ["", Validators.required],
      checkOutDate: ["", Validators.required],
      guestName: ["", Validators.required],
      guestEmail: ["", [Validators.required, Validators.email]],
      roomNumber: ["", Validators.required],
    })

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      // Loacl Storage
      let reservation = this.reservationService.getReservation(id);

      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }

      //API Call
      // this.reservationService.getReservation(id).subscribe(x => {
      //   let reservation = x;

      //   if (reservation) {
      //     this.reservationForm.patchValue(reservation);
      //   }
      // })

    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        //Update
        this.reservationService.updateReservation(id, reservation);
        // this.reservationService.updateReservation(id, reservation).subscribe(x => {
        //   //alert(x);
        // });
      } else {
        // New
        this.reservationService.addReservation(reservation);
        // this.reservationService.addReservation(reservation).subscribe(x => {
        //   alert(x);
        // });
      }

      this.router.navigate(['/list'])
    }
  }

}
