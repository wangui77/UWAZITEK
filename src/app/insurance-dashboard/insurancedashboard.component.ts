import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import Router
import { LucideAngularModule, UserIcon, CandyIcon, InfoIcon, UploadIcon,BellIcon,LayoutDashboardIcon, } from 'lucide-angular';

@Component({
  selector: 'app-insurancedashboard',
  standalone: true,
  imports: [LucideAngularModule,RouterModule], // No need to import RouterModule here as it’s not used in imports
  templateUrl: './insurancedashboard.component.html',
  styleUrls: ['./insurancedashboard.component.css']
})
export class InsuranceDashboardComponent {
  user = UserIcon;
  candy = CandyIcon;
  info = InfoIcon;
  upload = UploadIcon;
  bell= BellIcon;
  layoutDashboard = LayoutDashboardIcon;

  // Inject Router in the constructor
  constructor(private router: Router) {}

  // Logout function
  logout() {
    // Add logout functionality, e.g., clearing tokens if any, then navigate to login page  
    this.router.navigate(['/login']);
  }
}
