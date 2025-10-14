import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Added CommonModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule], // ✅ Include CommonModule here
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  // Inject Router for navigation
  router = inject(Router);

  // Logged-in user's name
  userName: string | null = '';
  // Check if the logged-in user is admin
  isAdmin: boolean = false;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userApp') || '{}');
    this.userName = user.fullName || '';
    this.isAdmin = user.emailId === 'admin@todo.com';
  }

  // Logout / logoff method
  logoff() {
    localStorage.removeItem('userApp');
    this.router.navigateByUrl('/login');
  }
}
