import { Component } from '@angular/core';
import { Routes,RouterModule,Router} from '@angular/router';
import { LucideAngularModule, UserIcon, CandyIcon,InfoIcon, UploadIcon, Search } from "lucide-angular";
import { CommonModule } from '@angular/common';
import { FormService } from '../../form.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LucideAngularModule,CommonModule,RouterModule,MatCardModule,MatIconModule,MatGridListModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
onCardClick(arg0: string) {
throw new Error('Method not implemented.');
}
  user = UserIcon;
  candy = CandyIcon;
  info=InfoIcon;
  upload=UploadIcon
  userType: string | null = null;
totalPreRequests: number =0;

  constructor(private router: Router,private formService: FormService,) {
}
ngOnInit(): void {
  this.formService.getFormCount().subscribe(
    (count) =>{
      this.totalPreRequests = count;
    }
  );
}

  logout() {
    // Add logout functionality, e.g., clearing tokens if any, then navigate to login page  
    this.router.navigate(['/login']);
    
  }
}
