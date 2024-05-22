// CompteComponent
import { Component, OnInit } from '@angular/core';
import { UserService, USER, UserResponse } from "../../services/users/user.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
})
export class CompteComponent implements OnInit {
  user: USER | undefined;
  isLoggedIn: boolean = false;
  showDropdown: boolean = false;

  constructor(protected userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    if (this.isLoggedIn) {
      const token = this.userService.getToken();
      const id = this.userService.getUserId()
      console.log('Token:', token);
      this.fetchUser(id)
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
}

