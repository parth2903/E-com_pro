import { Routes } from '@angular/router';
import { HomeComponent } from './myComp/home/home.component';
import { CategoriesComponent } from './myComp/manage/categories/categories.component';
import { CategoryFormComponent } from './myComp/manage/category-form/category-form.component';
import { BrandsComponent } from './myComp/manage/brands/brands.component';
import { BrandFormComponent } from './myComp/manage/brand-form/brand-form.component';
import { ProductsComponent } from './myComp/manage/products/products.component';
import { ProductFormComponent } from './myComp/manage/product-form/product-form.component';
import { ProductListComponent } from './myComp/product-list/product-list.component';
import { ProductCardComponent } from './myComp/product-card/product-card.component';
import { ProductDetailsComponent } from './myComp/product-details/product-details.component';
import { RegisterComponent } from './myComp/register/register.component';
import { LoginComponent } from './myComp/login/login.component';
import { authGaurd } from './core/auth-guard';
import { AdminDashboardComponent } from './myComp/manage/admin-dashboard/admin-dashboard.component';
import { adminGaurd } from './core/admin-guard';
import { CustomerProfileComponent } from './myComp/customer-profile/customer-profile.component';
import { WishlistsComponent } from './myComp/wishlists/wishlists.component';
 
export const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    canActivate: [authGaurd]
  },
  {
    path: "admin",
    component : AdminDashboardComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/categories",
    component:CategoriesComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/categories/add",
    component:CategoryFormComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/categories/:id",
    component:CategoryFormComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/brands",
    component:BrandsComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/brands/add",
    component:BrandFormComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/brands/:id",
    component:BrandFormComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/products",
    component:ProductsComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/products/add",
    component:ProductFormComponent,
    canActivate: [adminGaurd]
  },
  {
    path:"admin/products/:id",
    component:ProductFormComponent,
    canActivate: [adminGaurd]
  },
  {
    path: "products",
    component: ProductListComponent,
    canActivate: [authGaurd]
  },
  {
    path: "product/:id",
    component: ProductDetailsComponent,
    canActivate: [authGaurd]
  },
  {
    path: "profile",
    component: CustomerProfileComponent,
    canActivate: [authGaurd]
  },
  {
    path: "wishlists",
    component: WishlistsComponent,
    canActivate: [authGaurd]
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];
