import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MesaService } from 'src/app/Service/mesa.service';
import { Mesa } from 'src/app/Config/iType';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  showMesaContent = false;
  itemsPerPage = 5;
  currentPage = 1;
  data: Mesa[] = [];

  numeroMesa: number | null = null;
  capacidadMesa: number | null = null;
  editMode: boolean = false;
  editMesaId: number | null = null;

  constructor(private router: Router, private mesaService: MesaService) {}

  ngOnInit(): void {
    this.listarMesas();
  }

  navigateToPrincipal() {
    this.router.navigate(['/principal']);
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  listarMesas() {
    this.mesaService.listarMesas().subscribe((data: Mesa[]) => {
      this.data = data;
    });
  }

  agregarMesa() {
    if (this.editMode) {
      this.actualizarMesa();
    } else {
      if (this.numeroMesa !== null && this.capacidadMesa !== null) {
        this.mesaService.crearMesa({ NUMERO: this.numeroMesa, CAPACIDAD: this.capacidadMesa }).subscribe(response => {
          Swal.fire({
            icon: response.icon,
            title: 'MENSAJE DEL SISTEMA',
            text: response.text
          });
          if (response.statusCode === '201') {
            this.listarMesas();
            this.numeroMesa = null;
            this.capacidadMesa = null;
          }
        });
      }
    }
  }

  actualizarMesa() {
    if (this.editMesaId !== null && this.numeroMesa !== null && this.capacidadMesa !== null) {
      this.mesaService.actualizarMesa({
        ID_MESA: this.editMesaId,
        NUMERO: this.numeroMesa,
        CAPACIDAD: this.capacidadMesa
      }).subscribe(response => {
        Swal.fire({
          icon: response.icon,
          title: 'MENSAJE DEL SISTEMA',
          text: response.text
        });
        if (response.statusCode === '202') {
          this.listarMesas();
          this.numeroMesa = null;
          this.capacidadMesa = null;
          this.editMode = false;
          this.editMesaId = null;
        }
      });
    }
  }

  editarMesa(mesa: Mesa) {
    this.numeroMesa = mesa.NUMERO;
    this.capacidadMesa = mesa.CAPACIDAD;
    this.editMode = true;
    this.editMesaId = mesa.ID_MESA;
  }

  cancelarEdicion() {
    this.numeroMesa = null;
    this.capacidadMesa = null;
    this.editMode = false;
    this.editMesaId = null;
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34495e',
      cancelButtonColor: 'rgb(170, 34, 34)',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarMesa(id);
      }
    });
  }

  eliminarMesa(id: number) {
    this.mesaService.eliminarMesa(id).subscribe(response => {
      Swal.fire({
        icon: response.icon,
        title: 'MENSAJE DEL SISTEMA',
        text: response.text
      });
      if (response.statusCode === '202') {
        this.listarMesas();
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede eliminar la mesa porque está relacionada con un pedido'
      });
    });
  }

  paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
