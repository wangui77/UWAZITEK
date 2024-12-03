import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hospitals: any[] = [];  //to store hospitals
  insurances: any[] = [];  //to store insurance

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
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
    this.setupDynamicValidation();
  }
//dynamically change fields when signuptype changes
  setupDynamicValidation(): void {
    this.signupForm.get('signup_type')?.valueChanges.subscribe((type) => {
      if (type === 'hospital') {
        this.signupForm.get('hospital_id')?.setValidators(Validators.required);
        this.signupForm.get('insurance_id')?.clearValidators();
      } else {
        this.signupForm.get('insurance_id')?.setValidators(Validators.required);
        this.signupForm.get('hospital_id')?.clearValidators();
      }
      this.signupForm.get('hospital_id')?.updateValueAndValidity();
      this.signupForm.get('insurance_id')?.updateValueAndValidity();
    });
  }
//to get hospital names
  loadHospitals(): void {
    this.authService.getHospitals().subscribe({
      next: (data) => {
        console.log('Hospitals fetched successfully:', data);
        this.hospitals = data?.data || [];
      },
      error: (error) => {
        console.error('Error fetching hospitals:', error);
        alert('Error fetching hospitals. Please try again later.');
      }
    });
  }
//to get insurance name
  loadInsurances(): void {
    this.authService.getInsurance().subscribe({
      next: (data: any) => {
        console.log('Insurances fetched successfully:', data);
        this.insurances = data || [];
      },
      error: (error) => {
        console.error('Error fetching insurances:', error);
        alert('Error fetching insurances. Please try again later.');
      }
    });  
  }

  onSignupTypeChange(): void {
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
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          const signupType = this.signupForm.value.signup_type;//retrieve signup as hospital/insurance
          localStorage.setItem('signupType',signupType);//store signtype in local storage
          this.router.navigate(['/login'], { queryParams: { signupType } });
        },
        error: (error) => {
          console.error('Signup failed:', error);
          alert('Signup failed. Please try again.');
        }
      });
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }}


         
  
