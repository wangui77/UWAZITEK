import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';  
import { SignupComponent } from './signup/signup.component';  





export const routes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: '**', redirectTo: '/signup' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {};
