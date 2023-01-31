import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/dashboard/add-category/add-category/add-category.component';
import { AddBrandComponent } from './components/dashboard/add-brand/add-brand.component';
import { AddProductComponent } from './components/dashboard/add-product/add-product.component';
import { AddSegmentComponent } from './components/dashboard/add-segment/add-segment.component';
import { SignupComponent } from './components/signup/signup.component';
// import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-segment',
    component: AddSegmentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-brand',
    component: AddBrandComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
