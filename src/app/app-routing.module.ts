import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddEmployeeComponent } from './add-category/add-employee.component';
// import { EditEmployeeComponent } from './edit-category/edit-employee.component';
// import { ViewEmployeeComponent } from './view-category/view-employee.component';
import { SignupComponent } from './components/signup/signup.component';
// import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'ViewEmployee/:employeeId', component: ViewEmployeeComponent },
  // { path: 'AddEmployee', component: AddEmployeeComponent },
  // { path: 'EditEmployee/:employeeId', component: EditEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
