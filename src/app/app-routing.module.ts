import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ProComponent } from './admin/pro/pro.component';
import { PartiesComponent } from './admin/parties/parties.component';

const routes: Routes = [

  {
    path: 'admin',

    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'pro', pathMatch: 'full' },
      { path: 'pro', component: ProComponent },
      { path: 'parties', component: PartiesComponent },
    
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
