import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Required for ngModel
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task.html',
  styleUrls: ['./create-task.css']
})
export class CreateTaskComponent {

  // -------------------------------------------
  // Inject TaskService to call backend APIs
  // Inject Router for navigation
  // -------------------------------------------
  taskService = inject(TaskService);
  router = inject(Router);

  // -------------------------------------------
  // Task model object bound to form inputs
  // -------------------------------------------
  taskObj: any = {
    taskId: 0,           // backend will assign if auto-generated
    title: '',
    description: '',
    completed: false,     // default status
    userId: 0            // will set from logged-in user
  };

  // -------------------------------------------
  // Get current logged-in user from localStorage
  // -------------------------------------------
  currentUser: any = JSON.parse(localStorage.getItem('userApp') || '{}');

  constructor() {
    if (this.currentUser && this.currentUser.userId) {
      this.taskObj.userId = this.currentUser.userId;
    }
  }

  // -------------------------------------------
  // Submit the task form
  // -------------------------------------------
  createTask() {
    // Basic validation
    if (!this.taskObj.title || !this.taskObj.description) {
      alert('Please fill in all fields.');
      return;
    }

    // Call API to create task
    this.taskService.createTask(this.taskObj).subscribe({
      next: (res: any) => {
        alert('✅ Task created successfully!');
        // Navigate back to task list
        this.router.navigateByUrl('/task-list');
      },
      error: (err) => {
        console.error('❌ Failed to create task:', err);
        alert('Error creating task. Please check console.');
      }
    });
  }

  // -------------------------------------------
  // Cancel and go back to task list
  // -------------------------------------------
  cancel() {
    this.router.navigateByUrl('/task-list');
  }
}
