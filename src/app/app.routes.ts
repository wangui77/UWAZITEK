import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';  
import { SignupComponent } from './signup/signup.component';
import { HospitalDashboardComponent } from './hospital-dashboard/hospitaldashboard.component';
import { InsuranceDashboardComponent } from './insurance-dashboard/insurancedashboard.component';
import { ClaimsComponent } from './hospital-dashboard/claims/claims.component';
import { StatusComponent } from './hospital-dashboard/status/status.component';
import { InquiryComponent } from './hospital-dashboard/inquiry/inquiry.component';
import { DashboardComponent } from './hospital-dashboard/dashboard/dashboard.component';
import { ClaimReportsComponent } from './insurance-dashboard/claimreports/claimreports.component';
import { HomeComponent } from './insurance-dashboard/home/home.component';
import { NotificationsComponent } from './insurance-dashboard/notifications/notifications.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'hospital-dashboard',
    component: HospitalDashboardComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'claims', component: ClaimsComponent },
      { path: 'status', component: StatusComponent },
      { path: 'inquiry', component: InquiryComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
    ],
  },

  {
    path: 'insurance-dashboard',
    component: InsuranceDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {path:'notifications', component: NotificationsComponent},
      { path: 'claimreports', component: ClaimReportsComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' }, ]
  },

  // Default routes for landing
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }, // Catch-all for unknown routes
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
