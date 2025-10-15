import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  taskService = inject(TaskService);

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  tasks: any[] = [];

  ngOnInit(): void {
    // TODO: Replace 1 with the actual logged-in user's ID when auth is ready
    this.loadTasks(1);
  }

  loadTasks(userId: number) {
    this.taskService.getTasks(userId).subscribe({
      next: (res: any[]) => {
        this.tasks = res;
        this.totalTasks = res.length;
        this.completedTasks = res.filter(t => t.isCompleted).length;
        this.pendingTasks = res.filter(t => !t.isCompleted).length;
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
      }
    });
  }
}
