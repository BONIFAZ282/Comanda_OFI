import { Component, OnInit } from '@angular/core';
import { TrabajadorService } from 'src/app/Service/trabajador.service';
import { TrabajadorPorRol } from 'src/app/Config/iType';

@Component({
  selector: 'app-trabajador-dashboard',
  templateUrl: './trabajador-dashboard.component.html',
  styleUrls: ['./trabajador-dashboard.component.css']
})
export class TrabajadorDashboardComponent implements OnInit {
  totalTrabajadores: number = 0;
  trabajadoresPorRol: TrabajadorPorRol[] = [];

  constructor(private trabajadorService: TrabajadorService) { }

  ngOnInit(): void {
    this.fetchTotalTrabajadores();
    this.fetchTrabajadoresPorRol();
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
}
