// UserService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {CartProductDto, Product, WishlistProductDto} from "../produits/produit.service";
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
  private apiUrl = 'http://localhost:5209/Client/';
  private cartItems: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  register(name: string, lastname: string, email: string, address: string, password: string, birth: Date): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, {name, lastname, email, address, password, birth});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, {email, password});
  }

  getUser(id: number): Observable<USER> {
    return this.http.get<USER>(`${this.apiUrl}getclient/${id}`);
  }

  addWishlist(userId: number, gameId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}addwishlist/${userId}?gameId=${gameId}`, {});
  }


  getWishlist(userId: number): Observable<WishlistProductDto[]> {
    return this.http.get<WishlistProductDto[]>(`${this.apiUrl}getwishlist/${userId}`);
  }

  deleteWishlist(userId: number, gameId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}removewishlist/${userId}?gameId=${gameId}`);
  }

  updateClient(id: number, name: string, lastname: string, email: string, address: string, password: string, birth: Date): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}updateuser/${id}`, {name, lastname, email, address, password, birth});
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}deleteuser/${id}`);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getUserId(): number {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken.nameid;
    }
    return 0;
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }


  addCart(userId: number, gameId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}addcart/${userId}?gameId=${gameId}`,  {});
  }


  getCart(userId: number): Observable<CartProductDto[]> {
    return this.http.get<CartProductDto[]>(`${this.apiUrl}getcart/${userId}`);
  }

  deleteCart(userId: number, gameId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}removecart/${userId}?gameId=${gameId}`);
  }

  calculateTotalCost(cartItems: any[]): number {
    return cartItems.reduce((total, currentItem) => total + currentItem.product.produitPrice, 0);
  }
}

