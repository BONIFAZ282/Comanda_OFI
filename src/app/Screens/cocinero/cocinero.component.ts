import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/Service/pedido.service';
import { MesaService } from 'src/app/Service/mesa.service';
import { TrabajadorService } from 'src/app/Service/trabajador.service';
import { Pedido, DetallePedido, Mesa, Trabajador } from 'src/app/Config/iType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.css']
})
export class CocineroComponent implements OnInit {
  pedidos: Pedido[] = [];
  detallesPedido: DetallePedido[] = [];
  pedidoSeleccionado: Pedido | null = null;
  mesas: Mesa[] = [];
  trabajadores: Trabajador[] = [];

  constructor(
    private pedidoService: PedidoService,
    private mesaService: MesaService,
    private trabajadorService: TrabajadorService
  ) { }

  ngOnInit() {
    this.loadPedidos();
    this.loadMesas();
    this.loadTrabajadores();
  }

  loadPedidos() {
    this.pedidoService.listarPedidos().subscribe(data => {
      this.pedidos = data.filter(pedido => pedido.ESTADO !== 'T');
    });
  }

  loadMesas() {
    this.mesaService.listarMesas().subscribe(data => {
      this.mesas = data;
    });
  }

  loadTrabajadores() {
    this.trabajadorService.listarTrabajadores().subscribe(data => {
      this.trabajadores = data;
    });
  }

  getMesaNumero(idMesa: number) {
    const mesa = this.mesas.find(m => m.ID_MESA === idMesa);
    return mesa ? mesa.NUMERO : '';
  }

  getTrabajadorNombre(idTrabajador: number) {
    const trabajador = this.trabajadores.find(t => t.ID_TRABAJADOR === idTrabajador);
    return trabajador ? trabajador.NOMBRES : '';
  }

  verDetallePedido(pedido: Pedido) {
    this.pedidoSeleccionado = pedido;
    this.pedidoService.verDetallePedido(pedido.ID_PEDIDO).subscribe(data => {
      this.detallesPedido = data;
    });
  }

  cambiarEstadoPedido(estado: string) {
    if (this.pedidoSeleccionado) {
      this.pedidoService.cambiarEstadoPedido(this.pedidoSeleccionado.ID_PEDIDO, estado).subscribe(() => {
        if (estado === 'T') {
          Swal.fire({
            icon: 'success',
            title: 'Pedido Terminado',
            text: 'El pedido ha sido marcado como terminado',
            timer: 2000,
            showConfirmButton: false
          });
          this.pedidoSeleccionado = null;
          this.loadPedidos();
        }
      }, error => {
        console.error('Error al cambiar estado del pedido', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al cambiar el estado del pedido',
          timer: 2000,
          showConfirmButton: false
        });
      });
    }
  }
}
