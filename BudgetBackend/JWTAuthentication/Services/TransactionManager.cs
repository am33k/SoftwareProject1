using JWTAuthentication.IRepository;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;

namespace JWTAuthentication.Services
{
    public class TransactionManager
    {
        private readonly IRepository<Models.Transaction> _repository;

        public TransactionManager(IRepository<Models.Transaction> repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Models.Transaction>> GetAllTransactionsAsync() => _repository.GetAllAsync();
        public Task<Models.Transaction> GetTransactionByIdAsync(int id) => _repository.GetByIdAsync(id);
        public Task AddTransactionAsync(Models.Transaction transaction) => _repository.AddAsync(transaction);
        public Task UpdateTransactionAsync(Models.Transaction transaction) => _repository.UpdateAsync(transaction);
        public Task DeleteTransactionAsync(int id) => _repository.DeleteAsync(id);
    }

}
