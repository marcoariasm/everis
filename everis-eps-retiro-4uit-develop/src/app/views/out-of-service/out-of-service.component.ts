import { Component, OnInit } from '@angular/core';
import { ModalManager } from '../../commons/modal-manager/modal-manager';

@Component({
  selector: 'app-out-of-service',
  templateUrl: './out-of-service.component.html',
  styleUrls: ['./out-of-service.component.scss'],
  providers: []
})
export class OutOfServiceComponent implements OnInit {

  constructor(
    private modal: ModalManager
  ) {}

  ngOnInit(): void {
    this.modal.show('outOfService', { width: '50vw' });
  }
}
