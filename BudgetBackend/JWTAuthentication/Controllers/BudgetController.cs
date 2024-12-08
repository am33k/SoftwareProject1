using JWTAuthentication.Authentication;
using JWTAuthentication.Models;
using JWTAuthentication.Services;
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
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly BudgetManager _budgetManager;

        public BudgetController(BudgetManager budgetManager)
        {
            _budgetManager = budgetManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _budgetManager.GetAllBudgetsAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) => Ok(await _budgetManager.GetBudgetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Budget budget)
        {
            budget.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _budgetManager.AddBudgetAsync(budget);
            return CreatedAtAction(nameof(GetById), new { id = budget.Id }, budget);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Budget budget)
        {
            if (id != budget.Id) return BadRequest();
            budget.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _budgetManager.UpdateBudgetAsync(budget);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _budgetManager.DeleteBudgetAsync(id);
            return NoContent();
        }
    }

}
