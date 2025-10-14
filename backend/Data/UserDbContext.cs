using Microsoft.EntityFrameworkCore;

namespace Enquiry.API.Models
{
    // ✅ DbContext manages connection between C# and the database
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

        // ✅ Table mapping for 'Users'
        public DbSet<User> Users { get; set; }

        // ✅ Table mapping for 'Tasks' with fully qualified name to avoid conflict
        public DbSet<Enquiry.API.Models.TodoTask> Tasks { get; set; }

        // ✅ Optional: Configure relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ One-to-many relationship: User -> Tasks
            modelBuilder.Entity<Enquiry.API.Models.TodoTask>()
                        .HasOne(t => t.User)
                        .WithMany()
                        .HasForeignKey(t => t.UserId)
                        .OnDelete(DeleteBehavior.Cascade); // deleting a user deletes tasks
        }
    }
}
