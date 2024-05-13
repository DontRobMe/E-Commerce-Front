import { Component } from '@angular/core';
import { UserService } from '../user.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.login(this.username, this.password)
      .subscribe(response => {
        console.log('Connexion réussie:', response);
        // Rediriger vers une autre page ou afficher un message de succès
      }, error => {
        console.error('Erreur lors de la connexion:', error);
        // Afficher un message d'erreur à l'utilisateur
      });
  }
}
