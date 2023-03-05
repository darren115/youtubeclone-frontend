import { Component, OnInit } from '@angular/core';
import {
  OidcClientNotification,
  OidcSecurityService,
} from 'angular-auth-oidc-client';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private oidcSecurityService: OidcSecurityService, private userService: UserService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      this.userService.registerUser();
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logOff() {
    this.oidcSecurityService.logoffAndRevokeTokens();
    this.oidcSecurityService.logoffLocal();
  }
}
