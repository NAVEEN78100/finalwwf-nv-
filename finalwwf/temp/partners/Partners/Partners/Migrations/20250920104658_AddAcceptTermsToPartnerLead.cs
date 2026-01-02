using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Partners.Migrations
{
    /// <inheritdoc />
    public partial class AddAcceptTermsToPartnerLead : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CreatedUtc",
                table: "PartnerLeads",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<bool>(
                name: "AcceptTerms",
                table: "PartnerLeads",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "PartnerLeads",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcceptTerms",
                table: "PartnerLeads");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "PartnerLeads");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "PartnerLeads",
                newName: "CreatedUtc");
        }
    }
}
