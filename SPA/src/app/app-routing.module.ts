import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { AppointmentGetComponent } from './appointment-get/appointment-get.component';

const routes: Routes = [
  {
    path: 'appointment/create',
    component: AppointmentAddComponent
  },
  {
    path: 'edit/:id',
    component: AppointmentEditComponent
  },
  {
    path: 'appointments',
    component: AppointmentGetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }