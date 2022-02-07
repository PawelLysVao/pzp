import axios, { AxiosPromise } from 'axios';
import { RefreshTokenPayload, RegisterValues, RequestTokenPayload, Token } from 'modules/Auth/type';
import { getAPIUrl } from 'modules/Shared/helper/api';
import { UserEntity } from 'modules/User/model/User';

export const API_TOKEN = '/api/oauth/token';
export const API_REFRESH_TOKEN = '/api/oauth/token';
export const API_AUTHENTICATE = '/api/user';
export const API_REGISTER = '/api/register';

export const requestToken = (payload: RequestTokenPayload | RefreshTokenPayload): AxiosPromise<Token> =>
  axios.post(getAPIUrl(API_TOKEN), payload);

export type AuthenticateResponse = {
  data: UserEntity;
};

export const authenticate = (): AxiosPromise<AuthenticateResponse> => axios.get(getAPIUrl(API_AUTHENTICATE));

export const refreshToken = (payload: RefreshTokenPayload): AxiosPromise<Token> =>
  axios.post(getAPIUrl(API_REFRESH_TOKEN), payload);

export const register = (values: RegisterValues): AxiosPromise => axios.post(getAPIUrl(API_REGISTER), values);
