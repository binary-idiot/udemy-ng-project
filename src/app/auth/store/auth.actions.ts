import {Action} from "@ngrx/store";
import {User} from "../user.model";

export const AUTHENTICATE_START = '[Auth] LOGIN_START';
export class AuthenticateStart implements Action {
  readonly type = AUTHENTICATE_START;
  constructor(public payload: {email: string, password: string, login: boolean}) {}
}

export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;
  constructor(public payload: { user: User, redirect: boolean }) {}
}

export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL';
export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export const LOGOUT = '[Auth] LOGOUT';
export class Logout implements Action {
  readonly type = LOGOUT;
}

export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';
export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';
export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticateStart
  | AuthenticateSuccess
  | AuthenticateFail
  | Logout
  | ClearError
  | AutoLogin;
