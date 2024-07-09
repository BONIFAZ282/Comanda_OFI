import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../Config/iType';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) { }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categoria/list`);
  }

  crearCategoria(categoria: { NOM_CATEGORIA: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categoria/create`, categoria);
  }

  actualizarCategoria(categoria: { ID_CATEGORIA: number, NOM_CATEGORIA: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categoria/update`, categoria);
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categoria/delete`, { ID_CATEGORIA: id });
  }
}
