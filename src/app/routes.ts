import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';


export const appRoutes: Routes = [
  {path: '', component: FeedComponent, pathMatch: 'full'},
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: '**', component: FeedComponent }
];