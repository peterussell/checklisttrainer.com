using Microsoft.EntityFrameworkCore;

namespace api.Models;

public class ChecklistTrainerContext : DbContext
{
    public ChecklistTrainerContext(DbContextOptions<ChecklistTrainerContext> options) : base(options)
    {
    }

    public DbSet<Aircraft> Aircraft { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
}
