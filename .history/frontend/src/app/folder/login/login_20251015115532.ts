import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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

  toggleForm: boolean = false;

  registerObj: any = {
    userId: 0,
    fullName: "",
    emailId: "",
    password: "",
    mobileNo: "",
    createdDate: new Date()
  };

  loginObj: any = {
    emailId: "",
    password: ""
  };

  http = inject(HttpClient);
  router = inject(Router);

  private ADMIN_EMAIL = "admin@todo.com";
  private ADMIN_PASSWORD = "admin123";

  toggleFormView(toRegister: boolean) {
    this.toggleForm = toRegister;
  }

  // -------------------------
  // Register new user
  // -------------------------
  onRegister(form: NgForm) {
    if (!form.valid) {
      alert("⚠️ Please fill in all required fields correctly.");
      return;
    }

    this.http.post("https://localhost:7056/api/user/CreateNewUser", this.registerObj)
      .subscribe({
        next: (res: any) => {
          alert("✅ Registration Successful!");

          const userData = res.userData;
          if (userData) localStorage.setItem('userApp', JSON.stringify(userData));

          // Reset form
          this.registerObj = { userId:0, fullName:"", emailId:"", password:"", mobileNo:"", createdDate: new Date() };
          form.resetForm();
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

  // -------------------------
  // Login
  // -------------------------
  onLogin(form: NgForm) {
    if (!form.valid) {
      alert("⚠️ Please enter valid email and password.");
      return;
    }

    // Admin login
    if (this.loginObj.emailId === this.ADMIN_EMAIL && this.loginObj.password === this.ADMIN_PASSWORD) {
      alert("👑 Admin Login Successful!");
      localStorage.setItem('userApp', JSON.stringify({ fullName:'Admin', emailId:this.ADMIN_EMAIL }));
      this.router.navigateByUrl('/user-list');
      return;
    }

    // Normal user login
    this.http.post("https://localhost:7056/api/user/Login", this.loginObj)
      .subscribe({
        next: (res: any) => {
          alert("🎉 Login Successful!");
          localStorage.setItem('userApp', JSON.stringify(res.userData));
          setTimeout(() => this.router.navigateByUrl('/welcome'), 500);
        },
        error: (error: HttpErrorResponse) => {
          if (!navigator.onLine) alert("No internet connection.");
          else if (error.status === 0) alert("CORS or network error.");
          else if (error.status === 401) alert("Invalid email or password.");
          else alert(`Unexpected error: ${error.status} - ${error.statusText}`);
        }
      });
  }

}
