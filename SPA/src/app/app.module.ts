import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { AppointmentGetComponent } from './appointment-get/appointment-get.component';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentsService } from './appointments.service';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentAddComponent,
    AppointmentGetComponent,
    AppointmentEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AppointmentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }