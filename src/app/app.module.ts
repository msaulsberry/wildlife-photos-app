import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { FeedComponent } from './feed/feed.component';
import { PhotoPostComponent } from './feed/photo-post/photo-post.component';
import { CreatePostComponent } from './feed/create-post/create-post.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FormsModule } from '@angular/forms';
import { CreateLocationComponent } from './create-location/create-location.component';

const oktaConfig = {
  issuer: 'https://dev-72544314.okta.com/oauth2/default',
  clientId: '0oapa3mkswUXNippF5d6',
  redirectUri: window.location.origin + '/login/callback'
}


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    PhotoPostComponent,
    CreatePostComponent,
    UserSignupComponent,
    CreateLocationComponent,
  ],
  imports: [
    BrowserModule,
    OktaAuthModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    GraphQLModule,
    FormsModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
