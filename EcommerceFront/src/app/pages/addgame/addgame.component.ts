import { Component } from '@angular/core';
import { ProductService } from '../../services/produits/produit.service';
import { Product } from '../../services/produits/produit.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './addgame.component.html',
})
export class AddProductComponent {
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;  error: string = '';
  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    rating: 0,
    keys: '',
    image: '',
  };

  constructor(private productService: ProductService) { }

  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        //redirect to home page

      },
      (error) => {
        console.error('Error adding product:', error);
        this.error = error.error;
      }
    );
  }
  handleImageInput(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        if(e.target){
          this.imagePreview = e.target.result;
        }
        else {
          console.error('Error reading file.');
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No image selected.');
    }
  }
}
