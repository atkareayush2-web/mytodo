import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.html',
  styleUrls: ['./task-edit.css']
})
export class TaskEditComponent implements OnInit {

  // -----------------------------
  // Inject services
  // -----------------------------
  taskService = inject(TaskService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // -----------------------------
  // Task object to edit
  // -----------------------------
  task: any = {
    taskId: 0,
    title: '',
    description: '',
    dueDate: '',        // 🆕 Added due date field
    isCompleted: false, // use same name as backend
    userId: 0
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get taskId from URL
    if (id) {
      this.taskService.getTaskById(+id).subscribe({
        next: (res: any) => {
          this.task = res;

          // Convert ISO date string (from backend) into a format usable by <input type="date">
          if (this.task.dueDate) {
            this.task.dueDate = this.task.dueDate.split('T')[0];
          }
        },
        error: (err) => {
          console.error('❌ Error loading task:', err);
          alert('Error loading task. Please try again.');
          this.router.navigateByUrl('/task-list');
        }
      });
    } else {
      alert('Invalid Task ID');
      this.router.navigateByUrl('/task-list');
    }
  }

  // -----------------------------
  // Save changes to backend
  // -----------------------------
  updateTask() {
    // Simple validation
    if (!this.task.title) {
      alert('Please enter a title.');
      return;
    }

    // ✅ Convert date properly before sending
    if (this.task.dueDate) {
      this.task.dueDate = new Date(this.task.dueDate);
    }

    this.taskService.updateTask(this.task.taskId, this.task).subscribe({
      next: () => {
        alert('✅ Task updated successfully!');
        this.router.navigateByUrl('/task-list');
      },
      error: (err) => {
        console.error('❌ Error updating task:', err);
        alert('Error updating task. Please try again.');
      }
    });
  }

  // -----------------------------
  // Cancel and go back to task list
  // -----------------------------
  goBack() {
    this.router.navigateByUrl('/task-list');
  }

  // -----------------------------
  // Toggle completed status in UI only
  // -----------------------------
  toggleComplete() {
    this.task.isCompleted = !this.task.isCompleted;
  }
}
