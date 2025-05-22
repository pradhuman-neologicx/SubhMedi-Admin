import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { SidenavHeaderComponent } from './admin/sidenav-header/sidenav-header.component';
import { PartiesComponent } from './admin/parties/parties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './mat/mat.module';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './core/services/loading.interceptor';
import { LoginpagesComponent } from './admin/loginpages/loginpages.component';
import { ForgotPasswordComponent } from './admin/loginpages/forgot-password/forgot-password.component';
import { ApiService } from './core/services/api.service';
import { DataService } from './core/services/data.service';
import { JwtService } from './core/services/jwt.service';
import { SigninComponent } from './admin/loginpages/signin/signin.component';
import { OtpComponent } from './admin/loginpages/otp/otp.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ProjecttComponent } from './admin/projectt/projectt.component';
import { CcompletedComponent } from './admin/projectt/ccompleted/ccompleted.component';
import { OongoingComponent } from './admin/projectt/oongoing/oongoing.component';
import { EmployeeService } from './core/services/Employee.service';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjecthomeComponent } from './admin/projecthome/projecthome.component';
import { HomepartiesComponent } from './admin/projecthome/homeparties/homeparties.component';
import { HometransactionsComponent } from './admin/projecthome/hometransactions/hometransactions.component';
import { HomeattendanceComponent } from './admin/projecthome/homeattendance/homeattendance.component';
import { HomematerialComponent } from './admin/projecthome/homematerial/homematerial.component';
import { ProjectbalanceComponent } from './admin/projectbalance/projectbalance.component';
import { MastersComponent } from './admin/masters/masters.component';
import { UnitsComponent } from './admin/masters/units/units.component';
import { MaterialsComponent } from './admin/masters/materials/materials.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { WorkforceComponent } from './admin/masters/workforce/workforce.component';
import { SubcontracterpayementoutComponent } from './admin/projecthome/subcontracterpayementout/subcontracterpayementout.component';
import { OtherexpensepaymentoutComponent } from './admin/projecthome/otherexpensepaymentout/otherexpensepaymentout.component';
import { MaterialpurchaseComponent } from './admin/projecthome/materialpurchase/materialpurchase.component';
import { SalaryComponent } from './admin/projecthome/salary/salary.component';
import { PettyexpenseComponent } from './admin/projecthome/pettyexpense/pettyexpense.component';
import { MiscelaniousexpensesComponent } from './admin/projecthome/miscelaniousexpenses/miscelaniousexpenses.component';
import { PaymentoutComponent } from './admin/projecthome/paymentout/paymentout.component';
import { ViewpartiesComponent } from './admin/parties/viewparties/viewparties.component';
import { LabourexpenseComponent } from './admin/projecthome/labourexpense/labourexpense.component';
import { FuelexpenseComponent } from './admin/projecthome/fuelexpense/fuelexpense.component';
import { MachineryexpenseComponent } from './admin/projecthome/machineryexpense/machineryexpense.component';
import { ElectricexpenseComponent } from './admin/projecthome/electricexpense/electricexpense.component';
import { WaterexpenseComponent } from './admin/projecthome/waterexpense/waterexpense.component';
import { SupervisorpaymentComponent } from './admin/projecthome/supervisorpayment/supervisorpayment.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SubscriptionManagementComponent } from './admin/subscription-management/subscription-management.component';
import { AdvertisingManagementComponent } from './admin/advertising-management/advertising-management.component';
import { AppUsersComponent } from './admin/user-management/app-users/app-users.component';
import { SilentUsersComponent } from './admin/user-management/silent-users/silent-users.component';
import { ViewAppUsersComponent } from './admin/user-management/app-users/view-app-users/view-app-users.component';
import { ViewSilentUsersComponent } from './admin/user-management/silent-users/view-silent-users/view-silent-users.component';
import { CompaniesComponent } from './admin/companies/companies.component';
import { AuthorityComponent } from './admin/authority/authority.component';
import { UnsubscribeComponent } from './admin/unsubscribe/unsubscribe.component';
import { PharmacyComponent } from './admin/user-management/pharmacy/pharmacy.component';
import { MedicalDistributorsComponent } from './admin/user-management/medical-distributors/medical-distributors.component';
import { NewShopsComponent } from './admin/new-shops/new-shops.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SidenavComponent,
    SidenavHeaderComponent,
    PartiesComponent,
    LoginpagesComponent,
    ForgotPasswordComponent,
    SigninComponent,
    OtpComponent,
    SpinnerComponent,
    ProjecttComponent,
    OongoingComponent,
    CcompletedComponent,
    DashboardComponent,
    ProjecthomeComponent,
    HomepartiesComponent,
    HometransactionsComponent,
    HomeattendanceComponent,
    HomematerialComponent,
    ProjectbalanceComponent,
    MastersComponent,
    UnitsComponent,
    MaterialsComponent,
    WorkforceComponent,
    SubcontracterpayementoutComponent,
    OtherexpensepaymentoutComponent,
    MaterialpurchaseComponent,
    SalaryComponent,
    PettyexpenseComponent,
    MiscelaniousexpensesComponent,
    PaymentoutComponent,
    ViewpartiesComponent,
    LabourexpenseComponent,
    FuelexpenseComponent,
    MachineryexpenseComponent,
    ElectricexpenseComponent,
    WaterexpenseComponent,
    SupervisorpaymentComponent,
    UserManagementComponent,
    SubscriptionManagementComponent,
    AdvertisingManagementComponent,
    AppUsersComponent,
    SilentUsersComponent,
    ViewAppUsersComponent,
    ViewSilentUsersComponent,
    CompaniesComponent,
    AuthorityComponent,
    UnsubscribeComponent,
    PharmacyComponent,
    MedicalDistributorsComponent,
    NewShopsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    NgSelectModule,
    MatMenuModule,
    NgxPaginationModule,
  ],
  providers: [
    DataService,
    ApiService,
    JwtService,
    DatePipe,
    EmployeeService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
