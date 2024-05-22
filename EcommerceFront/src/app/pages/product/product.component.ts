import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Product, ProductService, ProductResponse } from "../../services/produits/produit.service";
import {UserService} from "../../services/users/user.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  game: Product | undefined;
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const token = this.userService.getToken();
      console.log('Token:', token);
    }
    // @ts-ignore
    this.productService.getProduct(gameId).subscribe((response: ProductResponse) => {
      if (response.result) {
        // @ts-ignore
        this.game = response.result;
        console.log('Game details:', this.game);
      } else {
        console.error('Game not found in response:', response);
      }
    }, (error) => {
      console.error('Error fetching game details:', error);
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  redirectToAccount(): void {
    this.router.navigate(['/compte/:id']);
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

  //addwish
  addWishlist(gameId: number): void {
    const userId = this.userService.getUserId();

    this.userService.addWishlist(userId, gameId).subscribe((response) => {
      console.log('Wishlist response:', response);
      if (response.isSuccess) {
        alert('Game added to wishlist');
      } else {
        alert('Failed to add game to wishlist');
      }
    }, (error) => {
      console.error('Error adding game to wishlist:', error);
      alert('Failed to add game to wishlist');
    });
  }

  redirectToWishlist(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.router.navigate(['/wishlist']);
    }
  }
}
