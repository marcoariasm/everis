import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PROCEDURE_TYPE } from '@everis-afp-prima/data';

@Component({
  selector: 'everis-afp-prima-status-step',
  templateUrl: './status-steps.component.html',
  styleUrls: ['./status-steps.component.scss'],
})
export class StatusStepComponent implements OnInit, OnChanges {
  statusList = PROCEDURE_TYPE;
  steps = [];
  @Input()
  current: string;
  constructor() {}

  ngOnInit() {
    this.buildSteps();
  }

  buildSteps() {
    let stepArray = [];
    const currentStatus = this.statusList.find((status) => {
      return status.name === this.current;
    });

    if (currentStatus.value === '1') {
      stepArray.push(currentStatus);
      stepArray.push({ name: '' }, { name: '' });
    } else if (currentStatus.value === '2') {
      stepArray = this.statusList.slice(0, 2);
      stepArray.push({ name: '' });
    } else if (currentStatus.value >= '3') {
      stepArray = this.statusList.slice(0, 2);
      stepArray.push(currentStatus);
    }
    this.steps = stepArray;
  }

  ngOnChanges(value: SimpleChanges): void {
    this.buildSteps();
  }
}
