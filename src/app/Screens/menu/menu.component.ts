import { Component, OnInit } from '@angular/core';
import { PlatoService } from 'src/app/Service/plato.service';
import { PedidoService } from 'src/app/Service/pedido.service';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { TrabajadorService } from 'src/app/Service/trabajador.service';
import { MesaService } from 'src/app/Service/mesa.service';
import { MenuItem, Categoria, Mesa, Trabajador } from '../../Config/iType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categorias: Categoria[] = [];
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  order: { item: MenuItem, cantidad: number }[] = [];
  selectedCategory: number = 0;

  ID_MESA: number = 0;
  ID_TRABAJADOR: number = 0;
  mesas: Mesa[] = [];
  trabajadores: Trabajador[] = [];
  fechaActual: string = '';  // Inicializa fechaActual

  constructor(
    private platoService: PlatoService,
    private pedidoService: PedidoService,
    private categoriaService: CategoriaService,
    private trabajadorService: TrabajadorService,
    private mesaService: MesaService
  ) {
    this.fechaActual = this.formatDate(new Date());
  }

  ngOnInit() {
    this.loadCategories();
    this.loadMenuItems();
    this.loadMesas();
    this.loadMeseros();
  }

  loadCategories() {
    this.categoriaService.listarCategorias().subscribe(data => {
      this.categorias = data;
      if (this.categorias.length > 0) {
        this.selectCategory(this.categorias[0].ID_CATEGORIA);
      }
    });
  }

  loadMenuItems() {
    this.platoService.listarPlatos().subscribe(data => {
      this.menuItems = data;
      if (this.selectedCategory) {
        this.filterMenuItems();
      }
    });
  }

  loadMesas() {
    this.mesaService.listarMesas().subscribe(data => {
      this.mesas = data;
    });
  }

  loadMeseros() {
    this.trabajadorService.listarMeseros().subscribe(data => {
      this.trabajadores = data;
    });
  }

  selectCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    this.filterMenuItems();
  }

  filterMenuItems() {
    this.filteredMenuItems = this.menuItems.filter(item => item.ID_CATEGORIA === this.selectedCategory);
  }

  addToOrder(item: MenuItem) {
    const orderItem = this.order.find(orderItem => orderItem.item.ID_PLATO === item.ID_PLATO);
    if (orderItem) {
      orderItem.cantidad++;
    } else {
      this.order.push({ item, cantidad: 1 });
    }
  }

  removeFromOrder(item: MenuItem) {
    const index = this.order.findIndex(orderItem => orderItem.item.ID_PLATO === item.ID_PLATO);
    if (index > -1) {
      if (this.order[index].cantidad > 1) {
        this.order[index].cantidad--;
      } else {
        this.order.splice(index, 1);
      }
    }
  }

  getTotal() {
    return this.order.reduce((total, orderItem) => total + (orderItem.item.PRECIO * orderItem.cantidad), 0);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  getMesaNumero(ID_MESA: number): string {
    const mesa = this.mesas.find(m => m.ID_MESA === ID_MESA);
    return mesa ? String(mesa.NUMERO) : '';
  }

  getTrabajadorAppaterno(ID_TRABAJADOR: number): string {
    const trabajador = this.trabajadores.find(t => t.ID_TRABAJADOR === ID_TRABAJADOR);
    return trabajador ? trabajador.NOMBRES : '';
  }

  confirmarPedido() {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Está a punto de finalizar el pedido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, finalizar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.finalizarPedido();
      }
    });
  }

  finalizarPedido() {
    const pedidoData = {
      ID_MESA: this.ID_MESA,
      ID_TRABAJADOR: this.ID_TRABAJADOR,
      F_PEDIDO: this.fechaActual,  // Asegúrate de que esté en formato YYYY-MM-DD HH:MM:SS
      ESTADO: 'C',
      DETALLES: this.order.map(orderItem => ({
        ID_PLATO: orderItem.item.ID_PLATO,
        CANTIDAD: orderItem.cantidad
      }))
    };

    this.pedidoService.crearPedido(pedidoData).subscribe(response => {
      Swal.fire('Pedido Creado', 'El pedido se ha creado correctamente', 'success');
      this.order = [];
    }, error => {
      console.error('Error al crear pedido', error);
      Swal.fire('Error', 'Hubo un problema al crear el pedido', 'error');
    });
  }
}
