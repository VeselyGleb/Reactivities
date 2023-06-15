using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Calculations;

namespace API.Controllers
{
    public class CalculatubeController : BaseApiController 
    {
        [HttpGet] //api/calculatube
        public async Task<ActionResult<List<Calculation>>> GetCalculatube()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] //api/calculatube/fdfkdffdfd
        public async Task<ActionResult<Calculation>> GetCalculator(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateCalculator(Calculation calculation)
        {
            return Ok(await Mediator.Send(new Create.Command {Calculation = calculation}));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditCalculator(Guid id, Calculation calculation)
        {
            calculation.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Calculation = calculation}));
        }
    }
}