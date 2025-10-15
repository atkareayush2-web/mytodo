using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Enquiry.API.Models
{
    // -------------------------------------------------
    // 📘 TodoTask Model — represents a single user's task
    // -------------------------------------------------
    public class TodoTask
    {
        // -------------------------------
        // 🆔 Primary Key
        // -------------------------------
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TaskId { get; set; }

        // -------------------------------
        // 📌 Foreign Key: User → Tasks
        // -------------------------------
        [Required]
        public int UserId { get; set; }  // Links to Users table

        // Navigation property
        [ForeignKey("UserId")]
        public User? User { get; set; }

        // -------------------------------
        // 📋 Task details
        // -------------------------------
        [Required]
        [MaxLength(100)]
        public required string Title { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        // -------------------------------
        // 📅 Due Date & Status
        // -------------------------------
        public DateTime? DueDate { get; set; }

        public bool IsCompleted { get; set; } = false; // Default to incomplete

        // -------------------------------
        // 🕒 Created Timestamp
        // -------------------------------
        public DateTime CreatedAt { get; set; } = DateTime.Now;


    }
}
