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

  crearTrabajador(trabajador: Trabajador): Observable<any> {
    // Eliminamos el campo ID_PRIVILEGIO del trabajador antes de enviarlo
    const { ID_PRIVILEGIO, ...trabajadorData } = trabajador;
    return this.http.post<any>(`${this.apiUrl}/trabajador/create`, trabajadorData);
}


  actualizarTrabajador(trabajador: Trabajador): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trabajador/update`, trabajador);
  }

  eliminarTrabajador(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trabajador/delete`, { ID_TRABAJADOR: id });
  }
}
