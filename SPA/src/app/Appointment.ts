export default class Appointment {
    id: number;
    patientName: string;
    patientBirthdate: Date | string;
    startDate: Date | string;
    endDate: Date | string;
    observations: string;
  }