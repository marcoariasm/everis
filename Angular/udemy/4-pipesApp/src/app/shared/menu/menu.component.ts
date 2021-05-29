import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
