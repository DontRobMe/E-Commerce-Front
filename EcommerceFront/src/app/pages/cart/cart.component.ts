import { Component } from '@angular/core';
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";
import {CartProductDto, Product} from "../../services/produits/produit.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  error: string | null = null;
  cart: CartProductDto[] = [];
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;
  isLoading = true;


  constructor(protected userService : UserService , protected router : Router) {}


  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const userId = this.userService.getUserId();
      console.log('User ID:', userId);
      this.fetchCart(userId);
    } else {
      this.redirectToLogin();
    }
  }


  fetchCart(userId: number) {
    this.userService.getCart(userId).subscribe(
      (response: any) => {
        console.log('Cart API response:', response);
        this.cart = response.$values;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching Cart:', error);
        this.isLoading = false;
      }
    );
  }


  deleteFromCart  (userid: number ,CartId: number) {
    this.userService.deleteCart(userid, CartId).subscribe(
      (response: any) => {
        console.log('Delete from cart API response:', response);
        this.fetchCart(this.userService.getUserId());
      },
      (error) => {
        console.error('Error deleting from cart:', error);
      }
    );
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
      this.router.navigate(['/cart']);
    }else {
      this.router.navigate(['/login']);
    }
  }
}

