import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent {
  showTrabajadorContent = false;
  itemsPerPage = 5;
  currentPage = 1;

  data = [
    { id: 1, dni: '12345678', nombre: 'Juan', paterno: 'Lopez', materno: 'Vera', telefono: '123456789', correo: 'example@gmail.com', rol: 'administrador' },
    { id: 2, dni: '12345678', nombre: 'Juan', paterno: 'Lopez', materno: 'Vera', telefono: '123456789', correo: 'example@gmail.com', rol: 'administrador' },
  ];

  constructor(private router: Router) {}

  navigateToPrincipal() {
    this.router.navigate(['/principal']);
  }

  showTrabajador() {
    this.showTrabajadorContent = true;
  }

  isActive(url: string): boolean {
    return this.router.url === url;
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
        this.deleteData(id);
        Swal.fire(
          '¡Eliminado!',
          'El dato ha sido eliminado.',
          'success'
        );
      }
    });
  }

  deleteData(id: number) {
    // Aquí va la lógica para eliminar el dato con el id proporcionado
    console.log(`Dato con id ${id} eliminado.`);
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


