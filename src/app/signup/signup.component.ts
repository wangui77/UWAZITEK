import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router'; 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  template:`
  
<section class='signup'>
<form [formGroup]="signupForm" class='signup-form' (ngSubmit)="onSubmit()">
<div class='form-group'>
<label for="HospitalName">HospitalName:</label>
<input type="text" id="HospitalName" formControlName="hospitalName" placeholder="Enter your HospitalName" required>

<label for="FirstName">FirstName:</label>
<input type="text" id="FirstName" formControlName="firstName" placeholder="Enter your FirstName" required>

<label for="Surname">Surname:</label>
<input type="text" id="Surname" formControlName="surname" placeholder="Enter your Surname" required>


<label for="Email">Email:</label>
<input type="email" id="Email" formControlName="email" placeholder="Enter email" required>

<label for="Password">Password:</label>
<input type="password" id="Password" formControlName="password" placeholder="Create a Password" required>

<button type="submit">Sign Up</button>
<p>Already have an account? <a routerLink="/login">Login here</a>.</p>
</div>
</form>
</section>
`,

  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
       hospitalName: ['', Validators.required],
        firstName: ['', Validators.required],
        surname: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
     
      console.log('Signup Form Submitted', this.signupForm.value);
      this.router.navigate(['/login']);
    } else {
      console.log('Form Invalid');
    }
  }
  
  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }
}

       

