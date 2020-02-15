import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  angForm: FormGroup;
  appointment: any = {};

  constructor(private route: ActivatedRoute, private router: Router,
    private appointmentsService: AppointmentsService, private fb: FormBuilder) {
      this.createForm();
    }

  createForm() {
    this.angForm = this.fb.group({
      PatientName: ['', Validators.required ],
      PatientBirthdate: ['', Validators.required ],
      StartDate: ['', Validators.required ],
      EndDate: ['', Validators.required ],
      Observations: ['', Validators.required ],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentsService.editAppointment(params['id']).subscribe(res => {
        this.appointment = res;
      });
    });
  }

  updateAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations) {
    this.route.params.subscribe(params => {
      this.appointmentsService.updateAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations, params.id);
      this.router.navigate(['appointments']);
    });
  }
}
