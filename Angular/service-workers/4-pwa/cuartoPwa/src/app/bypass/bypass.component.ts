import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-bypass',
  templateUrl: './bypass.component.html',
  styleUrls: ['./bypass.component.css']
})
export class BypassComponent implements OnInit {

  token: string = uuidv4();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['prueba']);
  }

}
