import {Actions, createEffect, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../user.model";
import {Injectable} from "@angular/core";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }
        ).pipe(
          map(resData => {
            const user = new User(
              resData.email,
              resData.localId,
              resData.idToken,
              new Date(new Date().getTime() + +resData.expiresIn * 1000)
            );
            return of(new AuthActions.Login(user));
          }),
          catchError(error => {
            return of();
          })
        )
      })
    )
  })

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }
}
