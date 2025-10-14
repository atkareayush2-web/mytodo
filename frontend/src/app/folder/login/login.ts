import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  // -------------------------------------------
  // Flag to toggle between login & registration forms
  // -------------------------------------------
  toggleForm: boolean = false;

  // -------------------------------------------
  // Model for new user registration
  // -------------------------------------------
  registerObj: any = {
    userId: 0,
    fullName: "",
    emailId: "",
    password: "",
    mobileNo: "",
    createdDate: new Date()
  };

  // -------------------------------------------
  // Model for user login
  // -------------------------------------------
  loginObj: any = {
    emailId: "",
    password: ""
  };

  // -------------------------------------------
  // Inject dependencies
  // -------------------------------------------
  http = inject(HttpClient);
  router = inject(Router);

  // -------------------------------------------
  // Hard-coded admin credentials
  // -------------------------------------------
  private ADMIN_EMAIL = "admin@todo.com";
  private ADMIN_PASSWORD = "admin123";

  // -------------------------------------------
  // Switch between login & register forms
  // -------------------------------------------
  toggleFormView(toRegister: boolean) {
    this.toggleForm = toRegister;
  }

  // -------------------------------------------
  // Register new user (with validation)
  // -------------------------------------------
  onRegister(regForm?: any) {
    // ✅ Form-level validation
    if (regForm?.invalid) {
      alert("⚠️ Please fill in all required fields correctly.");
      return;
    }

    this.http.post("https://localhost:7056/api/user/CreateNewUser", this.registerObj)
      .subscribe({
        next: (res: any) => {
          alert("✅ Registration Successful!");

          const userData = res.userData;
          if (userData) {
            // Optionally auto-login new user
            localStorage.setItem('userApp', JSON.stringify(userData));
          }

          // Reset registration form
          this.registerObj = {
            userId: 0,
            fullName: "",
            emailId: "",
            password: "",
            mobileNo: "",
            createdDate: new Date()
          };

          // Switch to login form
          this.toggleForm = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('❌ Registration error:', error);
          if (error.status === 400) {
            alert("⚠️ Registration failed: Email may already be in use.");
          } else {
            alert(`Unexpected error: ${error.status} - ${error.statusText}`);
          }
        }
      });
  }

  // -------------------------------------------
  // Handle user login
  // -------------------------------------------
  onLogin(loginForm?: any) {
    // ✅ Validate form before sending API
    if (loginForm?.invalid) {
      alert("⚠️ Please enter valid email and password.");
      return;
    }

    // Admin login check
    if (this.loginObj.emailId === this.ADMIN_EMAIL && this.loginObj.password === this.ADMIN_PASSWORD) {
      alert("👑 Admin Login Successful!");
      localStorage.setItem('userApp', JSON.stringify({
        fullName: 'Admin',
        emailId: this.ADMIN_EMAIL
      }));
      this.router.navigateByUrl('/user-list');
      return;
    }

    // Normal user login via API
    this.http.post("https://localhost:7056/api/user/Login", this.loginObj)
      .subscribe({
        next: (res: any) => {
          alert("🎉 Login Successful!");

          const userData = res.userData;
          localStorage.setItem('userApp', JSON.stringify(userData));

          setTimeout(() => {
            this.router.navigateByUrl('/welcome');
          }, 500);
        },
        error: (error: HttpErrorResponse) => {
          if (!navigator.onLine) {
            alert("No internet connection. Please check your network.");
          } else if (error.status === 0) {
            alert("CORS or network error: Could not reach server.");
          } else if (error.status === 401) {
            alert("Unauthorized: Invalid email or password.");
          } else {
            alert(`Unexpected error: ${error.status} - ${error.statusText}`);
          }
        }
      });
  }

}
