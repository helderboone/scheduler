﻿using AutoMapper;

namespace API.Features.Appointment
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Create.Command, Models.Appointment>().ReverseMap();
        }
    }
}
