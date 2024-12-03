
import { Component, OnInit, } from '@angular/core';
import { FormService } from '../../form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent  {
  //forms:any[]=[];
 /* constructor(private formService: FormService,private authService:AuthService ) {}
 
  ngOnInit():void{
    this.getForms();
  }
  fetch forms
    getForms():void {
      const token = this.authService.getToken();
      this.formService.getForms().subscribe(
       (data:any[]) =>{
          console.log(' Fetched Notifications:', data);
        this.forms = data;
},
(error) => {
  console.error('error fetching notifications:', error);
  console.error('Response body:', error.error);
  
}
);
}
approveForm(formId: number): void {
  this.formService.updateFormStatus(formId, 'approved').subscribe(
    (response) => {
      console.log('Form approved:', response);
      this.getForms(); 
    },
    (error) => {
      console.error('Error approving form:', error);
    }
  );
}
rejectForm(formId: number): void {
  this.formService.updateFormStatus(formId, 'rejected').subscribe(
    (response) => {
      console.log('Form rejected:', response);
      this.getForms(); // Refresh forms
    },
    (error) => {
      console.error('Error rejecting form:', error);
    }
  );
}*/
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
      status: 'pending'
    },
    
      {
        insuranceName: 'Maddison',
        patientName: 'John paul',
        typeOfPatient: 'Inpatient',
        policyNumber: '6789-APA-88',
        status: 'pending'
      },
  ]
  
  approveForm(index: number) {
    alert(`Form for ${this.forms[index].patientName} approved.`);
    // Logic to handle approval (e.g., update status or send to server)
    this.forms.splice(index, 1); // Remove form from list
  }
  
  // Reject a form
  rejectForm(index: number) {
    alert(`Form for ${this.forms[index].patientName} rejected.`);
    // Logic to handle rejection (e.g., update status or send to server)
    this.forms.splice(index, 1); // Remove form from list
  }
  
  
  
  


















/*approveForm(formId: number, ): void {
  this.formService.updateFormStatus(formId,'approved').subscribe(
    (response) => {
      console.log('Form approved:', response);
      this.getForms(); 
    },
    (error) => {
      console.error('Error approving form:', error);
    }
  );
}

rejectForm(formId: number): void {
  this.formService.updateFormStatus(formId, 'rejected').subscribe(
    (response) => {
      console.log('Form rejected:', response);
      this.getForms(); 
    },
    (error) => {
      console.error('Error rejecting form:', error);
    }
  );
}*/

}


  
  
  