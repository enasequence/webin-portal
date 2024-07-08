import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User, UserManager, WebStorageStateStore} from 'oidc-client';
import {BehaviorSubject, from, Observable, of, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AaiService {
  constructor(private http: HttpClient,
              private router: Router) {

  }

  manager = new UserManager({
    authority: environment.AAI_AUTHORITY,
    client_id: environment.AAI_CLIENT_ID,
    redirect_uri: window.location.origin + '/aai-callback',
    post_logout_redirect_uri: window.location.origin,
    response_type: 'token id_token',
    scope: 'email openid profile',
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({store: window.localStorage})
  });

  private userSubject = new BehaviorSubject<User>(undefined);
  private aaiReturned = false;
  private cachedUser: User;

  static authHeader(user: User): string {
    return user ? `${user.token_type} ${user.access_token}` : '';
  }

  static loggedIn(user: User): boolean {
    return user && !user.expired;
  }

  // For short lived / single-call components:
  // The response will always reflect the value in aai, but subscribers will not be triggered with subsequent changes.
  // Pipelines have limited functionality from Promises, especially triggering side-effects, mapping seems fine.
  getUser(): Observable<User> {
    if (this.aaiReturned) {
      return of(this.cachedUser);
    } else {
      return from(this.manager.getUser()).pipe(
        tap(user => this.setUser(user))
      );
    }
  }

  // For long lived / responsive components
  // Subscribers to the BehaviourSubject will receive the current value immediately, and be triggered when the user changes
  // The response may be initially be undefined (if not yet retrieved from aai) so do not use .value or .GetValue.
  // Pipelines have limited functionality from BehaviorSubject, recommend subscription.
  // Ignore the appendix, returned so that the thread is not killed.
  // ToDo is this the best we can do here?
  getUserSubject(): { subject: BehaviorSubject<User>; appendix: Subscription } {
    return {subject: this.userSubject, appendix: this.getUser().subscribe()};
  }

  // Publish user changes to subscribers of getUserSubject
  setUserSubject(user: User) {
    this.userSubject.next(user);
  }

  private setUser(user: User) {
    // Every call to .next will trigger getUserSubject subscribers, Only call when valid and different
    if (AaiService.loggedIn(user) && user.id_token !== this.cachedUser?.id_token) {
      this.cachedUser = user;
      this.userSubject.next(user);
    }
    this.aaiReturned = true;
  }

  userLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(map(user => AaiService.loggedIn(user)));
  }

  userAuthHeader(): Observable<string> {
    return this.getUser().pipe(map(user => AaiService.authHeader(user)));
  }

  startAuthentication(redirect: string): Promise<void> {
    const state = {state: encodeURIComponent(redirect)};
    return this.manager.signinRedirect(state);
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then((user: User) => {
      this.setUser(user);
      // this.checkForUserAccountRegistration(user);
    }).catch(error => {
      console.error('Authentication callback error', error);
    });
  }

  logout() {
    this.manager.signoutRedirect();
  }

  private removeUser() {
    this.manager.removeUser().then(
      () => {
        console.log('removing user');
        this.cachedUser = undefined;
        this.userSubject.next(undefined);
      }
    );
  }
}
