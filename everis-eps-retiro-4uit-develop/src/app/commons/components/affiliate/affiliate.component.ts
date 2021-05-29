import { Component, OnInit, Input } from '@angular/core';
import { IAffiliate, IAdditionalInfo } from '@aafp/commons/interfaces';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {
  @Input() affiliate: IAffiliate = {};
  @Input() text: IAdditionalInfo = {};

  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }
}
