import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './pages/app-route/app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import {AddProductComponent} from "./pages/addgame/addgame.component";
import {NgOptimizedImage} from "@angular/common";
import {ProductComponent} from "./pages/product/product.component";
import {CompteComponent} from "./pages/compte/compte.component";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {WishlistComponent} from "./pages/wishlist/wishlist.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddProductComponent,
    ProductComponent,
    CompteComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgOptimizedImage,
  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
a
