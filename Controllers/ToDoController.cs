using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using todo_app.Services;

// 

namespace todo_app.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {   
        private readonly UserManager<IdentityUser> _userManager;
         private IUserService _userService;
        private readonly UserContext _context;

        private readonly IConfiguration _configuration;
        private string _connectionString;
        // DbContextOptionsBuilder<UserContext> _optionsBuilder;

        [ActivatorUtilitiesConstructor]
        public ToDoController (IConfiguration configuration, UserContext context, IUserService userService)
        {
            _context = context;
            _configuration = configuration;
            _userService = userService;
        }
        private readonly ILogger<ToDoController> _logger;

        public ToDoController(ILogger<ToDoController> logger)
        {
            _logger = logger;
        }

     
          [HttpGet]
            public async Task<ActionResult<IEnumerable<ToDo>>> GetTodoItems()
            {
                Console.WriteLine("here");
                return await _context.ToDos
                    .Select(x => ItemToDTO(x))
                    .ToListAsync();
            }

        [HttpPost]
        public async Task<ActionResult<ToDo>> PostTodo(ToDo todoItem)
        {
           var currentUserId = int.Parse(User.Identity.Name);

            // Console.WriteLine("current id " + currentUserId);
            todoItem.UserId = currentUserId;
           
            Console.WriteLine("todo userid" + todoItem.UserId);
           
            _context.ToDos.Add(todoItem);
            await _context.SaveChangesAsync();


            var user = _userService.GetById(currentUserId);


            _userService.getAllToDo(currentUserId);
        //     // Console.WriteLine("user.todo " +  user.ToDos.);
        //    foreach(var i in user.ToDos){
        //        Console.WriteLine(i.Summary);
        //    }
            //return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
            return CreatedAtAction(nameof(ToDo), new { id = todoItem.Id }, todoItem);
            
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, ToDo todoItem)
        {
            Console.WriteLine(id);
             if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
         private bool TodoItemExists(long id)
        {
            return _context.ToDos.Any(e => e.Id == id);
        }   
         private static ToDo ItemToDTO(ToDo todoItem) =>
        new ToDo
        {
            Id = todoItem.Id,
            Summary = todoItem.Summary,
            Finshed = todoItem.Finshed,
            UserId = todoItem.UserId
        };       

    }
}
