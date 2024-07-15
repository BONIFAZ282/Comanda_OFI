import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TrabajadorService } from 'src/app/Service/trabajador.service';
import { RolService } from 'src/app/Service/rol.service';
import { Trabajador, Rol } from 'src/app/Config/iType';
import { NgForm } from '@angular/forms';

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

  agregarTrabajador(trabajadorForm: NgForm) {
    if (trabajadorForm.valid) {
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'MENSAJE DEL SISTEMA',
            text: 'Por favor, complete todos los campos obligatorios.',
        });
    }
}

  actualizarTrabajador() {
    if (this.validarFormulario()) {
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

  validarFormulario(): boolean {
    if (!this.newTrabajador.DOCUMENTO || this.newTrabajador.DOCUMENTO.length !== 8) {
      Swal.fire('Error', 'El documento debe tener 8 caracteres', 'error');
      return false;
    }
    if (!this.newTrabajador.NOMBRES) {
      Swal.fire('Error', 'El nombre es requerido', 'error');
      return false;
    }
    if (!this.newTrabajador.APPATERNO) {
      Swal.fire('Error', 'El apellido paterno es requerido', 'error');
      return false;
    }
    if (!this.newTrabajador.APMATERNO) {
      Swal.fire('Error', 'El apellido materno es requerido', 'error');
      return false;
    }
    if (!this.newTrabajador.TELEFONO || this.newTrabajador.TELEFONO.length !== 9) {
      Swal.fire('Error', 'El teléfono debe tener 9 caracteres', 'error');
      return false;
    }
    if (!this.newTrabajador.CORREO || !this.validarCorreo(this.newTrabajador.CORREO)) {
      Swal.fire('Error', 'El correo no es válido', 'error');
      return false;
    }
    if (!this.newTrabajador.CONTRASENIA || this.newTrabajador.CONTRASENIA.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return false;
    }
    return true;
  }

  validarCorreo(correo: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(correo);
  }
}
