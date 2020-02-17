using API.Error;
using API.Infra;
using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace API.Features.Appointment
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }

            public string PatientName { get; set; }

            public DateTime? PatientBirthdate { get; set; }

            public DateTime? StartDate { get; set; }

            public DateTime? EndDate { get; set; }

            public string Observations { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.StartDate).NotNull();
                RuleFor(x => x.EndDate).NotNull().GreaterThan(x => x.StartDate);
                RuleFor(x => x.Observations).MaximumLength(100);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments.FindAsync(request.Id);

                if (appointment == null)
                    throw new RestException(HttpStatusCode.NotFound, new { appointment = "Could not find appointment" });
                
                var appointmentUpdate = _mapper.Map(request, appointment);

                var appointmentSameRange = _context.Appointments.Where(Models.Appointment.SameRangeTime(request.StartDate.Value, request.EndDate.Value)).FirstOrDefault();

                if(appointmentSameRange != null && appointmentSameRange.Id != appointment.Id)
                    throw new RestException(HttpStatusCode.BadRequest, "Appointment already scheduled at this time");

                _context.Appointments.Update(appointmentUpdate);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
