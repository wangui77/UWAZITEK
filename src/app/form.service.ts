import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,tap, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://52.22.245.63';
  private totalFormsSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper function to get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Form counter methods
  incrementFormCount(): void {
    let currentCount = this.totalFormsSubject.value;
    currentCount++;
    this.totalFormsSubject.next(currentCount);
  }

  getFormCount(): Observable<number> {
    return this.totalFormsSubject.asObservable();
  }

  // Submit form in hospital inquiry
  /*submitForm(formData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/api/v1/hospitaladmin/14/preauth`, formData, { headers }).pipe(
      tap(response => {
        // If the response contains a new JWT token, save it
        const newToken = response.jwt;
        if (newToken) {
          this.authService.saveToken(newToken); // Save the token in your auth service
        }
      }),
      catchError((error) => {
        console.error('Error submitting form:', error);
        return of([]); // Return an empty array on error
      })
    );
  }*/
    submitForm(formData: any, token: string): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<any>(`${this.apiUrl}/api/v1/hospitaladmin/1/preauth, formData`, { headers }).pipe(
        tap(response => {
          // Check if the response contains a new JWT token, save it
          if (response && response.jwt) {
            this.authService.saveToken(response.jwt);
          }
        }),
        catchError((error) => {
          // Improved error logging
          console.error('Error submitting form:', error);
          if (error.status === 401) {
            console.error('Authorization error: Invalid token or session expired');
          } else if (error.status >= 500) {
            console.error('Server error. Please try again later.');
          }
          return throwError(() => error); // Use throwError instead of returning an empty array for better error management
        })
      );
    }

  // Fetch forms for hospital status
  fetchForms(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/api/v1/hospitaladmin/1/preauth`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching forms:', error);
        return of([]);
      })
    );
  }

  // Update form status in hospital
  updateStatus(formId: number, status: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/api/v1/hospitaladmin/1/${formId}`, { status }, { headers }).pipe(
      catchError((error) => {
        console.error('Error updating form status:', error);
        return of(null);
      })
    );
  }

  // Fetch forms in insurance notification
  getForms(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/api/v1/insuranceadmin/1/preauth`, { headers })
  }

  // Update form status in insurance (approve/reject)
  updateFormStatus(formId: number, status: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}${formId}/api/v1/insuranceadmin/1/preauth/1`, { status }, { headers })
  }  
}
