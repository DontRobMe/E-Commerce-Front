import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FactureDto {
  clientId: number;
  date: Date;
  fichierPDF: Blob;
}
export interface FactureDtoarray {
  clientId: number;
  date: string;
  fichierPDF:string ;
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = `${environment.apiURL}/Factures`;

  constructor(private http: HttpClient) {}

  addFacture(facture: FactureDtoarray): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, facture);
  }

  getFacture(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get/${id}`);
  }
  getFactures(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getf/${id}`);
  }
}
