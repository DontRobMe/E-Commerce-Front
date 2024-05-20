import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../../services/produits/produit.service";
import { ProductResponse} from '../../services/produits/produit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isLoading = true;
  error: string | null = null;
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    // @ts-ignore
    this.productService.getProducts().subscribe((response: ProductResponse) => {
      console.log('API Response:', response);
      if (Array.isArray(response.result) && response.result.length > 0) {
        // Assign all products from the response
        this.products = response.result;
        console.log('Products:', this.products);
      } else {
        this.error = 'No products found';
        console.error('No products found in the response:', response);
      }
      this.isLoading = false;
    }, (error) => {
      this.error = 'Error fetching products';
      console.error('Error fetching products:', error);
      this.isLoading = false;
    });
  }

  goToGameDetails(id: number) {
    this.productService.goToGameDetails(id);
  }

}
