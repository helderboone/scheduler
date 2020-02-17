using System;
using System.Linq.Expressions;

namespace API.Models
{
    public partial class Appointment
    {
        public int Id { get; set; }

        public string PatientName { get; set; }

        public DateTime PatientBirthdate { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Observations { get; set; }
    }

    public partial class Appointment
    {
        public static Expression<Func<Appointment, bool>> SameRangeTime(DateTime startDate, DateTime endDate)
        {
            return a => (startDate > a.StartDate && startDate < a.EndDate) ||
                        (endDate > a.StartDate && endDate < a.EndDate);
        }
    }
}
