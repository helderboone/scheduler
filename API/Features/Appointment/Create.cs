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
    public class Create
    {
        public class Command : IRequest
        {
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
                RuleFor(x => x.PatientName).NotEmpty();
                RuleFor(x => x.PatientBirthdate).NotNull();
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
                var appointment = _mapper.Map<Command, Models.Appointment>(request);

                if(_context.Appointments.Any(Models.Appointment.SameRangeTime(request.StartDate.Value, request.EndDate.Value)))
                    throw new RestException(HttpStatusCode.BadRequest, new { Appointment = "Appointment already scheduled at this time" });

                _context.Appointments.Add(appointment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
