import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PartiesComponent } from './admin/parties/parties.component';
import { ForgotPasswordComponent } from './admin/loginpages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin/loginpages/reset-password/reset-password.component';
import { SigninComponent } from './admin/loginpages/signin/signin.component';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { ProjecttComponent } from './admin/projectt/projectt.component';
import { OongoingComponent } from './admin/projectt/oongoing/oongoing.component';
import { CcompletedComponent } from './admin/projectt/ccompleted/ccompleted.component';

const routes: Routes = [

  {
    path: '',

    component: LoginpagesComponent,
    children: [
      { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
      { path: 'sign_in', component: SigninComponent },
      { path: 'forgot_password', component: ForgotPasswordComponent },
      { path: 'reset_password', component: ResetPasswordComponent },
      // { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
      // { path: 'sign_in', component: SigninComponent },
      // { path: 'forgot_password', component: ForgotPasswordComponent },
      // { path: 'reset_password', component: ResetPasswordComponent },
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

      {
        path: 'project',
        component: ProjecttComponent,
        // canActivate: [AuthGuard],
      
            children: [
              { path: '', redirectTo: 'ongoing', pathMatch: 'full' },
              {
                path: 'ongoing',
                component: OongoingComponent,
                // canActivate: [AuthGuard],
              },
              {
                path: 'completed',
                component: CcompletedComponent,
                // canActivate: [AuthGuard],
              },
            
    
            
            ],
          
       
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
