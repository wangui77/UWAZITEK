import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError,map,tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://52.22.245.63';
  private TOKEN_KEY = 'auth_token';


  constructor(private http: HttpClient) {}

  signup(userDetails: any): Observable<any> {
    const headers= new HttpHeaders
    return this.http.post(`${this.apiUrl}/api/v1/auth/signup`, userDetails, {headers}).pipe(
        catchError(this.handleError)
      );
  }
  
  private getAuthHeaders(): HttpHeaders {
  const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  private handleError(error:HttpErrorResponse): Observable<never> {
    return throwError(()=>new Error(error.message || 'server error')
    );


  }

  login(credentials: any): Observable<any> {
     const headers = new HttpHeaders ({
      'Content-Type': 'application/json'
   });
     return this.http.post<any>(`${this.apiUrl}/api/v1/auth/login`, credentials, {headers} ).pipe(
      tap (response =>{
        const token = response.data.jwt;
        if (token){
          this.saveToken(token);
        }
      }),
      catchError(this.handleError)
     );
    
  }
     
      

  getToken(): string | null {
  return localStorage.getItem(this.TOKEN_KEY);
  
  }
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token); }


  getHospitals(): Observable<any> {
    const url = `${this.apiUrl}/api/v1/hospitals`;
    console.log('Calling URL:', url);
    return this.http.get(url);
  }
  


    getInsurance(): Observable<any[]> {
      return this.http.get<any>(`${this.apiUrl}/api/v1/insurance`).pipe(
        map(response => response.data) // Access the "data" array directly
      );
    }
  
}

