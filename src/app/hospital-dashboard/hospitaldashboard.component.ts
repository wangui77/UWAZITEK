import { Component, OnInit } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { Router } from '@angular/router';
import { LucideAngularModule, UserIcon, CandyIcon,InfoIcon, UploadIcon, LayoutDashboardIcon } from "lucide-angular"
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';



@Component({
  selector: 'app-hospitalDashboard',
  standalone: true,
  imports: [RouterModule, LucideAngularModule,],
  templateUrl: './hospitalDashboard.component.html',
  styleUrls: ['./hospitalDashboard.component.css'] 
})
export class HospitalDashboardComponent  {
  isDashboardRoute: boolean = true;
  user = UserIcon;
  candy = CandyIcon;
  info=InfoIcon;
  upload=UploadIcon
  layoutDashboard = LayoutDashboardIcon;
  
  constructor(private router: Router) {

}
  logout() {
    // Add logout functionality, e.g., clearing tokens if any, then navigate to login page  
    this.router.navigate(['/login']);
    
  }
}

