import { Component, Input, OnInit, OnChanges, AfterViewInit, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';
import { IResponseLogin } from '@everis-afp-prima/data';

@Component({
  selector: 'everis-afp-prima-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges, AfterViewInit {
  fullName: string;

  @Input() type: string;
  @Input() user: IResponseLogin;
  @Output() goOutApp = new EventEmitter<boolean>();

  constructor(
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: any) {
    this.setFullName();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.setFullName();
  }

  private setFullName() {
    const { firstName = '', secondName = '', fatherLastname = '', motherLastname = '' } = this.user || {};

    this.fullName = `${firstName} ${secondName} ${fatherLastname} ${motherLastname}`.trim();
  }

  goOut() {
    this.goOutApp.emit(true);
  }
}
