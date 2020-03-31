using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace todo_app.Controllers
{
  
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {   
        private readonly IConfiguration _configuration;
        private string _connectionString;
        DbContextOptionsBuilder<ToDoContext> _optionsBuilder;

        [ActivatorUtilitiesConstructor]
        public ToDoController (IConfiguration configuration)
        {
            _configuration = configuration;
            _optionsBuilder = new DbContextOptionsBuilder<ToDoContext>();
            _connectionString = _configuration.GetConnectionString("Default");
            _optionsBuilder.UseSqlServer(_connectionString);
        }
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<ToDoController> _logger;

        public ToDoController(ILogger<ToDoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<ToDo> Get()
        {
             using(ToDoContext db = new ToDoContext(_optionsBuilder.Options))
            {
                //  Create and save a new Blog
                // Console.WriteLine(db.Model);
                // Console.Write("Enter a name for a new Blog: ");
                // var name = Console.ReadLine();
                // var user = new User{ Name = "andy"};
                // var todo = new ToDo { Summary = name, User = user};
                // db.ToDos.Add(todo);
                
                // db.SaveChanges();

                // // Display all Blogs from the database
                var query = from b in db.ToDos
                            orderby b.Summary
                            select b;

                Console.WriteLine("All blogs in the database:");

                return query.ToArray();;

            }
        }
        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<ToDo>> PostTodoItem(ToDo todoItem)
        {
            Console.WriteLine("hiiihihihi");
             using(ToDoContext db = new ToDoContext(_optionsBuilder.Options))
            {
                db.ToDos.Add(todoItem);
                await db.SaveChangesAsync();

                //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
                return CreatedAtAction(nameof(ToDo), new { id = todoItem.Id }, todoItem);
            }
        }   

    }
}
