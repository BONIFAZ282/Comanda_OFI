import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../Config/iType';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) { }

  listarRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/rol/list`);
  }

  crearRol(rol: { NOM_ROL: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rol/create`, rol);
  }

  actualizarRol(rol: { ID_ROL: number, NOM_ROL: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rol/update`, rol);
  }

  eliminarRol(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rol/delete`, { ID_ROL: id });
  }
}
