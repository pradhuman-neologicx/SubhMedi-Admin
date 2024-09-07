import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PartiesComponent } from './admin/parties/parties.component';
import { ForgotPasswordComponent } from './admin/loginpages/forgot-password/forgot-password.component';
import { SigninComponent } from './admin/loginpages/signin/signin.component';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { OtpComponent } from './admin/loginpages/otp/otp.component';
import { ProjecttComponent } from './admin/projectt/projectt.component';
import { OongoingComponent } from './admin/projectt/oongoing/oongoing.component';
import { CcompletedComponent } from './admin/projectt/ccompleted/ccompleted.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjecthomeComponent } from './admin/projecthome/projecthome.component';
import { HomepartiesComponent } from './admin/projecthome/homeparties/homeparties.component';
import { HometransactionsComponent } from './admin/projecthome/hometransactions/hometransactions.component';
import { HomeattendanceComponent } from './admin/projecthome/homeattendance/homeattendance.component';
import { HomematerialComponent } from './admin/projecthome/homematerial/homematerial.component';
import { ProjectbalanceComponent } from './admin/projectbalance/projectbalance.component';
import { MastersComponent } from './admin/masters/masters.component';
import { UnitsComponent } from './admin/masters/units/units.component';
import { MaterialsComponent } from './admin/masters/materials/materials.component';
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { WorkforceComponent } from './admin/masters/workforce/workforce.component';
import { ViewpartiesComponent } from './admin/parties/viewparties/viewparties.component';

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
      { path: '', redirectTo: 'DashboardComponent', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'parties',
        component: PartiesComponent,
      },
      {
        path: 'viewparties/:id',
        component: ViewpartiesComponent,
      },

      {
        path: 'attendance/:id',
        component: AttendanceComponent,
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



      {
        path: 'project_home/:id',
        component: ProjecthomeComponent,
        // canActivate: [AuthGuard],
      
            children: [
              { path: '', redirectTo: 'project_parties', pathMatch: 'full' },
              {
                path: 'project_parties',
                component: HomepartiesComponent,
                // canActivate: [AuthGuard],
              },
              {
                path: 'project_transactions',
                component: HometransactionsComponent,
                // canActivate: [AuthGuard],
              },
              {
                path: 'project_attendance',
                component: HomeattendanceComponent,
                // canActivate: [AuthGuard],
              },
              {
                path: 'project_material',
                component: HomematerialComponent,
                // canActivate: [AuthGuard],
              },
            
    
            
            ],
          
       
      },




      {
        path: 'projectpartybalance/:id/:party_id',
        component: ProjectbalanceComponent,
        // canActivate: [AuthGuard],
      
        
          
       
      },


      {
        path: 'units',
        component: UnitsComponent,
      
      },
      {
        path: 'materials',
        component: MaterialsComponent,
       
      },

      {
        path: 'masters',

        component: MastersComponent,

        children: [
          { path: '', redirectTo: 'units', pathMatch: 'full' },
          {
            path: 'units',
            component: UnitsComponent,
          
          },

          {
            path: 'materials',
            component: MaterialsComponent,
           
          },

          {
            path: 'workforce',
            component: WorkforceComponent,
           
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
