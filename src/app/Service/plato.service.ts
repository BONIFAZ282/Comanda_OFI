import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem, Categoria } from '../Config/iType';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) { }

  listarPlatos(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/plato/list`);
  }

  crearPlato(plato: { ID_CATEGORIA: number, NOMBRE: string, DESCRIPCION: string, PRECIO: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/plato/crear`, plato);
  }

  actualizarPlato(plato: { ID_PLATO: number, ID_CATEGORIA: number, NOMBRE: string, DESCRIPCION: string, PRECIO: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/plato/actualizar`, plato);
  }

  eliminarPlato(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/plato/eliminar`, { ID_PLATO: id });
  }

  listarCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categoria/list`);
  }
}
