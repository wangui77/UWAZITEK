import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routes';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppRoutingModule,],
  template:`
  <main>
    <header class="brand">
      <h1>WELCOME TO UWAZITEK</h1>
      </header>

    <section class="content">
  
    </section>
  </main>
   `,
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'uwazitek';
}

