import { Component } from '@angular/core';

@Component({
    selector: 'app-contador',
    template: `
    <h1>{{ title }}</h1>
    <h3>La base es:<span>{{ base }}</span></h3>

    <button (click)="acumular(base)"> + {{base}}</button>

    <span>{{ numero }}</span>

    <button (click)="acumular(-base)"> - {{base}}</button>
    `,
})
export class ContadorComponent {
 public title: string = 'Contador App';
  numero: number = 10;
  base: number = 4;

  acumular( valor: number) {
    this.numero += valor;
  }

}