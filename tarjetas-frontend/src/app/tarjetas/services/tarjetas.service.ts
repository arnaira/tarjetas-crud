import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'http://localhost:3000/tarjetas';

  constructor(private http: HttpClient) {}

  getTarjetas() {
    return this.http.get(this.apiUrl);
  }

  createTarjeta(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  updateTarjeta(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteTarjeta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
