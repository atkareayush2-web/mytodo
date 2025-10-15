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
  task: any = {};

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get taskId from URL
    if (id) {
      this.taskService.getTaskById(+id).subscribe({
        next: (res: any) => {
          this.task = res;
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
    this.task.completed = !this.task.completed;
  }
}
