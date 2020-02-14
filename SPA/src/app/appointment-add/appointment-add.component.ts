import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private appointmentService: AppointmentsService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      PatientName: ['', Validators.required ],
      Observations: ['', Validators.required ],
    });
  }

  addAppointment(PatientName, Observations) {
    this.appointmentService.addAppointment(PatientName, Observations);
  }

  ngOnInit(): void {
  }

}
