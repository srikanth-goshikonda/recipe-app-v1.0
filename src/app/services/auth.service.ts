import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  newUserURL = environment.newUser;
  APIkey = environment.APIKEY;
  signInURL = environment.signIn;
  userSubject = new BehaviorSubject<User>(null);
  su = new Subject<number>();
  tokenExpirationTimer;
  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        this.newUserURL + this.APIkey,

        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((x) => {
          this.handleAuthentication(
            x.email,
            x.localId,
            x.idToken,
            +x.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(this.signInURL + this.APIkey, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((x) => {
          this.handleAuthentication(
            x.email,
            x.localId,
            x.idToken,
            +x.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(
      () => this.logout(),
      expirationDuration
    );
  }

  logout() {
    localStorage.removeItem('userData');

    this.userSubject.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;

    this.router.navigate(['/auth', 'login']);
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);

    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
    this.userSubject.next(user);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists, please login';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found, Please register';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Credentials, Please try again';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        errorMessage =
          'Tried to login so many times with bad credentials, please try later after some time';
        break;
    }

    return throwError(() => errorMessage);
  }
}
