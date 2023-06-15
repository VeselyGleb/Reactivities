using Domain;
using MediatR;
using Persistence;

namespace Application.Calculations
{
    public class Details
    {
        public class Query : IRequest<Calculation>
        {
            public Guid Id {get; set; }
        }

        public class Handler : IRequestHandler<Query, Calculation>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            _context = context;

            }
            public async Task<Calculation> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Calculations.FindAsync(request.Id);
            }
        }
    }
}