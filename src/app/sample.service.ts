import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  getInvoiceData() {
    return {
      hospitalName:'Wellness',
      bankName: 'I&M Bank',
      bankAccount:'0754 8532 0632',
      patientName: 'Tobi Brown',
      policyNumber: '32046-APA-902',
      invoiceNumber: 'AHKJDGSH986K',
      date: '1 November 2024',
      items: [
        { description: 'Digital examination of rectum', price: 800, baseCostPrice:600,priceDifference:105.82,category: 'Approve' },
        { description: 'Cisplatin 50 mg injection', price: 500, baseCostPrice:600,priceDifference:105.82,category: 'Investigate' },
        { description: 'Renal dialysis (procedure)', price: 1750,baseCostPrice:600,priceDifference:105.82, category: 'Approve' },
        { description: 'Albuterol inhalation solution', price: 100,baseCostPrice:600,priceDifference:105.82, category: 'Fraud' },
        { description: 'Urine screening test for diabetes', price: 2000, baseCostPrice:600,priceDifference:105.82,category: 'Investigate' },
      ],
      total: 5150,
    }}
  constructor() { }
}
