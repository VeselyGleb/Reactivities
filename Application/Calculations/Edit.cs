using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Calculations
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Calculation Calculation { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
            _mapper = mapper;
            _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var calculator = await _context.Calculations.FindAsync(request.Calculation.Id);

                _mapper.Map(request.Calculation, calculator);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
} 