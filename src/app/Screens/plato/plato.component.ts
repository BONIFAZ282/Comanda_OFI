import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent {
  showPlatoContent = false;
  itemsPerPage = 5;
  currentPage = 1;

  data = [
    { id: 1, nombre: 'Plato 1', precio: '50', categoria: 'fondo' },
    { id: 2, nombre: 'Plato 2', precio: '50', categoria: 'fondo' },
    { id: 3, nombre: 'Plato 3', precio: '50', categoria: 'fondo' },
    { id: 4, nombre: 'Plato 4', precio: '50', categoria: 'fondo' },
    { id: 5, nombre: 'Plato 5', precio: '50', categoria: 'fondo' },
    { id: 6, nombre: 'Plato 6', precio: '50', categoria: 'fondo' },
    { id: 7, nombre: 'Plato 7', precio: '50', categoria: 'fondo' },
    { id: 8, nombre: 'Plato 8', precio: '50', categoria: 'fondo' },
    { id: 9, nombre: 'Plato 9', precio: '50', categoria: 'fondo' },
    { id: 10, nombre: 'Plato 10', precio: '50', categoria: 'fondo' },
  ];

  constructor(private router: Router) {}

  navigateToPrincipal() {
    this.router.navigate(['/principal']);
  }

  showPlato() {
    this.showPlatoContent = true;
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

