using System;
using System.ComponentModel.DataAnnotations;

namespace Enquiry.API.Models
{
    // ✅ Entity representing the 'Users' table
    public class User
    {
        [Key]
        public int userId { get; set; }

        [Required]
        [MaxLength(100)]
        public string fullName { get; set; }

        [Required]
        [MaxLength(100)]
        public string emailId { get; set; }

        [Required]
        [MaxLength(50)]
        public string password { get; set; }

        [MaxLength(15)]
        public string? mobileNo { get; set; }  // optional

        public DateTime createdDate { get; set; } = DateTime.Now;
    }
}
