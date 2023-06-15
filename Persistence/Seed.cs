using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {

            if (context.Calculations.Any()) {
                    var calcs = context.Calculations.ToList();
                    context.Calculations.RemoveRange(calcs);
                    context.SaveChanges();

            };
            
            var calculations = new List<Calculation>
            {
                new Calculation
                {
                    Title = "Расчёт по ТР ТС 032/2013",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Type = "Gas",
                    Group = "1",
                    Diameter = "150",
                    Pressure = "3",
                },
                new Calculation
                {
                    Title = "Test",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Type = "tst",
                    Group = "a",
                    Diameter = "1",
                    Pressure = "0",
                },
                new Calculation
                {
                    Title = "Test0",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Type = "tshfmt",
                    Group = "akg",
                    Diameter = "uu1",
                    Pressure = "u0uu",
                },
                new Calculation
                {
                    Title = "TestDGEATGHARGAEAA",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Type = "tshfmt",
                    Group = "akg",
                    Diameter = "uu1",
                    Pressure = "u0uu",
                }
            };

            //await context.Activities.AddRangeAsync(activities);
            await context.Calculations.AddRangeAsync(calculations);
            await context.SaveChangesAsync();
        }
    }
}