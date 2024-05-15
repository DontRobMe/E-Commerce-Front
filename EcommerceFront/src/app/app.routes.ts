import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {HomeComponent} from "./home/home.component";
import {SupportComponent} from "./support/support.component";
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'compte/:id', loadChildren: () => import('./compte/compte.component').then(m => m.CompteComponent) }, //make page
  { path: 'orders', loadChildren: () => import('./orders/orders.component').then(m => m.OrdersComponent) }, //make page
  { path: 'support', component: SupportComponent }, //make page
  { path: 'wishlist', loadChildren: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent)}, //make page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
