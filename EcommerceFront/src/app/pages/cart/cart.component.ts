import { Component } from '@angular/core';
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;
  isLoading = true;

  constructor(protected userService : UserService , protected router : Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const userId = this.userService.getUserId();
      console.log('User ID:', userId);
    } else {
      this.redirectToLogin();
    }
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
  redirectToAccount(): void {
    const id = this.userService.getUserId();
    if(this.isLoggedIn){
      this.router.navigate(['/compte/:id']);
    }else{
      this.router.navigate(['/login']);
    }
  }

  redirectTohHome(): void {
    this.router.navigate(['/home']);
  }
  logout(): void {
    this.userService.removeToken();
    this.router.navigate(['/home']);
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  redirectToWishlist(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.router.navigate(['/wishlist']);
    }
  }

  redirectToCart(): void {
    const userId = this.userService.getUserId();
    if (this.isLoggedIn && userId) {
      this.router.navigate(['/orders']);
    }else {
      this.router.navigate(['/login']);
    }
  }
}

