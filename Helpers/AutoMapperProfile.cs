using AutoMapper;
// using WebApi.Entities;
// using WebApi.Models.Users;
using todo_app;
namespace todo_app.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // CreateMap<User, UserModel>();
            CreateMap<RegisterModel, User>();
            // CreateMap<UpdateModel, User>();
        }
    }
}