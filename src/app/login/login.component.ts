import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  template: `
<section class='login'>
  <form [formGroup]="loginForm" class='login-form' (ngSubmit)="onSubmit()">
    <div class='form-group'>
      <label for="Email">Email:</label>
      <input type="email" id="Email" formControlName="email" placeholder="Enter email" required>
      
      <label for="Password">Password:</label>
      <input type="password" id="Password" formControlName="password" placeholder="Enter Password" required>
      
      <button type="submit">Login</button>
      <p>Don't have an account? <a routerLink="/signup">Signup here</a>.</p>
    </div>
  </form>
</section>
  `,
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the loginForm in the constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login successful!', this.loginForm.value);
      this.router.navigate(['/dashboard']); 
    } else {
      console.log('Form Invalid');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
