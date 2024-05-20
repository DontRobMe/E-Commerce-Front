import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product, ProductService, ProductResponse } from "../../services/produits/produit.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  game: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));

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
}
