import { Component, OnInit } from '@angular/core';
import { CartProductDto } from "../../services/produits/produit.service";
import { UserService } from "../../services/users/user.service";
import { CodeGeneratorService } from "../../services/CodeGeneratorService/code-generator-service.service";
import { jsPDF } from 'jspdf';
import { Router } from "@angular/router";
import { FactureDtoarray, FactureService } from "../../services/facture/facture.service";

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
  id: number = 0;

  constructor(private cartService: UserService, private codeGeneratorService: CodeGeneratorService, private router: Router, protected factureService: FactureService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.cartService.isLoggedIn();
    if (this.isLoggedIn) {
      this.id = this.cartService.getUserId();
      this.fetchCart(this.id);
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

  generateInvoicePdf(): string {
    const doc = new jsPDF();
    doc.text('Facture', 10, 10);
    let y = 20;
    this.cartItems.forEach(item => {
      doc.text(`Produit: ${item.product.produitName}`, 10, y);
      doc.text(`Prix: ${item.product.produitPrice}€`, 10, y + 10);
      y += 30;
    });
    doc.text(`Total: ${this.totalCost}€`, 10, y);

    // Convert the PDF to an ArrayBuffer
    const pdfArrayBuffer = doc.output('arraybuffer');

    // Convert the ArrayBuffer to a Uint8Array
    const uint8Array = new Uint8Array(pdfArrayBuffer);

    // Encode the Uint8Array to Base64
    const pdfData = this.arrayBufferToBase64(uint8Array);

    return pdfData; // Return the base64-encoded PDF data
  }

// Function to convert ArrayBuffer to Base64
  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    buffer.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
  }

  async addFacture() {
    try {
      const pdfData = this.generateInvoicePdf();

      const facture: FactureDtoarray = {
        clientId: 1,
        date: new Date().toISOString(),
        fichierPDF: pdfData
      };

      await this.factureService.addFacture(facture).toPromise();
      console.log('Facture ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la facture :', error);
    }
  }


  downloadInvoice() {
    const pdf = this.generateInvoicePdf();
    const blob = new Blob([pdf], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'facture.pdf';
    link.click();
  }

  redirectTohHome(): void {
    this.router.navigate(['/home']);
  }

  async downloadInvoiceWithFacture() {
    await this.addFacture();
    this.downloadInvoice();
    this.redirectTohHome();
  }
}
