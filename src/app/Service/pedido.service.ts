import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, DetallePedido } from '../Config/iType';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost/Muelle';

  constructor(private http: HttpClient) { }

  crearPedido(pedidoData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedido/crear`, pedidoData);
  }

  listarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedido/list`);
  }

  verDetallePedido(ID_PEDIDO: number): Observable<DetallePedido[]> {
    return this.http.post<DetallePedido[]>(`${this.apiUrl}/pedido/detalle`, { ID_PEDIDO });
  }

  cambiarEstadoPedido(ID_PEDIDO: number, ESTADO: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pedido/cambiar_estado`, { ID_PEDIDO, ESTADO });
  }
}
