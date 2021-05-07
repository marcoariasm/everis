import { Component, OnInit } from '@angular/core';

import { SocialUser, GoogleLoginProvider, AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
    })
  }

  signInWithGoogle(): any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  signOut(): any {
    this.authService.signOut();
  }

}
