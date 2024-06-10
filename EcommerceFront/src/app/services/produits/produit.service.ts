import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";
import { environment } from '../../../environments/environment';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  image: string;
}
export interface WishlistProductDto {
  produitId: number;
  produitName: string;
  produitImage: string;
  produitPrice: number;
}

export interface CartProductDto {
  produitId: number;
  produitName: string;
  produitImage: string;
  produitPrice: number;
  produitCategory: string;
}

export interface ProductResponse {
  result: Product[];
  message: string | null;
  isSuccess: boolean;
  error: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiURL}/Produit/`;

  constructor(private router: Router, private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}getproduits`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}createproduit`, product);
  }

  goToGameDetails(id: number) {
    this.router.navigate(['/game', id]);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}GetProduitById/${id}`);
  }
}

