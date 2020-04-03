using System;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace todo_app
{
   
    public class User{
        [Key]
        public int Id {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string Username {get; set;}
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<ToDo> ToDos {get; set;}

    }
    public class UserContext : DbContext
    {
            public UserContext(DbContextOptions<UserContext> options)
          : base(options)
            { }

            public DbSet<ToDo> ToDos {get; set;}
            public DbSet<User> Users { get; set; }

    }
}
