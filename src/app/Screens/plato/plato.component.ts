import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PlatoService } from 'src/app/Service/plato.service';
import { MenuItem, Categoria } from 'src/app/Config/iType';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {
  showPlatoContent = false;
  itemsPerPage = 5;
  currentPage = 1;
  data: MenuItem[] = [];
  categorias: Categoria[] = [];

  newPlato = {
    ID_CATEGORIA: 0,
    NOMBRE: '',
    DESCRIPCION: '',
    PRECIO: 0
  };
  editMode: boolean = false;
  editPlatoId: number | null = null;

  constructor(private router: Router, private platoService: PlatoService) {}

  ngOnInit(): void {
    this.listarPlatos();
    this.listarCategorias();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  showPlato() {
    this.showPlatoContent = true;
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  listarPlatos() {
    this.platoService.listarPlatos().subscribe((data: MenuItem[]) => {
      this.data = data;
    });
  }

  listarCategorias() {
    this.platoService.listarCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data;
    });
  }

  agregarPlato() {
    if (this.editMode) {
      this.actualizarPlato();
    } else {
      if (this.newPlato.NOMBRE.trim() && this.newPlato.PRECIO > 0 && this.newPlato.ID_CATEGORIA) {
        this.platoService.crearPlato(this.newPlato).subscribe(response => {
          Swal.fire({
            icon: response.icon,
            title: 'MENSAJE DEL SISTEMA',
            text: response.text
          });
          if (response.statusCode === '201') {
            this.listarPlatos();
            this.newPlato = { ID_CATEGORIA: 0, NOMBRE: '', DESCRIPCION: '', PRECIO: 0 };
          }
        });
      }
    }
  }

  actualizarPlato() {
    if (this.editPlatoId !== null && this.newPlato.NOMBRE.trim() && this.newPlato.PRECIO > 0 && this.newPlato.ID_CATEGORIA) {
      this.platoService.actualizarPlato({
        ID_PLATO: this.editPlatoId,
        ID_CATEGORIA: this.newPlato.ID_CATEGORIA,
        NOMBRE: this.newPlato.NOMBRE,
        DESCRIPCION: this.newPlato.DESCRIPCION,
        PRECIO: this.newPlato.PRECIO
      }).subscribe(response => {
        Swal.fire({
          icon: response.icon,
          title: 'MENSAJE DEL SISTEMA',
          text: response.text
        });
        if (response.statusCode === '202') {
          this.listarPlatos();
          this.newPlato = { ID_CATEGORIA: 0, NOMBRE: '', DESCRIPCION: '', PRECIO: 0 };
          this.editMode = false;
          this.editPlatoId = null;
        }
      });
    }
  }

  editarPlato(plato: MenuItem) {
    this.newPlato = {
      ID_CATEGORIA: plato.ID_CATEGORIA,
      NOMBRE: plato.NOMBRE,
      DESCRIPCION: plato.DESCRIPCION,
      PRECIO: plato.PRECIO
    };
    this.editMode = true;
    this.editPlatoId = plato.ID_PLATO;
  }

  cancelarEdicion() {
    this.newPlato = { ID_CATEGORIA: 0, NOMBRE: '', DESCRIPCION: '', PRECIO: 0 };
    this.editMode = false;
    this.editPlatoId = null;
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
        this.eliminarPlato(id);
      }
    });
  }

  eliminarPlato(id: number) {
    this.platoService.eliminarPlato(id).subscribe(response => {
      Swal.fire({
        icon: response.icon,
        title: 'MENSAJE DEL SISTEMA',
        text: response.text
      });
      if (response.statusCode === '202') {
        this.listarPlatos();
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede eliminar el plato porque está relacionado con un pedido'
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

  getCategoriaNombre(id: number): string {
    const categoria = this.categorias.find(cat => cat.ID_CATEGORIA === id);
    return categoria ? categoria.NOM_CATEGORIA : '';
  }
}
