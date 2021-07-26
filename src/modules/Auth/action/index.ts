import { SettableAuthState } from 'modules/Auth/state';
import { Credentials } from 'modules/Auth/type';
import { Message } from 'modules/Shared/type';
import { UserEntity } from 'modules/User/model/User';
import { Action, Dispatch } from 'redux';

import { clearToken, loadToken, saveToken, setAuthHeader } from 'modules/Auth/service';
import { authenticate, requestToken } from 'modules/Auth/repository';
import ApiError from 'modules/Shared/exception/ApiError';
import { push } from 'connected-react-router';
import { ROUTE_DASHBOARD } from 'modules/Layout/routes';
import { createRequestTokenPayload } from 'modules/Auth/helper';
import { ROUTE_LOGIN } from 'modules/Auth/routes';

export const AUTHENTICATE = 'AUTH/AUTHENTICATE';
export const AUTHENTICATED = 'AUTH/AUTHENTICATED';
export const LOGIN = 'AUTH/LOGIN';
export const LOGOUT = 'AUTH/LOGOUT';
export const SET_AUTH_USER = 'AUTH/USER/SET';
export const SET_AUTH_STATE = 'AUTH/STATE/SET';

export type AuthAction =
  | AuthenticateAction
  | AuthenticatedAction
  | SetAuthUserAction
  | LoginAction
  | LogoutAction
  | SetAuthStateAction;

export type AuthenticatedAction = Action<typeof AUTHENTICATED>;

export type AuthenticateAction = Action<typeof AUTHENTICATE>;
export interface SetAuthUserAction extends Action<typeof SET_AUTH_USER> {
  payload: UserEntity;
}

export const authenticateAction = () => async (dispatch: Dispatch) => {
  dispatch<AuthenticateAction>({
    type: AUTHENTICATE
  });

  const token = loadToken();
  if (token) {
    setAuthHeader(token.access_token);
  }

  try {
    const response = await authenticate();
    const { data } = response?.data;

    dispatch<SetAuthUserAction>({
      type: SET_AUTH_USER,
      payload: data
    });
  } catch (error) {
    if (!(error instanceof ApiError)) {
      dispatch<LogoutAction>({
        type: LOGOUT
      });
    }
  }
};

export interface LoginAction extends Action<typeof LOGIN> {
  payload: Credentials;
}
export interface SetAuthStateAction extends Action<typeof SET_AUTH_STATE> {
  payload: SettableAuthState;
}

export const loginAction = (payload: Credentials) => async (dispatch: Dispatch) => {
  dispatch<LoginAction>({
    type: LOGIN,
    payload
  });

  let state: SettableAuthState = { busy: false };

  try {
    const { data } = await requestToken(createRequestTokenPayload(payload));

    saveToken(data);

    dispatch(push(ROUTE_DASHBOARD));
  } catch (error) {
    if (error instanceof ApiError) {
      state = { ...state, ...error.getPayload() };
    }
  }

  dispatch<SetAuthStateAction>({
    type: SET_AUTH_STATE,
    payload: state
  });
};

export interface LogoutPayload {
  message?: Message;
}
export interface LogoutAction extends Action<typeof LOGOUT> {
  payload?: LogoutPayload;
}

export const logoutAction =
  (payload: LogoutPayload = {}) =>
  (dispatch: Dispatch) => {
    clearToken();

    dispatch(push(ROUTE_LOGIN));

    dispatch<LogoutAction>({
      type: LOGOUT,
      payload
    });
  };
