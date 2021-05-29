import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private workbook: Workbook;

  constructor() {}

  createExcel(data, title: string) {
    const header = [
      'Fecha de Registro',
      'CUSPP',
      'Nombre de Afiliado',
      'Tràmite',
      'Estado de tràmite',
      'Ejecutivo',
      'Fecha de asignaciòn',
    ];
    this.workbook = new Workbook();
    let workshett = this.workbook.addWorksheet(title);

    workshett.addRow(header);

    data.map((element) => {
      const dataRow = [
        element.registerDate,
        element.cuspp,
        element.affiliate,
        element.requestType,
        element.status,
        element.executive,
        element.assignmentDate,
      ];
      workshett.addRow(dataRow);
    });

    this.workbook.xlsx.writeBuffer().then((info) => {
      let blob = new Blob([info], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, title + '.xlsx');
    });
  }
}
