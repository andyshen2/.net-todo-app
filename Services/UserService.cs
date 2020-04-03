using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Principal;


// using WebApi.Entities;
using todo_app.Helpers;

namespace todo_app.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
        void getAllToDo (int user);
        User AddToDo(ToDo toDo, User user);
    }

    public class UserService : IUserService
    {
        private UserContext _context;

        public UserService(UserContext context)
        {
            _context = context;
        }
    
        public void getAllToDo(int currentUserId ){
           var all =  _context.ToDos.Find(currentUserId);
           Console.WriteLine("current todo " + all.Id + " " + all.Summary ); 
        }
         public User AddToDo(ToDo todo, User user){
            // List<ToDo> icollection = new List<ToDo>();
            // icollection.Add(todo);
            // user.ToDos.Add(icollection);
            user.ToDos = new List<ToDo>();
            user.ToDos.Add(todo);
            _context.Users.Update(user);

            // Console.WriteLine("user.todo " +  user.ToDos);
            //     foreach(var i in user.ToDos){
            //         Console.WriteLine(i.Summary);
            // }


            _context.SaveChanges();
           var test = _context.Users.Find(user.Id);
            // Console.WriteLine("user.todo " +  user.ToDos);
            foreach(var i in test.ToDos){
                Console.WriteLine("todo test" + i.Summary);
            }

            return user;
        }

            public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Username == username);
           
            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            var test = _context.Users.ToList();
            Console.WriteLine(test);
            foreach ( var i in test){
                Console.WriteLine(i.ToDos);
            }
            
            
            // authentication successful
            return user;
        }

       

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.Username == user.Username))
                throw new AppException("Username \"" + user.Username + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();
            
            return user;
        }


        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // // update username if it has changed
            // if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            // {
            //     // throw error if the new username is already taken
            //     if (_context.Users.Any(x => x.Username == userParam.Username))
            //         throw new AppException("Username " + userParam.Username + " is already taken");

            //     user.Username = userParam.Username;
            // }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}