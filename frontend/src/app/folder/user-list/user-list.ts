import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
// ... existing imports
export class UserListComponent implements OnInit {

  users: any[] = [];
  searchTerm: string = '';

  userService = inject(UserService);
  router = inject(Router);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any) => this.users = res,
      error: (err) => console.error('Failed to load users:', err)
    });
  }

  filteredUsers() {
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(u =>
      u.fullName.toLowerCase().includes(term) ||
      u.emailId.toLowerCase().includes(term)
    );
  }

  editUser(user: any) {
    this.router.navigate(['/edit-user', user.userId]);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Failed to delete user:', err)
      });
    }
  }

  // -------------------------------
  // ✅ Logout function
  // -------------------------------
  logout() {
    localStorage.removeItem('userApp'); // Clear admin session
    this.router.navigateByUrl('/login');
  }
}
