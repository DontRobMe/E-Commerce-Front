// src/app/components/wishlist/wishlist.component.ts
import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/users/user.service";
import {WishlistProductDto} from "../../services/produits/produit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent implements OnInit {
  isLoading = true;
  error: string | null = null;
  wishlist: WishlistProductDto[] = [];
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;

  constructor(
    protected userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const userId = this.userService.getUserId();
      console.log('User ID:', userId);
      this.fetchWishlist(userId);
    } else {
      this.redirectToLogin();
    }
  }

  fetchWishlist(userId: number) {
    this.userService.getWishlist(userId).subscribe(
      (response: any) => {
        console.log('Wishlist API response:', response);
        this.wishlist = response.$values;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching wishlist:', error);
        this.isLoading = false;
      }
    );
  }

  deleteFromWishlist(userid: number ,wishlistId: number) {
    this.userService.deleteWishlist(userid, wishlistId).subscribe(
      (response: any) => {
        console.log('Delete from wishlist API response:', response);
        this.fetchWishlist(this.userService.getUserId());
      },
      (error) => {
        console.error('Error deleting from wishlist:', error);
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
}
a
