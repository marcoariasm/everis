import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'everis-afp-prima-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.scss']
})
export class SpinnerOverlayComponent implements OnInit {

  constructor() { }

  @Input() value = 100;
  @Input() diameter = 100;
  @Input() mode = 'indeterminate';
  @Input() strokeWidth = 10;
  @Input() overlay = false;
  @Input() color = 'primary';

  ngOnInit() {

  }

}
