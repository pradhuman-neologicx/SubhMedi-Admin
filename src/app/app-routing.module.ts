import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PartiesComponent } from './admin/parties/parties.component';
import { ForgotPasswordComponent } from './admin/loginpages/forgot-password/forgot-password.component';
import { SigninComponent } from './admin/loginpages/signin/signin.component';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { OtpComponent } from './admin/loginpages/otp/otp.component';

const routes: Routes = [

  {
    path: '',

    component: LoginpagesComponent,
    children: [
      { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
      { path: 'sign_in', component: SigninComponent },
      { path:'otp',component: OtpComponent},
      { path: 'forgot_password', component: ForgotPasswordComponent },
    ],
  },
  {
    path: '',

    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'parties', pathMatch: 'full' },
      {
        path: 'parties',
        component: PartiesComponent,
      },


      // {
      //   path: 'student',
      //   component: StudentComponent,
      // },

    ],
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
