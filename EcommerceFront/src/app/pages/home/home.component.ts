import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProductService} from "../../services/produits/produit.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  products: any[] = [];

  constructor(private http: HttpClient, private productService: ProductService) {}


  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.products = response;
        } else {
          console.error('Error: Expected an array of products, received:', response);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
