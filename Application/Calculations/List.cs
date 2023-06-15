using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Calculations
{
    public class List
    {
        public class Query : IRequest<List<Calculation>> {}

        public class Handler : IRequestHandler<Query, List<Calculation>>
        {
        private readonly DataContext _context;

            public Handler(DataContext context)
            {
            _context = context;
            }

            public async Task<List<Calculation>> Handle(Query request, CancellationToken token)
            {

                return await _context.Calculations.ToListAsync();
            }
        }
    }
}