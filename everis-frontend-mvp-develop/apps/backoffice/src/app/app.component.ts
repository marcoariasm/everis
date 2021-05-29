import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { LoaderState } from '@backoffice/commons/state/loader.state';
import { Subscription } from 'rxjs';
import { IResponseLogin } from '@everis-afp-prima/data';
import { AuthService } from '@backoffice/commons/services/auth.service';
import { RequestState } from '@backoffice/commons/state/request.state';
import { Router } from '@angular/router';

@Component({
  selector: 'everis-afp-prima-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  loader: boolean;
  user: IResponseLogin;
  state$ = this.requestState.request;
  subscription = new Subscription();

  constructor(
    private loaderState: LoaderState,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private requestState: RequestState,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.subscription.add(this.loaderState.loader.subscribe((value: boolean) => {
      this.loader = value;
    }));

    this.state$.subscribe((value: any) => {
      const { user } = value;

      if (user) this.user = user;
      else this.user = null;

    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  goOutApp($event) {
    this.authService.logoutUser();
    this.requestState.reset();
    setTimeout(() => {
      this.router.navigate(['/login']);
    });
  }
}
