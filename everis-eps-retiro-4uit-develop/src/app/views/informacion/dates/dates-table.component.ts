import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dates-table',
  templateUrl: './dates-table.component.html',
  styleUrls: ['./dates-table.component.scss'],
})
export class DatesTableComponent implements OnInit {
  Dates: any;
  ngOnInit(): void {
    this.Dates = [
      ['0, Letra u otro valor no numérico', '09-Dic-20', '10-Dic-20', '23-Dic-20', '24-Dic-20'],
      ['1', '10-Dic-20', '11-Dic-20', '24-Dic-20', '28-Dic-20'],
      ['2', '11-Dic-20', '14-Dic-20', '28-Dic-20', '29-Dic-20'],
      ['3', '14-Dic-20', '15-Dic-20', '29-Dic-20', '30-Dic-20'],
      ['4', '15-Dic-20', '16-Dic-20', '30-Dic-20', '31-Dic-20'],
      ['5', '16-Dic-20', '17-Dic-20', '31-Dic-20', '4-Ene-21'],
      ['6', '17-Dic-20', '18-Dic-20', '4-Ene-21', '5-Ene-21'],
      ['7', '18-Dic-20', '21-Dic-20', '5-Ene-21', '6-Ene-21'],
      ['8', '21-Dic-20', '22-Dic-20', '6-Ene-21', '7-Ene-21'],
      ['9', '22-Dic-20', '23-Dic-20', '7-Ene-21', '8-Ene-21'],
    ];
  }
}
