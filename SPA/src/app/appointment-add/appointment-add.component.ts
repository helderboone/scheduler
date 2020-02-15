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
      PatientBirthdate: ['', Validators.required ],
      StartDate: ['', Validators.required ],
      EndDate: ['', Validators.required ]
    });
  }

  addAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations) {
    this.appointmentService.addAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations);
  }

  ngOnInit(): void {
  }

}
