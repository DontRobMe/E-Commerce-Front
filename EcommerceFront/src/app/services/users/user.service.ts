// UserService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product, WishlistProductDto} from "../produits/produit.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";

export interface USER {
  id: number;
  name: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  birth: Date;
}

export interface UserResponse {
  result: USER[];
  message: string | null;
  isSuccess: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7056/Client/';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  // Méthode pour l'enregistrement d'un utilisateur
  register(name: string, lastname: string, email: string, address: string, password: string, birth: Date): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, {name, lastname, email, address, password, birth});
  }

  // Méthode pour la connexion d'un utilisateur
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, {email, password});
  }

  // Méthode pour récupérer les détails d'un utilisateur
  getUser(id: number): Observable<USER> {
    return this.http.get<USER>(`${this.apiUrl}getclient/${id}`);
  }

  addWishlist(userId: number, gameId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}addwishlist/${userId}?gameId=${gameId}`, {});
  }


  // Méthode pour récupérer la liste de souhaits de l'utilisateur
  getWishlist(userId: number): Observable<WishlistProductDto[]> {
    return this.http.get<WishlistProductDto[]>(`${this.apiUrl}getwishlist/${userId}`);
  }

  // Méthode pour supprimer un jeu de la liste de souhaits de l'utilisateur
  deleteWishlist(userId: number, gameId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}removewishlist/${userId}?gameId=${gameId}`);
  }

  // Méthode pour mettre à jour les informations d'un utilisateur
  updateClient(id: number, name: string, lastname: string, email: string, address: string, password: string, birth: Date): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}updateuser/${id}`, {name, lastname, email, address, password, birth});
  }

  // Méthode pour supprimer un utilisateur
  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}deleteuser/${id}`);
  }

  // Méthode pour stocker le token dans le localStorage
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Méthode pour récupérer le token depuis le localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Méthode pour supprimer le token du localStorage
  removeToken() {
    localStorage.removeItem('token');
  }

  // Méthode pour récupérer l'ID de l'utilisateur à partir du token
  getUserId(): number {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.nameid;
    }
    return 0;
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

