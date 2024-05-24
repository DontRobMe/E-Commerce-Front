import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {CartComponent} from "./pages/cart/cart.component";
import {ConfirmationComponent} from "./pages/confirmation/confirmation.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {SearchComponent} from "./pages/search/search.component";

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
    CartComponent,
    ConfirmationComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgOptimizedImage,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule

  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

