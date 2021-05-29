import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'thirdPwaMarco';

  offline: boolean;

  onNetworkStatusChange() {
    this.offline = !navigator.onLine;
    console.log('offline ' + this.offline);
  }

  ngOnInit() {
    window.addEventListener('online',  this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }
}
