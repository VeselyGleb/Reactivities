using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Calculations;

namespace API.Controllers
{
    public class CalculationsController : BaseApiController 
    {
        [HttpGet] //api/calculatube
        public async Task<ActionResult<List<Calculation>>> GetCalculations()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/calculatube/fdfkdffdfd
        public async Task<ActionResult<Calculation>> GetCalculator(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateCalculation(Calculation calculation)
        {
            return Ok(await Mediator.Send(new Create.Command {Calculation = calculation}));
        }
    }
}