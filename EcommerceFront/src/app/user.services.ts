﻿import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7056/Client/';

  constructor(private http: HttpClient) {
  }

  register(name: string, lastname: string, email: string, address: string, password: string, birth: Date): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, {name, lastname, email, address, password, birth});
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, {username, password});
  }
}
