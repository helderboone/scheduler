using API;
using API.Error;
using API.Features.Appointment;
using API.Infra;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Xunit;

namespace Test
{
    public class AppointmentTests
    {
        private readonly IMediator _mediator;

        public AppointmentTests()
        {
            var services = new ServiceCollection();

            services.AddMediatR(typeof(Create.Command));

            services.AddAutoMapper(typeof(Startup));

            var serviceProvider = services.BuildServiceProvider();

            //services.AddDbContext<DataContext>(opt => opt.UseInMemoryDatabase(databaseName: "InMemoryDb"), ServiceLifetime.Scoped, ServiceLifetime.Scoped);
            services.AddDbContext<DataContext>(options => options.UseSqlite("Data source=testscheduler.db"));

            var context = services.BuildServiceProvider().GetService<DataContext>();

            context.Database.EnsureDeleted();

            context.Database.Migrate();

            _mediator = services.BuildServiceProvider().GetService<IMediator>();
        }


        [Fact]
        public async Task Should_Create_With_Success()
        {
            var command = new Create.Command
            {
                Id = 1,
                PatientName = "Joao",
                PatientBirthdate = DateTime.Now.AddYears(-30),
                StartDate = new DateTime(2020, 03, 01, 09, 00, 00),
                EndDate = new DateTime(2020, 03, 01, 10, 00, 00),
                Observations = string.Empty,
            };

            var actual = await _mediator.Send(command);

            Assert.Equal(Unit.Value, actual);
        }

        [Fact]
        public async Task Should_Not_Create_And_Return_BadRequest400()
        {
            var command = new Create.Command
            {
                Id = 1,
                PatientName = "Joao",
                PatientBirthdate = DateTime.Now.AddYears(-30),
                StartDate = new DateTime(2020, 03, 01, 09, 00, 00),
                EndDate = new DateTime(2020, 03, 01, 10, 00, 00),
                Observations = string.Empty,
            };

            await _mediator.Send(command);

            var commandTwo = new Create.Command
            {
                Id = 2,
                PatientName = "Joao Teste",
                PatientBirthdate = DateTime.Now.AddYears(-20),
                StartDate = new DateTime(2020, 03, 01, 09, 00, 00),
                EndDate = new DateTime(2020, 03, 01, 10, 00, 00),
                Observations = string.Empty,
            };

            var ex = await Assert.ThrowsAsync<RestException>(() => _mediator.Send(commandTwo));

            Assert.Equal(HttpStatusCode.BadRequest, ex.Code);
        }

        [Fact]
        public async Task Should_Get_All()
        {
            var query = new List.Query { Date = null };

            var actual = await _mediator.Send(query);

            var expected = new List<AppointmentDto>();

            Assert.Equal(expected, actual);
        }

        [Fact]
        public async Task Should_Delete_With_Success()
        {
            var command = new Create.Command
            {
                Id = 1,
                PatientName = "Joao",
                PatientBirthdate = DateTime.Now.AddYears(-30),
                StartDate = new DateTime(2020, 03, 01, 09, 00, 00),
                EndDate = new DateTime(2020, 03, 01, 10, 00, 00),
                Observations = string.Empty,
            };

            await _mediator.Send(command);

            var commandDelete = new Delete.Command { Id = 1 };

            var actual = await _mediator.Send(commandDelete);

            Assert.Equal(Unit.Value, actual);
        }
    }
}
