import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ For ngModel binding
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {

  // -------------------------------------------
  // Array to hold tasks fetched from backend
  // -------------------------------------------
  tasks: any[] = [];

  // -------------------------------------------
  // Inject services
  // -------------------------------------------
  taskService = inject(TaskService);
  router = inject(Router);

  // -------------------------------------------
  // Store current logged-in user info
  // -------------------------------------------
  currentUser: any;

  ngOnInit(): void {
    // Get logged-in user from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('userApp') || '{}');

    if (!this.currentUser || !this.currentUser.userId) {
      // If somehow user not logged in, redirect to login
      this.router.navigateByUrl('/login');
      return;
    }

    // Load all tasks for this user
    this.loadTasks();
  }

  // -------------------------------------------
  // Fetch tasks from backend
  // -------------------------------------------
  loadTasks() {
    this.taskService.getTasks(this.currentUser.userId).subscribe({
      next: (res: any) => {
        this.tasks = res;
      },
      error: (err) => {
        console.error('❌ Failed to fetch tasks:', err);
        alert('Error loading tasks. Please check console.');
      }
    });
  }

  // -------------------------------------------
  // Delete a task by ID
  // -------------------------------------------
  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          alert('Task deleted successfully!');
          this.loadTasks();
        },
        error: (err) => {
          console.error('❌ Failed to delete task:', err);
          alert('Error deleting task. Please check console.');
        }
      });
    }
  }

  // -------------------------------------------
  // Navigate to edit task page
  // -------------------------------------------
  editTask(task: any) {
    this.router.navigate(['/edit-task', task.taskId]);
  }

  // -------------------------------------------
  // Navigate to create new task page
  // -------------------------------------------
  createTask() {
    this.router.navigate(['/create-task']);
  }

  // -------------------------------------------
  // Navigate back to welcome page
  // -------------------------------------------
  goBack() {
    this.router.navigate(['/welcome']);
  }

  // -------------------------------------------
  // Mark task as complete or undo
  // -------------------------------------------
  toggleComplete(task: any) {
    // Toggle the property that matches the backend
    task.isCompleted = !task.isCompleted;

    // Call backend to update this task
    this.taskService.updateTask(task.taskId, task).subscribe({
      next: () => {
        console.log(`Task "${task.title}" status updated to ${task.isCompleted ? 'Completed' : 'Pending'}`);
      },
      error: (err) => {
        console.error('❌ Failed to update task:', err);
        // Revert the toggle in case of error
        task.isCompleted = !task.isCompleted;
        alert('Error updating task status. Please try again.');
      }
    });
  }
}
