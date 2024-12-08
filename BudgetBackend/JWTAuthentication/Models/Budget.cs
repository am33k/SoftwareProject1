using Microsoft.VisualBasic;
using System;
using System.ComponentModel.DataAnnotations;

namespace JWTAuthentication.Models
{
    public class Budget
    {
        [Key]
        public int Id { get; set; }
        public string Category { get; set; }
        public string UserId { get; set; }
        public decimal Amount { get; set; }
        public DateTime? Date { get; set; }

    }
}
