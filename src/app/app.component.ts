import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular'
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

const GET_SAS = gql`
  query GetSas {
    getSas
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wildlife-photos-app';

  isAuthenticated: boolean;
  private querySubscription: Subscription;
  signup: boolean;
  
  constructor(public oktaAuth: OktaAuthService, private apollo: Apollo, private router: Router) {
    // subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }
  async ngOnInit() {
    // get authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    localStorage.setItem('token', this.oktaAuth.getAccessToken())

    if (this.isAuthenticated) {
      this.querySubscription = this.apollo.watchQuery<any>({
        query: GET_SAS
      })
        .valueChanges
        .subscribe(({ data }) => {
            localStorage.setItem('sasToken', data.getSas);
        });
    }
  }
  async login() {
    await this.oktaAuth.signInWithRedirect();
  }
  async logout() {
    await this.oktaAuth.signOut();
  }
}
