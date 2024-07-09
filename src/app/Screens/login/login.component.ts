import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  login(event: Event, documento: string, contrasenia: string) {
    event.preventDefault(); // Previene el comportamiento predeterminado del formulario

    this.usuarioService.login(documento, contrasenia).subscribe(
      (response) => {
        if (response[0] && response[0].token) {
          // Guardar el token y la información del usuario en localStorage
          localStorage.setItem('token', response[0].token);
          localStorage.setItem('nombre', response[0].NOMBRES);
          localStorage.setItem('apellidoPaterno', response[0].APPATERNO);

          // Mostrar SweetAlert2 de éxito y luego redirigir
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/principal']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Usuario o contraseña incorrectos',
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el servidor',
          text: 'Por favor intente nuevamente',
        });
      }
    );
  }
}
