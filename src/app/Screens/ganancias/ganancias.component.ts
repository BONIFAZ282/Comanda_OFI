import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/Service/reporte.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
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

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportes);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, 'reporte_ganancias');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
