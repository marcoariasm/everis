import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'everis-afp-prima-spinner-inline',
  templateUrl: './spinner-inline.component.html',
  styleUrls: ['./spinner-inline.component.scss']
})
export class SpinnerInlineComponent implements OnInit {

  constructor() { }

  @Input() color = 'primary';
  @Input() diameter: number;

  ngOnInit() {

  }

}
