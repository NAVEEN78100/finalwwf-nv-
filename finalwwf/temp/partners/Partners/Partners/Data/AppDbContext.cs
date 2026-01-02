using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Partners.Models;

namespace Partners.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<PartnerLead> PartnerLeads => Set<PartnerLead>();
    }
}
