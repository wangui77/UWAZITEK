
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
ngOnInit():void{
  const signupType=localStorage.getItem('signupType');
}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Full API Response:', response);
        // Get JWT and signup type from the response or fallback to localStorage 
          const jwt = response?.data?.jwt;
          const signupType = response?.data?.signup_type || localStorage.getItem('signupType');
          console.log('Signup Type:', signupType);
   // Check if JWT and signupType exist
          if (jwt) {
            localStorage.setItem('authToken', jwt);
          } else {
            console.error('JWT token missing in response.');
            alert('Authentication failed. Please contact support.');
            return;
          }
  
          if (signupType) {
            localStorage.setItem('signupType', signupType);
          } else {
            console.error('Signup type missing in response.');
            alert('User type is not recognized. Please contact support.');
            return;
          }
  
          // Redirect based on signup type
          if (signupType === 'hospital') {
            console.log('Navigating to hospital dashboard...');
            this.router.navigate(['/hospital-dashboard'], {
              queryParams: { signupType: 'hospital' },
            });
          } else if (signupType === 'insurance') {
            console.log('Navigating to insurance dashboard...');
            this.router.navigate(['/insurance-dashboard'], {
              queryParams: { signupType: 'insurance' },
            });
          } else {
            console.error('Invalid signup type detected:', signupType);
            alert('Invalid user type. Please try again.');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
  

  // Logout Method
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('signupType');
    this.router.navigate(['/login']);
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
