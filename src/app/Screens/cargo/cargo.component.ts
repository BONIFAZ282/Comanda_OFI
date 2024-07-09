import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolService } from 'src/app/Service/rol.service';
import { Rol } from 'src/app/Config/iType';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {
  showCargoContent = false;
  itemsPerPage = 5;
  currentPage = 1;
  data: Rol[] = [];

  newRol = {
    NOM_ROL: ''
  };
  editMode: boolean = false;
  editRolId: number | null = null;

  constructor(private router: Router, private rolService: RolService) {}

  ngOnInit(): void {
    this.listarRoles();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  showCargo() {
    this.showCargoContent = true;
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  listarRoles() {
    this.rolService.listarRoles().subscribe((data: Rol[]) => {
      this.data = data;
    });
  }

  agregarRol() {
    if (this.editMode) {
      this.actualizarRol();
    } else {
      if (this.newRol.NOM_ROL.trim()) {
        this.rolService.crearRol(this.newRol).subscribe(response => {
          Swal.fire({
            icon: response.icon,
            title: 'MENSAJE DEL SISTEMA',
            text: response.text
          });
          if (response.statusCode === '201') {
            this.listarRoles();
            this.newRol = { NOM_ROL: '' };
          }
        });
      }
    }
  }

  actualizarRol() {
    if (this.editRolId !== null && this.newRol.NOM_ROL.trim()) {
      this.rolService.actualizarRol({
        ID_ROL: this.editRolId,
        NOM_ROL: this.newRol.NOM_ROL
      }).subscribe(response => {
        Swal.fire({
          icon: response.icon,
          title: 'MENSAJE DEL SISTEMA',
          text: response.text
        });
        if (response.statusCode === '202') {
          this.listarRoles();
          this.newRol = { NOM_ROL: '' };
          this.editMode = false;
          this.editRolId = null;
        }
      });
    }
  }

  editarRol(rol: Rol) {
    this.newRol = { NOM_ROL: rol.NOM_ROL };
    this.editMode = true;
    this.editRolId = rol.ID_ROL;
  }

  cancelarEdicion() {
    this.newRol = { NOM_ROL: '' };
    this.editMode = false;
    this.editRolId = null;
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
        this.eliminarRol(id);
      }
    });
  }

  eliminarRol(id: number) {
    this.rolService.eliminarRol(id).subscribe(response => {
      Swal.fire({
        icon: response.icon,
        title: 'MENSAJE DEL SISTEMA',
        text: response.text
      });
      if (response.statusCode === '202') {
        this.listarRoles();
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede eliminar el rol porque está relacionado con un trabajador'
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
