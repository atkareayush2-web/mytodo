import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Handles all Task-related API calls
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // -------------------------------------------
  // Inject HttpClient to make HTTP requests
  // -------------------------------------------
  private http = inject(HttpClient);

  // -------------------------------------------
  // Base URL of your Task API
  // -------------------------------------------
  private baseUrl = 'https://localhost:7056/api/task';

  // -------------------------------------------
  // 🧾 Get all tasks for a specific user
  // -------------------------------------------
  getTasks(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  // -------------------------------------------
  // 🔍 Get a single task by ID
  // -------------------------------------------
  getTaskById(taskId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${taskId}`);
  }

  // -------------------------------------------
  // ➕ Create a new task
  // -------------------------------------------
  createTask(taskObj: any): Observable<any> {
    return this.http.post(this.baseUrl, taskObj);
  }

  // -------------------------------------------
  // ✏️ Update an existing task
  // -------------------------------------------
  updateTask(taskId: number, taskObj: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${taskId}`, taskObj);
  }

  // -------------------------------------------
  // ❌ Delete a task
  // -------------------------------------------
  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${taskId}`, { responseType: 'text' });
  }
}
