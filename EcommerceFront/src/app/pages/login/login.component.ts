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
    this.userService.login(this.Email, this.Password).subscribe(response => {
        console.log('Connexion réussie:', response);
         this.router.navigate(['/home']);
      }, error => {
        console.error('Erreur lors de la connexion:', error);
        this.error = error.error;
      });
  }
}
