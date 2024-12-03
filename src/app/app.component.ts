import { Component } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule,} from '@angular/router';
import { AppRoutingModule } from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,],
  template: `
    <router-outlet></router-outlet>
  `,

  styleUrls: ['./app.component.css']


})
export class AppComponent{
  
}

