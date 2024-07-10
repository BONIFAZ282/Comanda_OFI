import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  rol: string = '';
  nombreUsuario: string = '';
  apellidoPaterno: string = '';
  inicialNombre: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') || '';
    this.nombreUsuario = localStorage.getItem('nombre') || '';
    this.apellidoPaterno = localStorage.getItem('apellidoPaterno') || '';
    this.inicialNombre = this.nombreUsuario.charAt(0).toUpperCase();
  }

  openGeneral() {
    if (this.rol === 'ADMINISTRATIVO') {
      this.router.navigate(['/categoria']);
    } else {
      this.showAccessDeniedMessage();
    }
  }

  openMenu() {
    if (this.rol === 'ADMINISTRATIVO' || this.rol === 'MESERO') {
      this.router.navigate(['/menu']);
    } else {
      this.showAccessDeniedMessage();
    }
  }

  openOrdenes() {
    if (this.rol === 'ADMINISTRATIVO' || this.rol === 'COCINERO') {
      this.router.navigate(['/cocinero']);
    } else {
      this.showAccessDeniedMessage();
    }
  }

  openDashboard() {
    if (this.rol === 'ADMINISTRATIVO') {
      this.router.navigate(['/trabajador-dashboard']);
    } else {
      this.showAccessDeniedMessage();
    }
  }

  showAccessDeniedMessage() {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso denegado',
      text: 'Usted no tiene acceso a estas funcionalidades',
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
