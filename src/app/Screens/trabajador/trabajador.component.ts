import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajadorService } from 'src/app/Service/trabajador.service';
import { RolService } from 'src/app/Service/rol.service';
import { Trabajador, Rol } from 'src/app/Config/iType';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {
  showTrabajadorContent = false;
  itemsPerPage = 5;
  currentPage = 1;
  data: Trabajador[] = [];
  roles: Rol[] = [];

  newTrabajador: Trabajador = {
    ID_TRABAJADOR: 0,
    ID_ROL: 0,
    ROL: '',
    ID_PERSONA: 0,
    NOMBRES: '',
    APPATERNO: '',
    APMATERNO: '',
    DOCUMENTO: '',
    CORREO: '',
    TELEFONO: '',
    ID_USUARIO: 0,
    ID_PRIVILEGIO: 0,
    CONTRASENIA: ''
  };
  editMode: boolean = false;

  constructor(
    private router: Router,
    private trabajadorService: TrabajadorService,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
    this.listarTrabajadores();
    this.listarRoles();
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  listarTrabajadores() {
    this.trabajadorService.listarTrabajadores().subscribe((data: Trabajador[]) => {
      this.data = data;
    });
  }

  listarRoles() {
    this.rolService.listarRoles().subscribe((roles: Rol[]) => {
      this.roles = roles;
    });
  }

  agregarTrabajador() {
    if (this.editMode) {
      this.actualizarTrabajador();
    } else {
      this.trabajadorService.crearTrabajador(this.newTrabajador).subscribe(response => {
        Swal.fire({
          icon: response.icon,
          title: 'MENSAJE DEL SISTEMA',
          text: response.text
        });
        if (response.statusCode === '201') {
          this.listarTrabajadores();
          this.cancelarEdicion(); // Resetear el formulario
        }
      });
    }
  }

  actualizarTrabajador() {
    this.trabajadorService.actualizarTrabajador(this.newTrabajador).subscribe(response => {
      Swal.fire({
        icon: response.icon,
        title: 'MENSAJE DEL SISTEMA',
        text: response.text
      });
      if (response.statusCode === '202') {
        this.listarTrabajadores();
        this.cancelarEdicion();
      }
    });
  }

  editarTrabajador(trabajador: Trabajador) {
    this.newTrabajador = { ...trabajador };
    this.editMode = true;
  }

  cancelarEdicion() {
    this.newTrabajador = {
      ID_TRABAJADOR: 0,
      ID_ROL: 0,
      ROL: '',
      ID_PERSONA: 0,
      NOMBRES: '',
      APPATERNO: '',
      APMATERNO: '',
      DOCUMENTO: '',
      CORREO: '',
      TELEFONO: '',
      ID_USUARIO: 0,
      ID_PRIVILEGIO: 0,
      CONTRASENIA: ''
    };
    this.editMode = false;
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
        this.eliminarTrabajador(id);
      }
    });
  }

  eliminarTrabajador(id: number) {
    this.trabajadorService.eliminarTrabajador(id).subscribe(response => {
        Swal.fire({
            icon: response.icon,
            title: 'MENSAJE DEL SISTEMA',
            text: response.text
        });
        if (response.statusCode === '200') {
            this.data = this.data.filter(item => item.ID_TRABAJADOR !== id); // Eliminar el trabajador de la tabla
        }
    }, error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se puede eliminar el trabajador'
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
