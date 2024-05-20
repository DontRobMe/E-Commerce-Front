import { Component, OnInit } from '@angular/core';
import {UserService, USER, UserResponse} from "../../services/users/user.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
})
export class CompteComponent implements OnInit {
  user: USER | undefined;
  protected readonly UserService = UserService;

  constructor(protected userService: UserService, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.fetchUser(userId);
    } else {
      console.error('User ID not found in token.');
    }
  }

  getUserIdFromToken(): number | null {
    const token = this.userService.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken ? +decodedToken.nameid : null;
    }
    return null;
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

  // addWishlist(): void {
  //   if (this.user) {
  //     this.userService.addWishlist(this.user.id, this.gameId).subscribe((response: any) => {
  //       if (response.result) {
  //         console.log('Wishlist added:', response.result);
  //       } else {
  //         console.error('Wishlist not added:', response);
  //       }
  //     });
  //   } else {
  //     console.error('User details not available.');
  //   }
  // }

  getWishlist(): void {
    if (this.user) {
      this.userService.getWishlist(this.user.id).subscribe((response: any) => {
        if (response.result) {
          console.log('Wishlist:', response.result);
        } else {
          console.error('Wishlist not found:', response);
        }
      });
    } else {
      console.error('User details not available.');
    }
  }

  updateClient(): void {
    if (this.user) {
      this.userService.updateClient(this.user.id, this.user.name, this.user.lastname, this.user.email, this.user.address, this.user.password, this.user.birth).subscribe((response: any) => {
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

}
