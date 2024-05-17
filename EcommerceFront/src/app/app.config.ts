import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importe HttpClientModule
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './pages/app-route/app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import {AddProductComponent} from "./pages/addgame/addgame.component";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
