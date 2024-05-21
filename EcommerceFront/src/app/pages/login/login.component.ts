import { Component } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  Email: string = '';
  Password: string = '';
  error: string = '';

    constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.login(this.Email, this.Password).subscribe(
      (response) => {
        console.log('Login successful. ', response);
        const token = response.token; // Accédez à la propriété token de la réponse
        this.userService.storeToken(token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    );
  }
}
