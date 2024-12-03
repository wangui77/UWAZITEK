import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-signup',
  standalone: true,
  template: `
    <section class='signup-section'>
      <form [formGroup]="signupForm" class='signup-form' (ngSubmit)="onSubmit()">
        <div class='form-details form-group'>
          <div class="form-values">
            
            <!-- Select whether user is signing up as a hospital or insurance -->
            <label for="signup_type">Sign up as:</label>
            <select id="signup_type" formControlName="signup_type" (change)="onSignupTypeChange($event)">
              <option value="hospital">Hospital</option>
              <option value="insurance">Insurance</option>
            </select>

            <!-- Hospital-related fields, shown only if hospital is selected -->
            <div *ngIf="isHospitalSelected()">
              <label for="hospital">Select Hospital:</label>
              <select id="hospital" formControlName="hospital_id" required>
                <option *ngFor="let hospital of hospitals" [value]="hospital.id">{{ hospital.hospital_name }}</option>
              </select>
            </div>

            <!-- Insurance-related fields, shown only if insurance is selected -->
            <div *ngIf="isInsuranceSelected()">
              <label for="insurance">Select Insurance:</label>
              <select id="insurance" formControlName="insurance_id" required>
                <option *ngFor="let insurance of insurances" [value]="insurance.insurance_id">{{ insurance.insurance_name }}</option>
              </select>
            </div>

            <!-- Common fields for both hospital and insurance -->
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" formControlName="first_name" placeholder="Enter your First Name" required>

            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" formControlName="last_name" placeholder="Enter your Last Name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" formControlName="email" placeholder="Enter email" required>

            <label for="password">Password:</label>
            <input type="password" id="password" formControlName="password" placeholder="Create a Password" required>

            <button type="submit">Sign Up</button>
            <p>Already have an account? <a routerLink="/login">Login</a>.</p>

          </div>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SignupComponent implements OnInit {
  first_name: string = '';
  signupForm: FormGroup;
  hospitals: any[] = [];  
  insurances: any[] = [];  

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
       signup_type: ['hospital', Validators.required],  
       hospital_id: [''],
       insurance_id: [''],
       first_name: ['', Validators.required],
       last_name: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.loadInsurances();
  }

  loadHospitals(): void {
    this.authService.getHospitals().subscribe(
      (data: any[]) => {
        console.log('Data received:', data);
        this.hospitals = data;
      },
      (error: any) => {
        console.error('Error fetching hospitals', error);
      }
    );
  }

  loadInsurances(): void {
    this.authService.getInsurance().subscribe(
      (data: any[]) => {
        console.log('insurance data:', data);
        this.insurances = data;  
      },
      (error) => {
        console.error('Error fetching insurances', error);  
      }
    );
  }

  onSignupTypeChange(event: any): void {
    const signupType = event.target.value;
    this.signupForm.controls['hospital_id'].reset();
    this.signupForm.controls['insurance_id'].reset();
  }

  isHospitalSelected(): boolean {
    return this.signupForm.get('signup_type')?.value === 'hospital';
  }

  isInsuranceSelected(): boolean {
    return this.signupForm.get('signup_type')?.value === 'insurance';
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(
        (response) => {
          console.log('User signed up successfully', response);
          const signupType = this.signupForm.get('signup_type')?.value; 
          console.log('SIGNUP TYPE', signupType);
          this.router.navigate(['/login'], { queryParams: { signup_type: signupType } }); 
        },
        (error) => {
          console.error('Error during signup', error);
        }
      );
    }
  }
}
