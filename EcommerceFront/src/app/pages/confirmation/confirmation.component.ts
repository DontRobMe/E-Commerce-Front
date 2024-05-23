import {Component, OnInit} from '@angular/core';
import {CartProductDto} from "../../services/produits/produit.service";
import {UserService} from "../../services/users/user.service";
import {CodeGeneratorService} from "../../services/CodeGeneratorService/code-generator-service.service";
import { jsPDF } from 'jspdf';
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  cartItems: { product: CartProductDto; code: string }[] = [];
  totalCost: number = 0;
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;
  isLoading: boolean = true;

  constructor(private cartService: UserService, private codeGeneratorService: CodeGeneratorService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.cartService.isLoggedIn();
    if (this.isLoggedIn) {
      const id = this.cartService.getUserId();
      this.fetchCart(id);
    }
  }

  fetchCart(userId: number) {
    this.cartService.getCart(userId).subscribe(
      (response: any) => {
        console.log('Panier API response:', response);
        if (response && response.$values && response.$values.length > 0) {
          this.cartItems = response.$values.map((item: any) => ({
            product: item,
            code: this.codeGeneratorService.generateCode()
          }));
          this.totalCost = this.cartService.calculateTotalCost(this.cartItems);
          this.isLoading = false;
        } else {
          console.warn('La réponse du panier est vide ou invalide:', response);
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du panier:', error);
        this.isLoading = false;
      }
    );
  }


  generateInvoicePdf(): Blob {
    const doc = new jsPDF();

    doc.text('Facture', 10, 10);

    let y = 20;
    this.cartItems.forEach(item => {
      doc.text(`Produit: ${item.product.produitName}`, 10, y);
      doc.text(`Prix: ${item.product.produitPrice}€`, 10, y + 10);
        y += 30;
    });

    doc.text(`Total: ${this.totalCost}€`, 10, y);

    return doc.output('blob');
  }

  downloadInvoice() {
    const blob = this.generateInvoicePdf();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'facture.pdf';
    link.click();
  }
  redirectTohHome(): void {
    this.router.navigate(['/home']);
  }
}
