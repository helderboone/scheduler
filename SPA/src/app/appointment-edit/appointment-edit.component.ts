import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '../appointments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.css']
})
export class AppointmentEditComponent implements OnInit {

  angForm: FormGroup;
  appointment: any = {};  
  constructor(private route: ActivatedRoute, private router: Router,
    private appointmentsService: AppointmentsService, private fb: FormBuilder, private toastr: ToastrService) {
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentsService.editAppointment(params['id']).subscribe(res => {
        this.appointment = res;
        this.appointment.patientBirthdate = this.formatDate(this.appointment.patientBirthdate);
      });
    });
  }

  updateAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations) {
    this.route.params.subscribe(params => {
      this.appointmentsService.updateAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations, params.id).subscribe(() => {
        this.router.navigate(['/appointments']);
        this.toastr.success('Appointment updated successfully', 'Success');
      }, error => {
        this.toastr.error(error.error, 'Error');
      });
    });
  }
  
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }  
}
