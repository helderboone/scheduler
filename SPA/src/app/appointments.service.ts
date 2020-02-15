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
    return this
           .http
           .get(`${this.uri}`);
  }
}
