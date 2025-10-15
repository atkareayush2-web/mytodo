import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  // Services
  taskService = inject(TaskService);
  router = inject(Router);

  // Task stats
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  tasks: any[] = [];

  // Logged-in user
  currentUser: any = null;

  ngOnInit(): void {
    // Get user from localStorage
    const storedUser = localStorage.getItem('userApp'); // use same key as login
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);

      // Safety check
      if (!this.currentUser || !this.currentUser.userId) {
        alert('User not logged in!');
        this.router.navigateByUrl('/login');
        return;
      }

      // Load tasks for the logged-in user
      this.loadTasks(this.currentUser.userId);
    } else {
      alert('User not logged in!');
      this.router.navigateByUrl('/login'); // redirect to login
    }
  }

  // Fetch tasks from backend
  loadTasks(userId: number) {
    this.taskService.getTasks(userId).subscribe({
      next: (res: any[]) => {
        this.tasks = res || [];
        this.totalTasks = this.tasks.length;
        this.completedTasks = this.tasks.filter(t => t.isCompleted).length;
        this.pendingTasks = this.tasks.filter(t => !t.isCompleted).length;
      },
      error: (err) => {
        console.error('❌ Error loading tasks:', err);
        alert('Failed to load tasks. Please try again.');
      }
    });
  }

  // Optional: navigate to task creation page
  createTask() {
    this.router.navigateByUrl('/create-task');
  }

  // Optional: navigate back to home/dashboard
  goHome() {
    this.router.navigateByUrl('/');
  }
}
