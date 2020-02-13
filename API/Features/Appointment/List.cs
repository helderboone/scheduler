using API.Infra;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Features.Appointment
{
    public class List
    {
        public class Query : IRequest<List<AppointmentDto>>
        {
            public DateTime? Date { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<AppointmentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<AppointmentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Appointments.OrderBy(x => x.StartDate).AsQueryable();

                if (request.Date.HasValue)
                {
                    queryable = queryable.Where(a => a.StartDate.Year == request.Date.Value.Year && 
                    a.StartDate.Month == request.Date.Value.Month &&
                    a.StartDate.Day == request.Date.Value.Day);
                }

                var appointments = await queryable.ToListAsync();

                return _mapper.Map<List<Models.Appointment>, List<AppointmentDto>>(appointments);
            }
        }
    }
}
