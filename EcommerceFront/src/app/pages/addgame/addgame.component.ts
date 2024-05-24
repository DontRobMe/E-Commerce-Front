import { Component } from '@angular/core';
import { ProductService } from '../../services/produits/produit.service';
import { Product } from '../../services/produits/produit.service';
import {UserService} from "../../services/users/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './addgame.component.html',
})
export class AddProductComponent {
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  error: string = '';
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    rating: 0,
    image: '',
  };
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;

  constructor(private productService: ProductService, private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const token = this.userService.getToken();
      console.log('Token:', token);
    }
  }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        this.redirectTohHome();
      },
      (error) => {
        console.error('Error adding product:', error);
        this.error = error.error;
      }
    );
  }

  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File | null = (target.files as FileList)[0] || null;
    this.selectedImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.newProduct.image = reader.result as string;
    };
    reader.readAsDataURL(file as Blob);
  }
  redirectToWishlist(): void {
    const userId = this.userService.getUserId();
    if (userId) {
      this.router.navigate(['/wishlist']);
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
  redirectToCart(): void {
    const userId = this.userService.getUserId();
    if (this.isLoggedIn && userId) {
      this.router.navigate(['/cart']);
    }else {
      this.router.navigate(['/login']);
    }
  }
}
