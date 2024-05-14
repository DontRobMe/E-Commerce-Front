import { Component } from '@angular/core';
import { UserService } from '../user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Email: string = '';
  Password: string = '';
  error: string = '';

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.login(this.Email, this.Password).subscribe(response => {
        console.log('Connexion réussie:', response);
      }, error => {
        console.error('Erreur lors de la connexion:', error);
        this.error = error.error;
      });
  }
}
