// HomeComponent
import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/produits/produit.service";
import { Product, ProductResponse } from '../../services/produits/produit.service';
import { UserService } from "../../services/users/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  isLoading = true;
  error: string | null = null;
  products: Product[] = [];
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;

  constructor(private productService: ProductService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const token = this.userService.getToken();
      console.log('Token:', token);
    }
  }

  // Méthode pour basculer l'affichage du menu déroulant
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  // Méthode pour récupérer la liste des produits depuis le service ProductService
  fetchProducts() {
    this.productService.getProducts().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        if (response.isSuccess) {
          // Vérifiez la structure exacte de la réponse et extrayez les produits appropriés
          const products = response.result.$values;
          this.products = products.map((product: any) => {
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              stock: product.stock,
              category: product.category,
              rating: product.rating,
              image: product.image
            };
          });
          console.log('Products:', this.products);
          this.isLoading = false;
        } else {
          this.error = 'No products found';
          console.error('No products found in the response:', response);
        }
      },
      (error) => {
        this.error = 'Error fetching products';
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    );
  }


  // Méthode pour rediriger vers la page de détails d'un jeu
  goToGameDetails(id: number) {
    this.productService.goToGameDetails(id);
  }

  // Méthode pour rediriger vers la page de connexion
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

  redirectToWishlist(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.router.navigate(['/wishlist']);
    }
  }
  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    this.userService.removeToken();
    window.location.reload();
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

