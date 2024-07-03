import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  showCategoryContent = false;
  itemsPerPage = 5;
  currentPage = 1;

  data = [
    { id: 1, nombre: 'Categoria 1'},
    { id: 2, nombre: 'Categoria 2'},
    { id: 3, nombre: 'Categoria 3'},
    { id: 4, nombre: 'Categoria 4'},
    { id: 5, nombre: 'Categoria 5'},
    { id: 6, nombre: 'Categoria 6'},
    { id: 7, nombre: 'Categoria 7'},
    { id: 8, nombre: 'Categoria 8'},
    { id: 9, nombre: 'Categoria 9'},
    { id: 10, nombre: 'Categoria 10'},
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  showCategory() {
    this.showCategoryContent = true;
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
