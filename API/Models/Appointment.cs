using System;

namespace API.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public string PatientName { get; set; }

        public DateTime PatientBirthdate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Observations { get; set; }
    }
}
