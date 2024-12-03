import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InsuranceDashboardComponent } from './app/insurance-dashboard/insurancedashboard.component';
import { HospitalDashboardComponent } from './app/hospital-dashboard/hospitaldashboard.component';
import { AppRoutingModule } from './app/app.routes';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { authInterceptor } from './app/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom( HttpClientModule,AppRoutingModule),

      provideHttpClient(
      withInterceptors([authInterceptor]) 
    ),
    provideAnimationsAsync(), provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
