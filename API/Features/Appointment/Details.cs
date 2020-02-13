using API.Error;
using API.Infra;
using AutoMapper;
using MediatR;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace API.Features.Appointment
{
    public class Details
    {
        public class Query : IRequest<AppointmentDto>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, AppointmentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<AppointmentDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments.FindAsync(request.Id);

                if (appointment == null)
                    throw new RestException(HttpStatusCode.NotFound, new { appointment = "Could not find appointment" });

                return _mapper.Map<Models.Appointment, AppointmentDto>(appointment);
            }
        }
    }
}
