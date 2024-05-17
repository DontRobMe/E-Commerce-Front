import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {HomeComponent} from "./pages/home/home.component";
import {SupportComponent} from "./pages/support/support.component";
import {AddProductComponent} from "./pages/addgame/addgame.component";
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'compte/:id', loadChildren: () => import('./pages/compte/compte.component').then(m => m.CompteComponent) }, //make page
  { path: 'orders', loadChildren: () => import('./pages/orders/orders.component').then(m => m.OrdersComponent) }, //make page
  { path: 'support', component: SupportComponent }, //make page
  { path: 'wishlist', loadChildren: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent)}, //make page
  { path: 'addgame', loadChildren: () => import('./pages/addgame/addgame.component').then(m => m.AddProductComponent) }, //make page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
