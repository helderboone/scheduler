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
        this.appointments.forEach(appointment => {
          appointment.patientBirthdate = this.formatDate(appointment.patientBirthdate);
          appointment.startDate = this.formatDateWithTime(appointment.startDate);
          appointment.endDate = this.formatDateWithTime(appointment.endDate);
        });
        console.log(this.appointments);
    });
  }

  deleteAppointment(id) {
    this.appointmentService.deleteAppointment(id).subscribe(res => {
      this.appointments.splice(id, 1);
      this.ngOnInit();
    });
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
  }

  formatDateWithTime(date) {
    const time = date.split('T')[1];
    const dateFormatted = this.formatDate(date);
    return dateFormatted + ' ' + time;    
  }
}
