import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService { 
  
 private apiUrl= 'http://52.22.245.63';

  constructor(private http:HttpClient){}

  uploadInvoice(formData:FormData,): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer `,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.apiUrl}/api/v1/admin/hospitaladmin/13/upload/invoice`, formData, { headers }).pipe(
      catchError(error =>  {
        console.error('Error submitting invoice:', error);
      return of(null);
      })
    );
} 
}


