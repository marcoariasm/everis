import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  dummy: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let code: string;
    let uuid: string;
    this.dummy = this.route.params.subscribe(
      params => {
        code = params['code'];
        uuid = params['uuid'];
      }
    )
    // console.log('dummy ->', this.dummy);
    console.log('code ->', uuid);
    console.log('uuid ->', code);
    // this.router.navigate(['']);
    
  }

}
