import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrabajadorService } from 'src/app/Service/trabajador.service';
import { TrabajadorPorRol } from 'src/app/Config/iType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajador-dashboard',
  templateUrl: './trabajador-dashboard.component.html',
  styleUrls: ['./trabajador-dashboard.component.css']
})
export class TrabajadorDashboardComponent implements OnInit {
  totalTrabajadores: number = 0;
  trabajadoresPorRol: TrabajadorPorRol[] = [];
  nombreUsuario: string = '';
  apellidoPaterno: string = '';
  inicialNombre: string = '';

  constructor(private trabajadorService: TrabajadorService, private router: Router) { }

  ngOnInit(): void {
    this.fetchTotalTrabajadores();
    this.fetchTrabajadoresPorRol();
    this.nombreUsuario = localStorage.getItem('nombre') || '';
    this.apellidoPaterno = localStorage.getItem('apellidoPaterno') || '';
    this.inicialNombre = this.nombreUsuario.charAt(0).toUpperCase();
  }

  fetchTotalTrabajadores(): void {
    this.trabajadorService.getTotalTrabajadores().subscribe(data => {
      this.totalTrabajadores = data.TOTAL_TRABAJADORES;
    });
  }

  fetchTrabajadoresPorRol(): void {
    this.trabajadorService.getTrabajadoresPorRol().subscribe(data => {
      this.trabajadoresPorRol = data;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateToGanancias() {
    this.router.navigate(['/ganancias']);
  }
}
