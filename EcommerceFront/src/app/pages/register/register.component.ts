import { Component } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name: string = '';
  lastname: string = '';
  email: string = '';
  address: string = '';
  password: string = '';
  birth: Date = new Date();
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.register(this.name, this.lastname, this.email, this.address, this.password, this.birth).subscribe(
      (response) => {
        console.log('Inscription réussie:', response);
        const token = response.token; // Accédez à la propriété token de la réponse
        this.userService.storeToken(token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        this.error = error.error;
      }
    );
  }
}

