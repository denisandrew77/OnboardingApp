using Microsoft.EntityFrameworkCore;
using OnboardingBackend.Models;

namespace OnboardingBackend.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Team> Teams => Set<Team>();
    public DbSet<Employee> Employees => Set<Employee>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Department>(department =>
        {
            department.Property(value => value.Name)
                .HasMaxLength(100)
                .IsRequired();

            department.Property(value => value.Description)
                .HasMaxLength(500);

            department.HasIndex(value => value.Name)
                .IsUnique();

            department.HasMany(value => value.Teams)
                .WithOne(value => value.Department)
                .HasForeignKey(value => value.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Team>(team =>
        {
            team.Property(value => value.Name)
                .HasMaxLength(100)
                .IsRequired();

            team.Property(value => value.Description)
                .HasMaxLength(500);

            team.HasIndex(value => new { value.DepartmentId, value.Name })
                .IsUnique();

            team.HasMany(value => value.Members)
                .WithOne(value => value.Team)
                .HasForeignKey(value => value.TeamId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Employee>(employee =>
        {
            employee.Property(value => value.FirstName)
                .HasMaxLength(100)
                .IsRequired();

            employee.Property(value => value.LastName)
                .HasMaxLength(100)
                .IsRequired();

            employee.Property(value => value.Email)
                .HasMaxLength(254)
                .IsRequired();

            employee.Property(value => value.JobTitle)
                .HasMaxLength(150)
                .IsRequired();

            employee.Property(value => value.CurrentOnboardingStep)
                .HasMaxLength(50)
                .IsRequired();

            employee.HasIndex(value => value.Email)
                .IsUnique();

            employee.HasOne(value => value.Manager)
                .WithMany(value => value.DirectReports)
                .HasForeignKey(value => value.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
