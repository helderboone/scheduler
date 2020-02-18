using API.Error;
using API.Infra;
using MediatR;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace API.Features.Appointment
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments.FindAsync(request.Id);

                if (appointment == null)
                    throw new RestException(HttpStatusCode.NotFound, "Could not find appointment");

                _context.Remove(appointment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}
