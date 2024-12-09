using JWTAuthentication.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JWTAuthentication.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        // Get all users
        [HttpGet]
        [Route("get-all-users")]
        public IActionResult GetAllUsers()
        {
            var users = userManager.Users.Select(user => new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.FirstName,
                user.LastName,
                user.Address,
                user.PostalCode,
                user.PhoneNumber
            }).ToList();

            if (!users.Any())
            {
                return NotFound(new Response { Status = "Error", Message = "No users found!" });
            }

            return Ok(new Response { Status = "Success", Message = "Users retrieved successfully!", Data = users });
        }

        // Get user by ID
        [HttpGet]
        [Route("get-user/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new Response { Status = "Error", Message = "User not found!" });
            }

            var userDetails = new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.FirstName,
                user.LastName,
                user.Address,
                user.PostalCode,
                user.PhoneNumber
            };

            return Ok(new Response { Status = "Success", Message = "User retrieved successfully!", Data = userDetails });
        }

        // Delete user by ID
        [HttpDelete]
        [Route("delete-user/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new Response { Status = "Error", Message = "User not found!" });
            }

            var result = await userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = $"User deletion failed! Errors: {errors}" });
            }

            return Ok(new Response { Status = "Success", Message = "User deleted successfully!" });
        }
    }

}
