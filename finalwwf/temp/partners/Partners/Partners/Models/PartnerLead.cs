using System.ComponentModel.DataAnnotations;

namespace Partners.Models
{
    public class PartnerLead
    {
        public int Id { get; set; }

        [Required, MaxLength(100), EmailAddress]
        public string Email { get; set; }

        [Required, MaxLength(80)]
        public string Name { get; set; }

        [Required, MaxLength(30)]
        public string Phone { get; set; }

        [Required, MaxLength(50)]
        public string State { get; set; }  // NEW: Indian state

        [Required, MaxLength(150)]
        public string Location { get; set; }  // Specific business address

        [Required]
        public int Category { get; set; }

        [Required]
        public bool AcceptTerms { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
