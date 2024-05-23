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


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoggedIn = this.userService.isLoggedIn(); // Assurez-vous que cette méthode existe dans votre service UserService

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
    this.router.navigate(['/login']);
  }
}
