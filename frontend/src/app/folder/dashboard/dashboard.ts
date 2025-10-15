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
  displayedTasks: any[] = []; // Tasks currently shown in table

  // Logged-in user
  currentUser: any = null;

  // Filter
  currentFilter: 'all' | 'completed' | 'pending' = 'all'; // Default is all tasks

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userApp'); 
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);

      if (!this.currentUser || !this.currentUser.userId) {
        alert('User not logged in!');
        this.router.navigateByUrl('/login');
        return;
      }

      this.loadTasks(this.currentUser.userId);
    } else {
      alert('User not logged in!');
      this.router.navigateByUrl('/login');
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

        // Initialize displayed tasks
        this.applyFilter();
      },
      error: (err) => {
        console.error('❌ Error loading tasks:', err);
        alert('Failed to load tasks. Please try again.');
      }
    });
  }

  // Filter tasks based on currentFilter
  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.currentFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if (this.currentFilter === 'all') {
      this.displayedTasks = [...this.tasks];
    } else if (this.currentFilter === 'completed') {
      this.displayedTasks = this.tasks.filter(t => t.isCompleted);
    } else if (this.currentFilter === 'pending') {
      this.displayedTasks = this.tasks.filter(t => !t.isCompleted);
    }
  }

  createTask() {
    this.router.navigateByUrl('/create-task');
  }

  goHome() {
    this.router.navigateByUrl('/');
  }
}
