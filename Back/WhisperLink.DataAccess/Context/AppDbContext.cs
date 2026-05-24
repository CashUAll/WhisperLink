using Microsoft.EntityFrameworkCore;
using WhisperLink.Domain.Entities;

namespace WhisperLink.DataAccess.Context
{
    // Context-ul aplicației - conexiunea la database
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Tabelele din database
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        // Configurare relații și restricții
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // USER - configurare
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Username).IsUnique();
                entity.HasIndex(u => u.Email).IsUnique();
            });

            // MESSAGE - configurare relații
            modelBuilder.Entity<Message>(entity =>
            {
                // Relație Sender (1 User -> N Messages trimise)
                entity.HasOne(m => m.Sender)
                    .WithMany(u => u.SentMessages)
                    .HasForeignKey(m => m.SenderId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Relație Receiver (1 User -> N Messages primite)
                entity.HasOne(m => m.Receiver)
                    .WithMany(u => u.ReceivedMessages)
                    .HasForeignKey(m => m.ReceiverId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // FRIENDSHIP - configurare relații
            modelBuilder.Entity<Friendship>(entity =>
            {
                // Relație Requester (1 User -> N Friendships cerute)
                entity.HasOne(f => f.Requester)
                    .WithMany(u => u.RequestedFriendships)
                    .HasForeignKey(f => f.RequesterId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Relație Addressee (1 User -> N Friendships primite)
                entity.HasOne(f => f.Addressee)
                    .WithMany(u => u.ReceivedFriendships)
                    .HasForeignKey(f => f.AddresseeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // REFRESH TOKEN - configurare relație
            modelBuilder.Entity<RefreshToken>(entity =>
            {
                // Relație User (1 User -> N RefreshTokens)
                entity.HasOne(rt => rt.User)
                    .WithMany(u => u.RefreshTokens)
                    .HasForeignKey(rt => rt.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}  