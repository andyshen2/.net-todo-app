using System;
using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.ComponentModel.DataAnnotations;



namespace todo_app
{

    public class ToDo{
            // [Key]
            public int Id {get; set;}
            public string Summary {get; set;}
            public bool Finshed{ get; set; }

            public int UserId {get; set;}
            public User User {get; set;}

    }
}
//     public class ToDoContext : DbContext
//     {
//             public ToDoContext(DbContextOptions<ToDoContext> options)
//           : base(options)
//             { }
//             public DbSet<ToDo> ToDos { get; set; }

//     }
// }
