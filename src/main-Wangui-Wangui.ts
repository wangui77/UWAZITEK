import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        { path: 'login', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' },
       
      ])
    )
  ]
})
.catch((err) => console.error(err));
