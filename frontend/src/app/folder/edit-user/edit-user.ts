import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.css']
})
export class EditUserComponent implements OnInit {
  user: any = {};
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadUser(+id);
  }

  // ----------------------
  // Fetch user data by ID
  // ----------------------
  loadUser(id: number) {
    this.userService.getUserById(id).subscribe({
      next: (res) => this.user = res,
      error: (err) => {
        console.error('❌ Failed to fetch user:', err);
        alert('Error fetching user details.');
      }
    });
  }

  // ----------------------
  // Update user
  // ----------------------
  updateUser() {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.router.navigate(['/user-list']); // Go back to user list
      },
      error: (err) => {
        console.error('❌ Failed to update user:', err);
        alert('Error updating user.');
      }
    });
  }
}
