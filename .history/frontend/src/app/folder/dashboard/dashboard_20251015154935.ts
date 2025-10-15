import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';

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

  currentUser: any = {}; // We'll assume user data is stored in localStorage for now

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.loadTasks(this.currentUser.userId);
    } else {
      alert('User not logged in!');
    }
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
        console.error('❌ Error loading tasks:', err);
      }
    });
  }
}
