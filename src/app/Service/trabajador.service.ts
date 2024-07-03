import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador, TrabajadorPorRol } from '../Config/iType';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) { }

  listarTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiUrl}/trabajador/list`);
  }

  getTotalTrabajadores(): Observable<{ TOTAL_TRABAJADORES: number }> {
    return this.http.get<{ TOTAL_TRABAJADORES: number }>(`${this.apiUrl}/trabajador/total`);
  }

  getTrabajadoresPorRol(): Observable<TrabajadorPorRol[]> {
    return this.http.get<TrabajadorPorRol[]>(`${this.apiUrl}/trabajador/por_rol`);
  }
  
  listarMeseros(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(`${this.apiUrl}/mesero/list`);
  }
}
