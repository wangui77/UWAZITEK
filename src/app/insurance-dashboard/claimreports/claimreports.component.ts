import { Component, OnInit } from '@angular/core'; // Corrected import statement
import { SampleService } from '../../sample.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claimreports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claimreports.component.html',
  styleUrls: ['./claimreports.component.css',], 
})
export class ClaimReportsComponent implements OnInit { 
  invoiceData: any; 

  constructor(private sampleService: SampleService) {} 

  ngOnInit() {
    this.invoiceData = this.sampleService.getInvoiceData(); 
  }
  getCategoryClass(category: string): string {
    switch (category) {
      case 'Fraud':
        return 'fraud';
      case 'Approve':
        return 'approve';
      case 'Investigate':
        return 'investigate';
      default:
        return '';
    }
  }
  
}

