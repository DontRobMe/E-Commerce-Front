import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/produits/produit.service";
import {UserService} from "../../services/users/user.service";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  templateUrl: './wishlist.component.html',
})
export class WishlistComponent {

  constructor( private route: ActivatedRoute,
               private productService: ProductService,
               private userService: UserService,
               private router: Router) {
  }



}
