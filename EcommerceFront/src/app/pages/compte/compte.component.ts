// CompteComponent
import { Component, OnInit } from '@angular/core';
import { UserService, USER, UserResponse } from "../../services/users/user.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import {ActivatedRoute, Router} from "@angular/router";
import {FactureService} from "../../services/facture/facture.service";

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
})
export class CompteComponent implements OnInit {
  user: USER | undefined;
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;
  factures: any[] = [];
  constructor(protected userService: UserService, private route: ActivatedRoute, private router: Router, private factureservice : FactureService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const token = this.userService.getToken();
      const id = this.userService.getUserId()
      console.log('Token:', token);
      this.fetchUser(id);
      this.fetchFactures(id);
    }
  }

  fetchUser(userId: number): void {
    // @ts-ignore
    this.userService.getUser(userId).subscribe((response: UserResponse) => {
      if (response.result) {
        // @ts-ignore
        this.user = response.result;
        console.log('User details:', this.user);
      } else {
        console.error('User not found in response:', response);
      }
    });
  }

  fetchFactures(userId: number): void {
    this.factureservice.getFacture(userId).subscribe(
      (response: any) => {
        this.factures = response.$values; // Récupérez les factures de la réponse
        console.log('Factures:', this.factures);
      },
      (error: any) => {
        console.error('Error fetching factures:', error);
      }
    );
  }

  // Méthode pour mettre à jour les informations de l'utilisateur
  updateClient(): void {
    if (this.user) {
      this.userService.updateClient(this.user.id, this.user.name, this.user.lastName, this.user.email, this.user.address, this.user.password, this.user.birth).subscribe((response: any) => {
        if (response.result) {
          console.log('User updated:', response.result);
        } else {
          console.error('User not updated:', response);
        }
      });
    } else {
      console.error('User details not available.');
    }
  }

  deleteClient(): void {
    if (this.user) {
      this.userService.deleteClient(this.user.id).subscribe((response: any) => {
        if (response.result) {
          console.log('User deleted:', response.result);
        } else {
          console.error('User not deleted:', response);
        }
      });
    } else {
      console.error('User details not available.');
    }
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

  downloadInvoice(facture: any): void {
    // Ensure facture object and its ID are valid
    if (facture && facture.id) {
      console.log('Facture ID:', facture.id);
      // Assuming facture.id is the ID of the invoice to be retrieved
      this.factureservice.getFactures(facture.id).subscribe(
        (response: any) => {
          console.log('Invoice downloaded:', response);

          // Check if response contains fichierPDF property
          if (response && response.fichierPDF) {
            // Convert the invoice to base64
            const base64Data = response.fichierPDF;
            console.log('Base64 data:', base64Data);
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // Create a Blob object
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            // Create a URL for the Blob and trigger the download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'facture.pdf'; // Nom du fichier à télécharger
            a.click();
          } else {
            console.error('Error: No fichierPDF property found in response.');
          }
        },
        (error: any) => {
          console.error('Error downloading invoice:', error);
        }
      );
    } else {
      console.error('Error: Invalid facture object or ID.');
    }
  }







}

