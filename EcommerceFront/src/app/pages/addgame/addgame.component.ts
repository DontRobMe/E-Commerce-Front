import { Component } from '@angular/core';
import { ProductService } from '../../services/produits/produit.service';
import { Product } from '../../services/produits/produit.service';

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

  constructor(private productService: ProductService) { }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      (response) => {
        console.log('Product added successfully:', response);

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
}
