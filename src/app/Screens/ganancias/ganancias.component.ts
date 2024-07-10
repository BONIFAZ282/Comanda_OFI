import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/Service/reporte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.css']
})
export class GananciasComponent implements OnInit {
  reportes: any[] = [];
  nombreUsuario: string = '';
  apellidoPaterno: string = '';
  inicialNombre: string = '';

  constructor(private reporteService: ReporteService) {}

  ngOnInit() {
    this.loadReportes();
    this.nombreUsuario = localStorage.getItem('nombre') || '';
    this.apellidoPaterno = localStorage.getItem('apellidoPaterno') || '';
    this.inicialNombre = this.nombreUsuario.charAt(0).toUpperCase();
  }

  loadReportes() {
    this.reporteService.listarReportesGanancias().subscribe(data => {
      this.reportes = data;
    });
  }

  logout() {
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Ha cerrado sesión exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = '/login';
    });
  }
}
