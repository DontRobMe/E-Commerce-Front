import { Component } from '@angular/core';
import { UserService } from '../../services/users/user.service';

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
  error: string = ''; // Ajouter une variable pour stocker les erreurs

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.register(this.name,this.lastname, this.email, this.address, this.password, this.birth).subscribe(response => {
      console.log('Inscription réussie:', response);
    }, error => {
      console.error('Erreur lors de l\'inscription:', error);
      this.error = error.error;
    });

  }
}