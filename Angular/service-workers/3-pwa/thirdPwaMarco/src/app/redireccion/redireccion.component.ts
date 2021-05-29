import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-redireccion',
  templateUrl: './redireccion.component.html',
  styleUrls: ['./redireccion.component.css']
})
export class RedireccionComponent implements OnInit {

  uuid: string = uuidv4();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate([`bcp-login/${this.uuid}/VD`]);
  }

}
