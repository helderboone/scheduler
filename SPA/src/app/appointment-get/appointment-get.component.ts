import { Component, OnInit } from '@angular/core';
import Appointment from '../Appointment';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment-get',
  templateUrl: './appointment-get.component.html',
  styleUrls: ['./appointment-get.component.css']
})
export class AppointmentGetComponent implements OnInit {

  appointments: Appointment[];

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentService
      .getAppointments()
      .subscribe((data: Appointment[]) => {
        this.appointments = data;
        console.log(this.appointments);
    });
  }
}
