import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  dummy: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    let code: string;
    let token: string;
    let apiGw: string;
    this.dummy = this.route.params.subscribe(
      params => {
        code = params['code'];
        token = params['token'];
        apiGw = params['apiGw'];
      }
    )
    // console.log('dummy ->', this.dummy);
    console.log('code ->', code);
    console.log('token ->', token);
    console.log('apiGw ->', apiGw);
    this.router.navigate(['by']);
  }
}
