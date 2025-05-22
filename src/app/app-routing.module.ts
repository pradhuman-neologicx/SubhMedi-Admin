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

import { WorkforceComponent } from './admin/masters/workforce/workforce.component';
import { ViewpartiesComponent } from './admin/parties/viewparties/viewparties.component';
import { AuthGuard } from './core/auth/auth-guard';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AppUsersComponent } from './admin/user-management/app-users/app-users.component';
import { SilentUsersComponent } from './admin/user-management/silent-users/silent-users.component';
import { SubscriptionManagementComponent } from './admin/subscription-management/subscription-management.component';
import { AdvertisingManagementComponent } from './admin/advertising-management/advertising-management.component';
import { ViewAppUsersComponent } from './admin/user-management/app-users/view-app-users/view-app-users.component';
import { ViewSilentUsersComponent } from './admin/user-management/silent-users/view-silent-users/view-silent-users.component';
import { CompaniesComponent } from './admin/companies/companies.component';
import { AuthorityComponent } from './admin/authority/authority.component';
import { UnsubscribeComponent } from './admin/unsubscribe/unsubscribe.component';
import { PharmacyComponent } from './admin/user-management/pharmacy/pharmacy.component';
import { MedicalDistributorsComponent } from './admin/user-management/medical-distributors/medical-distributors.component';
import { NewShopsComponent } from './admin/new-shops/new-shops.component';

const routes: Routes = [
  {
    path: '',

    component: LoginpagesComponent,
    children: [
      { path: '', redirectTo: 'sign_in', pathMatch: 'full' },
      { path: 'sign_in', component: SigninComponent },
      { path: 'reset_password/:id/:token', component: OtpComponent },
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
        // canActivate: [AuthGuard],
      },
      {
        path: 'parties',
        component: PartiesComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'viewparties/:id',
        component: ViewpartiesComponent,
        // canActivate: [AuthGuard],
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
        path: 'user-management',

        component: UserManagementComponent,

        children: [
          { path: '', redirectTo: 'app-users', pathMatch: 'full' },
          {
            path: 'app-users',
            component: AppUsersComponent,
          },

          {
            path: 'view-users/:id',
            component: ViewAppUsersComponent,
          },
          {
            path: 'silent-users',
            component: SilentUsersComponent,
          },
          {
            path: 'pharmacy',
            component: PharmacyComponent,
          },
          {
            path: 'medical-distributors',
            component: MedicalDistributorsComponent,
          },
          {
            path: 'view-silentusers/:id',
            component: ViewSilentUsersComponent,
          },
        ],
      },
      {
        path: 'subscription',
        component: SubscriptionManagementComponent,
      },
      {
        path: 'advertising',
        component: AdvertisingManagementComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'authority',
        component: AuthorityComponent,
      },
      {
        path: 'unsubscribe',
        component: UnsubscribeComponent,
      },
      {
        path: 'new-shops',
        component: NewShopsComponent,
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
