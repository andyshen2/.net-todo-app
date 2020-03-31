using System;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.ComponentModel.DataAnnotations;



namespace todo_app
{

    public class ToDo{
            [Key]
            public int Id {get; set;}
            public string Summary {get; set;}
            public User User {get; set;}
            public bool Finshed{ get; set; }

            // public DateTime Date { get; set; }

    }
    public class ToDoContext : DbContext
    {
        // private static DbContextOptions GetOptions(string connectionString)
        // {
        //     return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        // }
            // public ToDoContext(string connectionString ) : base(GetOptions(connectionString))
            // {
            // }
            public ToDoContext(DbContextOptions<ToDoContext> options)
          : base(options)
            { }
            public DbSet<ToDo> ToDos { get; set; }

    }
}
