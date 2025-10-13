﻿namespace TodoApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsCompleted { get; set; }

        // Relationship
        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
