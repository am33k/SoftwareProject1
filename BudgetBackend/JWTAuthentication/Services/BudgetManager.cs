using JWTAuthentication.IRepository;
using JWTAuthentication.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JWTAuthentication.Services
{
    public class BudgetManager
    {
        private readonly IRepository<Budget> _repository;

        public BudgetManager(IRepository<Budget> repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Budget>> GetAllBudgetsAsync() => _repository.GetAllAsync();
        public Task<Budget> GetBudgetByIdAsync(int id) => _repository.GetByIdAsync(id);
        public Task AddBudgetAsync(Budget budget) => _repository.AddAsync(budget);
        public Task UpdateBudgetAsync(Budget budget) => _repository.UpdateAsync(budget);
        public Task DeleteBudgetAsync(int id) => _repository.DeleteAsync(id);
    }

}
