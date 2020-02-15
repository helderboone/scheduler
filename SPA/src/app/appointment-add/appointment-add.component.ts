import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AppointmentsService } from '../appointments.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-add',
  templateUrl: './appointment-add.component.html',
  styleUrls: ['./appointment-add.component.css']
})
export class AppointmentAddComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private appointmentService: AppointmentsService, private router: Router, private toastr: ToastrService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      PatientName: ['', Validators.required ],
      PatientBirthdate: ['', Validators.required ],
      StartDate: ['', Validators.required ],
      EndDate: ['', Validators.required ],
      Observations: [''],
    });
  }

  addAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations) {
    this.appointmentService.addAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations).subscribe(() => {
      this.router.navigate(['/appointments']);
      this.toastr.success('Appointment created successfully', 'Success')
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    if(this.angForm.valid) {
      this.angForm.reset();
    }
  }

  ngOnInit(): void {
  }

}
