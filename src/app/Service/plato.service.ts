import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../Config/iType';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) { }

  listarPlatos(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/plato/list`);
  }
}
