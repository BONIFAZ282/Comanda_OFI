import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaService } from 'src/app/Service/categoria.service';
import { Categoria } from 'src/app/Config/iType';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  showCategoryContent = false;
  itemsPerPage = 5;
  currentPage = 1;
  data: Categoria[] = [];
  newCategoria: string = '';
  editMode: boolean = false;
  editCategoriaId: number | null = null;

  nombreUsuario: string = '';
  apellidoPaterno: string = '';
  inicialNombre: string = '';

  constructor(private router: Router, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.listarCategorias();
    this.nombreUsuario = localStorage.getItem('nombre') || '';
    this.apellidoPaterno = localStorage.getItem('apellidoPaterno') || '';
    this.inicialNombre = this.nombreUsuario.charAt(0).toUpperCase();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  showCategory() {
    this.showCategoryContent = true;
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((data: Categoria[]) => {
      this.data = data;
    });
  }

  agregarCategoria() {
    if (this.editMode) {
      this.actualizarCategoria();
    } else {
      if (this.newCategoria.trim()) {
        this.categoriaService.crearCategoria({ NOM_CATEGORIA: this.newCategoria }).subscribe(response => {
          Swal.fire({
            icon: response.icon,
            title: 'MENSAJE DEL SISTEMA',
            text: response.text
          });
          if (response.statusCode === '201') {
            this.listarCategorias();
            this.newCategoria = '';
          }
        });
      }
    }
  }

  actualizarCategoria() {
    if (this.editCategoriaId !== null && this.newCategoria.trim()) {
      this.categoriaService.actualizarCategoria({
        ID_CATEGORIA: this.editCategoriaId,
        NOM_CATEGORIA: this.newCategoria
      }).subscribe(response => {
        Swal.fire({
          icon: response.icon,
          title: 'MENSAJE DEL SISTEMA',
          text: response.text
        });
        if (response.statusCode === '202') {
          this.listarCategorias();
          this.newCategoria = '';
          this.editMode = false;
          this.editCategoriaId = null;
        }
      });
    }
  }

  editarCategoria(categoria: Categoria) {
    this.newCategoria = categoria.NOM_CATEGORIA;
    this.editMode = true;
    this.editCategoriaId = categoria.ID_CATEGORIA;
  }

  cancelarEdicion() {
    this.newCategoria = '';
    this.editMode = false;
    this.editCategoriaId = null;
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
        this.eliminarCategoria(id);
      }
    });
  }

  eliminarCategoria(id: number) {
    this.categoriaService.eliminarCategoria(id).subscribe(response => {
      Swal.fire({
        icon: response.icon,
        title: 'MENSAJE DEL SISTEMA',
        text: response.text
      });
      if (response.statusCode === '202') {
        this.listarCategorias();
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede eliminar la categoría porque está relacionada con un plato'
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
