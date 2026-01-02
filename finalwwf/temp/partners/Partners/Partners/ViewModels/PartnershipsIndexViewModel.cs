using Partners.Models;

namespace Partners.ViewModels
{
    public class PartnershipsIndexViewModel
    {
        public string HeroTitle { get; set; } = "Be a partner";
        public string HeroTagline { get; set; } = "Get listed in our application under any of these categories.";
        public List<CategoryCardVm> Cards { get; set; } = new();
        public Dictionary<PartnerCategory, string> TermsHtml { get; set; } = new();
    }

    public class CategoryCardVm
    {
        public PartnerCategory Category { get; set; }
        public string Title { get; set; } = "";
        public string Subtitle { get; set; } = "";
        public string ImageUrl { get; set; } = "";
    }
}
