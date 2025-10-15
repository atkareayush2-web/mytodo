import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7056/api/User';
  http = inject(HttpClient);

  // Get all users
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/GetAllUsers`);
  }

  // Get user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create new user
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateNewUser`, user);
  }

  // Update user
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${user.userId}`, user);
  }

  // Delete user
  deleteUser(id: number) {
  return this.http.delete(`https://localhost:7056/api/User/${id}`, { responseType: 'text' });
}

  // Login
  login(credentials: { emailId: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials);
  }
}
