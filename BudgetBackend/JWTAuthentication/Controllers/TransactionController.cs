using JWTAuthentication.Authentication;
using JWTAuthentication.Models;
using JWTAuthentication.Services;
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
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly TransactionManager _transactionManager;

        public TransactionController(TransactionManager transactionManager)
        {
            _transactionManager = transactionManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _transactionManager.GetAllTransactionsAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id) => Ok(await _transactionManager.GetTransactionByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Models.Transaction transaction)
        {
            transaction.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _transactionManager.AddTransactionAsync(transaction);
            return CreatedAtAction(nameof(GetById), new { id = transaction.Id }, transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Models.Transaction transaction)
        {
            if (id != transaction.Id) return BadRequest();
            transaction.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            await _transactionManager.UpdateTransactionAsync(transaction);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _transactionManager.DeleteTransactionAsync(id);
            return NoContent();
        }
    }

}
