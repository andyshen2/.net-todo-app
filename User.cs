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
            // public int Id {get; set;}
            public string Name {get; set;}
    }
    public class UserContext : DbContext
    {
            public UserContext(DbContextOptions<UserContext> options)
          : base(options)
            { }
            public DbSet<User> Users { get; set; }

    }
}
