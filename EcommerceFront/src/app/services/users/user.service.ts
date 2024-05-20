import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../produits/produit.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";

export interface USER {
  id: number;
  name: string;
  lastname: string;
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
    return this.http.post<any>(`${this.apiUrl}addwishlist/`, {userId, gameId});
  }

  getWishlist(userId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}getwishlist/${userId}`);
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

  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      return decodedToken ? +decodedToken.nameid : null;
    }
    return null;
  }
  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
