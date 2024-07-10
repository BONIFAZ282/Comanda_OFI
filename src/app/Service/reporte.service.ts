import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) {}

  listarReportesGanancias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reporte/ganancias`);
  }
}
