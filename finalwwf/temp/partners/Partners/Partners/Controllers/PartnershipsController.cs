using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Partners.Data;
using Partners.Models;
using Partners.ViewModels;

namespace Partners.Controllers
{
    public class PartnershipsController : Controller
    {
        private readonly AppDbContext _db;

        public PartnershipsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var vm = new PartnershipsIndexViewModel
            {
                HeroTitle = "Be a partner",
                HeroTagline = "Get listed in our application under any of these categories.",
                Cards = new List<CategoryCardVm>
                {
                    new() { Category = PartnerCategory.StarDines, Title = "Star Dines", Subtitle = "Premium Dining", ImageUrl = "/images/partnerships/StarDines.jpg" },
                    new() { Category = PartnerCategory.RestoBars, Title = "Resto Bars", Subtitle = "Night Clubs and Bar", ImageUrl = "/images/partnerships/RestoBars.jpg" },
                    new() { Category = PartnerCategory.HangoutSpot, Title = "Hangout Spot", Subtitle = "Cafe, Fine Dine, Dhaba, Food Street", ImageUrl = "/images/partnerships/HangoutSpots.jpg" },
                    new() { Category = PartnerCategory.Homebakers, Title = "Home Bakers", Subtitle = "Cakes & Pastries Home Cooks", ImageUrl = "/images/partnerships/HomeBakers.jpg" }
                },
                TermsHtml = new Dictionary<PartnerCategory, string>
                {
                    [PartnerCategory.StarDines] = @"<p><strong>Premium Dining Partnership:</strong></p> ...",
                    [PartnerCategory.RestoBars] = @"<p><strong>Night Clubs and Bar Partnership:</strong></p> ...",
                    [PartnerCategory.HangoutSpot] = @"<p><strong>Cafe, Fine Dine, Dhaba, Food Street Partnership:</strong></p> ...",
                    [PartnerCategory.Homebakers] = @"<p><strong>Cakes & Pastries Home Cooks Partnership:</strong></p> ..."
                }
            };
            return View(vm);
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> Submit([FromForm] PartnerLead lead, [FromForm] bool AcceptTerms)
        {
            if (!AcceptTerms)
            {
                return BadRequest(new { success = false, message = "Please accept the terms and conditions." });
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new { success = false, message = "Please check your details.", errors });
            }

            var existingLead = await _db.PartnerLeads.FirstOrDefaultAsync(p => p.Email == lead.Email);
            if (existingLead != null)
            {
                return BadRequest(new { success = false, message = "This email is already registered." });
            }

            try
            {
                lead.CreatedAt = DateTime.UtcNow; // make sure you have this field
                _db.PartnerLeads.Add(lead);
                await _db.SaveChangesAsync();

                return Ok(new { success = true, message = "Thank you! Your partnership application has been submitted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Server error: " + ex.Message });
            }
        }
    }
}
