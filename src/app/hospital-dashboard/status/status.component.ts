import { Component, OnInit } from '@angular/core';
import { FormService } from '../../form.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent  {
 // forms:any []=[];
  forms=[
    {
      insuranceName: 'Britam',
      patientName: 'Robi Brown',
      typeOfPatient: 'Outpatient',
      policyNumber: '2345-BRI-87',
      status: 'Pending'
    },
    {
      insuranceName: 'APA',
      patientName: 'Jane Smith',
      typeOfPatient: 'Inpatient',
      policyNumber: '6789-APA-88',
      status: 'Approved'
    },
    
      {
        insuranceName: 'Maddison',
        patientName: 'John paul',
        typeOfPatient: 'Inpatient',
        policyNumber: '6789-APA-88',
        status: 'Rejected'
      },
  ]
}
  
  

  /*constructor(private formService: FormService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchForms();
  }

  //Method to get forms
  fetchForms(): void { 
    const token = this.authService.getToken();
    this.formService.fetchForms().subscribe(
      (data: any) => {
       // console.log('fetched forms', data);
        this.forms=data;
      },
      (error) => {
        console.log('Error fetching status:', error);
      }
    );
  }*/



