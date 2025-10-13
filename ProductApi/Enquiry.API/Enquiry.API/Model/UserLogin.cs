using System.ComponentModel.DataAnnotations;

namespace Enquiry.API.Models
{
    // ✅ Model used for login requests
    public class UserLogin
    {
        [Required]
        [MaxLength(100)]
        public string emailId { get; set; }

        [Required]
        [MaxLength(50)]
        public string password { get; set; }
    }
}
