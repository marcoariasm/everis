import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListProceduresPresenter } from './list-procedures.presenter';
import { HttpProcedureList } from '@backoffice/commons/services/procedure-list.service';
import { IResponseLogin } from '@everis-afp-prima/data';
import { AuthService } from '@backoffice/commons/services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IFilter } from '@everis-afp-prima/data';
import { ModalManager } from '@backoffice/commons/modal-manager/modal-manager';
import { HttpAssignmentService } from '@backoffice/commons/services/assignment.service';
import { ExcelService } from '@backoffice/commons/services/excel.service';

@Component({
  selector: 'everis-afp-prima-list-procedures',
  templateUrl: './list-procedures.component.html',
  styleUrls: ['./list-procedures.component.scss'],
  providers: [ListProceduresPresenter],
})
export class ListProceduresComponent implements OnInit, OnDestroy {
  fullName: string | undefined;
  lastAccessDate: string | undefined;
  data: IResponseLogin = {} as IResponseLogin;
  dataSubscription: Subscription = new Subscription();
  displayedColumns: string[] = [
    'registerDate',
    'cuspp',
    'affiliate',
    'requestType',
    'status',
    'executive',
    'assignmentDate',
    'assigned',
    'actionView',
    'reassigned',
  ];
  dataSource = new MatTableDataSource<any>([]); // ELEMENT_DATA;

  loader = false;
  excelBlocked = true;
  allowReassigned = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public presenter: ListProceduresPresenter,
    private httpService: HttpProcedureList,
    private authService: AuthService,
    private modal: ModalManager,
    private assignment: HttpAssignmentService,
    private Excel: ExcelService
  ) {}

  ngOnInit() {
    this.data = this.authService.getCurrentUser();

    this.paginator._intl.itemsPerPageLabel = 'Registros por página';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    const {
      firstName = '',
      secondName = '',
      fatherLastname = '',
      motherLastname = '',
      lastAccess = '',
      login = '',
      signature = '',
    } = this.data;
    this.fullName = `${firstName} ${secondName} ${fatherLastname} ${motherLastname}`;
    this.lastAccessDate = this.getFormatDate(lastAccess);
    const data = {
      login,
      requestType: null,
      documentType: null,
      documentNumber: null,
      status: null,
    };

    this.getProcedureList(data, signature);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  getFormatDate(date: string) {
    return new Date(date).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  getProcedureList(data, signature: string) {
    this.loader = true;

    this.httpService.getTray(data, signature).subscribe(
      (response) => this.loginSuccess(response),
      (error) => this.failRequest(error)
    );
  }

  loginSuccess(response: any) {
    this.dataSource = new MatTableDataSource<any>(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loader = false;
    this.showReassigned();
  }

  failRequest(error: any) {
    this.dataSource = new MatTableDataSource<any>([]);
    this.loader = false;
    this.modal.show('reject');
  }
  generateExcel() {
    this.Excel.createExcel(this.dataSource.filteredData, 'Reporte de Tràmites');
  }
  search(values: IFilter) {
    const { login = '', signature = '' } = this.data;
    const {
      procedureType = null,
      documentType = null,
      documentNumber = null,
      status = null,
      cuspp = null,
      executive = null,
      registerDate = null,
    } = values;
    const data = {
      login: login,
      requestType: procedureType
        ? this.prepareData(String(procedureType))
        : null,
      documentType: documentType ? this.prepareData(documentType) : null,
      documentNumber: documentNumber ? this.prepareData(documentNumber) : null,
      status: status ? this.prepareData(status) : null,
      cuspp: cuspp ? this.prepareData(cuspp) : null,
      executive: executive ? this.prepareData(executive) : null,
      registerDate: registerDate ? this.prepareDate(registerDate) : null,
    };

    this.getProcedureList(data, signature);
  }

  private prepareDate(date: string | null) {
    let convertedDate;
    const formatted = (dateToFormat) => {
      const pieces = dateToFormat.split('/');
      const day = pieces[0] < 10 ? `0${pieces[0]}` : pieces[0];
      const month = pieces[1] < 10 ? `0${pieces[1]}` : pieces[1];
      const year = pieces[2];
      return `${day}/${month}/${year}`;
    };
    if (date) {
      convertedDate = formatted(new Date(date).toLocaleDateString('es-PE'));
    }
    return convertedDate;
  }

  private prepareData(str: string = '') {
    return str === null || !str.trim() ? null : str.trim();
  }

  assign(procedure) {
    const { login = '', signature = '' } = this.data;
    const data = {
      login,
      requestType: null,
      documentType: null,
      documentNumber: null,
      status: null,
    };

    const request = this.presenter.setAssignmentRQ(procedure);

    this.assignment.assign(request).subscribe(
      () => {
        this.modal.show('assign');
        this.getProcedureList(data, signature);
      },
      (err) => {
        console.error('ha ocurrido un error', err);
      }
    );
  }

  reassigned(procedure) {
    const { login = '', signature = '' } = this.data;
    const data = {
      login,
      requestType: null,
      documentType: null,
      documentNumber: null,
      status: null,
    };
    this.modal
      .show('reassigned', { data: { ...procedure } })
      .afterClosed()
      .subscribe(() => this.getProcedureList(data, signature));
  }

  private showReassigned() {
    this.data.inAdministration === '1' ? (this.allowReassigned = true) : false;
  }
}
