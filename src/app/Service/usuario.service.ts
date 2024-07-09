import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) {}

  login(documento: string, contrasenia: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth`, { DOCUMENTO: documento, CONTRASENIA: contrasenia });
  }
}
