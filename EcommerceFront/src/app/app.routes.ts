import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {HomeComponent} from "./pages/home/home.component";
import {AddProductComponent} from "./pages/addgame/addgame.component";
import {WishlistComponent} from "./pages/wishlist/wishlist.component";
import {CompteComponent} from "./pages/compte/compte.component";
import {ProductComponent} from "./pages/product/product.component";
import {CartComponent} from "./pages/cart/cart.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'compte/:id', component: CompteComponent}, //make page
  { path: 'cart', component: CartComponent }, //make page
  { path: 'wishlist', component: WishlistComponent}, //make page
  { path: 'addgame', component: AddProductComponent }, //make page
  { path: 'game/:id', component: ProductComponent }, // Définissez une route avec un paramètre d'identifiant
  { path: 'client/:userId', component: CompteComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

