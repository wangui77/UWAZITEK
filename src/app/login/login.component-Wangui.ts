import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="logo-container">
      <img src="assets/logo.jpg" alt="Project Image" class="logo-image">
    </div>
    <div class="login-container"></div>

    <section class="login">
      <form [formGroup]="loginForm" class="login-form" (ngSubmit)="onSubmit()">
        <div class="form-values">
          <label for="email">Email:</label>
          <input type="email" id="email" formControlName="email" placeholder="Enter email" required />
          
          <label for="password">Password:</label>
          <input type="password" id="password" formControlName="password" placeholder="Enter Password" required />
          
          <button type="submit">Login</button>
          <p>Don't have an account? <a routerLink="signup">Signup</a>.</p>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    // Initialize form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Full API Response:', response);

          // Extract JWT and decode it
          const jwt = response?.data?.jwt;
          if (!jwt) {
            console.error('JWT not found in response');
            return;
          }

          // Decode the JWT to determine the user type (role)
          const decodedToken = this.decodeJWT(jwt);
          const userRole = decodedToken?.role;

          console.log('Decoded user role:', userRole);

          // Save JWT in local storage
          localStorage.setItem('authToken', jwt);

          // Redirect with query parameters based on role
          if (userRole === 'ROLE_HOSPITAL_ADMIN') {
            this.router.navigate(['/hospital-dashboard/dashboard'], { queryParams: { userType: 'hospital' } });
          } else if (userRole === 'ROLE_INSURANCE_ADMIN') {
            this.router.navigate(['/insurance-dashboard/home'], { queryParams: { userType: 'insurance' } });
          } else {
            console.error('Invalid user role:', userRole);
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }

  // Helper to decode JWT
  decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return null;
    }
  }

  // Getter for email form control
  get email() {
    return this.loginForm.get('email');
  }

  // Getter for password form control
  get password() {
    return this.loginForm.get('password');
  }
}
