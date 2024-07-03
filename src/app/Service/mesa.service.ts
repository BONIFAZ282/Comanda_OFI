import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../Config/iType';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) { }

  listarMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.apiUrl}/mesa/list`);
  }
}
