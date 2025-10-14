import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userwelcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userwelcome.html',
  styleUrls: ['./userwelcome.css']
})
export class UserWelcomeComponent implements OnInit {
  
  router = inject(Router);

  // -------------------------------------------
  // Logged-in user info
  // -------------------------------------------
  userName: string | null = '';

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');

    // If user not logged in, redirect to login page
    if (!user || !user.emailId) {
      this.router.navigateByUrl('/login');
      return;
    }

    // If admin, redirect to user list
    if (user.emailId === 'admin@todo.com') {
      this.router.navigateByUrl('/user-list');
      return;
    }

    // Normal user: show name
    this.userName = user.fullName;
  }

  // -------------------------------------------
  // Navigation helpers
  // -------------------------------------------
  goToTaskList() {
    this.router.navigateByUrl('/task-list');
  }

  goToCreateTask() {
    this.router.navigateByUrl('/create-task');
  }

  logout() {
    localStorage.removeItem('userApp'); // clear session
    this.router.navigateByUrl('/login');
  }
}
