import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { UserSignupComponent } from './user-signup/user-signup.component';


export const appRoutes: Routes = [
  {path: '', component: FeedComponent, pathMatch: 'full'},
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'signup', component: UserSignupComponent},
  { path: '**', component: FeedComponent }
];