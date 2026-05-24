using System;

namespace WhisperLink.Domain.Entities
{
    // Clasa de bază pentru toate entitățile - proprietăți comune
    public abstract class BaseEntity
    {
        // ID unic - primary key
        public int Id { get; set; }

        // Data creării
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Data ultimei modificări
        public DateTime? UpdatedAt { get; set; }
    }
}