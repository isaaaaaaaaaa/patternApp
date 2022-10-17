using PatternsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace PatternsAPI.DAL.Context
{
    public class PatternsContext : DbContext
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public PatternsContext(DbContextOptions options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
           : base(options)
        {

        }
        public DbSet<PatternType> PatternTypes { get; set; }
        public DbSet<PatternCompany> PatternCompanies { get; set; }
        public DbSet<ValueDomain> ValueDomains { get; set; }
        public DbSet<ValueDomainValue> ValueDomainValues { get; set; }
        public DbSet<Pattern> Patterns { get; set; }

  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PatternType>(entity =>
            {
                entity.ToTable("Pattern_Type");
                entity.HasKey(e => e.id);
                entity.Property(e => e.Name).HasColumnType("nvarchar(250)").IsRequired();
                entity.Property(e => e.id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
                entity.Property(e => e.CreationDateTime).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.LastUpdateDateTime).HasColumnType("datetime").IsRequired();

            });

            modelBuilder.Entity<PatternCompany>(entity =>
            {
                entity.ToTable("Pattern_Company");
                entity.HasKey(e => e.id);
                entity.Property(e => e.Name).HasColumnType("nvarchar(250)").IsRequired();
                entity.Property(e => e.Abbreviation).HasColumnType("nvarchar(50)");
                entity.Property(e => e.id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
                entity.Property(e => e.CreationDateTime).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.LastUpdateDateTime).HasColumnType("datetime").IsRequired();
            });

            modelBuilder.Entity<Pattern>(entity =>
            {
                entity.ToTable("Pattern");
                entity.HasKey(e => e.id);
                entity.Property(e => e.Name).HasColumnType("nvarchar(250)").IsRequired();
                entity.HasOne(e => e.PatternType).WithMany().HasForeignKey(e => e.PatternTypeId);
                entity.HasOne(e => e.PatternCompany).WithMany().HasForeignKey(e => e.PatternCompanyId);
                entity.Property(e => e.id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
                entity.Property(e => e.CreationDateTime).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.LastUpdateDateTime).HasColumnType("datetime").IsRequired();
            });

            modelBuilder.Entity<ValueDomain>(entity =>
            {
                entity.ToTable("Value_Domain");
                entity.HasKey(e => e.id);
                entity.Property(e => e.Name).HasColumnType("nvarchar(250)").IsRequired();
                entity.Property(e => e.EntityType).HasColumnType("nvarchar(250)").IsRequired();
                entity.Property(e => e.ValueType).HasColumnType("nvarchar(250)").IsRequired();
                entity.Property(e => e.id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
                entity.Property(e => e.CreationDateTime).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.LastUpdateDateTime).HasColumnType("datetime").IsRequired();
            });

            modelBuilder.Entity<ValueDomainValue>(entity =>
            {
                entity.ToTable("Value_Domain_Value");
                entity.HasKey(e => e.id);
                entity.Property(e => e.Value).HasColumnType("nvarchar(250)").IsRequired();
                entity.Property(e => e.id).HasColumnType("int").UseMySqlIdentityColumn().IsRequired();
                entity.Property(e => e.EntityId).HasColumnType("int").IsRequired();
                entity.Property(e => e.CreationDateTime).HasColumnType("datetime").IsRequired();
                entity.Property(e => e.LastUpdateDateTime).HasColumnType("datetime").IsRequired();
                entity.HasOne(e => e.ValueDomain).WithMany().HasForeignKey(e => e.ValueDomainId);
            });

        }


        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && (
                        e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).LastUpdateDateTime = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreationDateTime = DateTime.Now;
                }
            }

            return base.SaveChanges();
        }
    }
}
