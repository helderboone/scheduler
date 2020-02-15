import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppointmentsService {
  uri = 'http://localhost:5000/api/appointment/';

  constructor(private http: HttpClient) { }

  addAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations) {
    const obj = {
      PatientName,
      PatientBirthdate,
      StartDate,
      EndDate,
      Observations
    };
    console.log(obj);
    this.http.post(`${this.uri}`, obj).subscribe(res => console.log('Done'));
  }

  getAppointments() {
    return this.http
           .get(`${this.uri}`);
  }

  editAppointment(id) {
    console.log(`${this.uri}${id}`)
    return this.http
            .get(`${this.uri}${id}`);
    }

    updateAppointment(PatientName, PatientBirthdate, StartDate, EndDate, Observations, id) {
      const model = {
        PatientName,
        PatientBirthdate,
        StartDate,
        EndDate,
        Observations
      };
      this.http
        .put(`${this.uri}${id}`, model)
        .subscribe(res => console.log('Done'));
  }

  deleteAppointment(id) {
    return this.http
              .delete(`${this.uri}${id}`);
  }
}
