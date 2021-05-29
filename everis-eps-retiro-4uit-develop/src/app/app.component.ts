import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderState } from './commons/state/loader.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'afp';
  loader = false;
  subscription = new Subscription();

  constructor(
    private loaderState: LoaderState,
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.loaderState.loader.subscribe((value) => {
      this.loader = value;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
