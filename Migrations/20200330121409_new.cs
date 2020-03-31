using Microsoft.EntityFrameworkCore.Migrations;

namespace todo_app.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "ToDos",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "User",
                columns: table => new
                {
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Name);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ToDos_UserName",
                table: "ToDos",
                column: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDos_User_UserName",
                table: "ToDos",
                column: "UserName",
                principalTable: "User",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDos_User_UserName",
                table: "ToDos");

            migrationBuilder.DropTable(
                name: "User");

            migrationBuilder.DropIndex(
                name: "IX_ToDos_UserName",
                table: "ToDos");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "ToDos");
        }
    }
}
