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

  crearMesa(mesa: { NUMERO: number, CAPACIDAD: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mesa/crear`, mesa);
  }

  actualizarMesa(mesa: { ID_MESA: number, NUMERO: number, CAPACIDAD: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mesa/actualizar`, mesa);
  }

  eliminarMesa(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mesa/eliminar`, { ID_MESA: id });
  }
}
