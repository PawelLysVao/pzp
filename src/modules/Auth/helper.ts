import {
  Credentials,
  RefreshTokenPayload,
  RequestTokenPayload
} from 'modules/Auth/type';

export const createRequestTokenPayload = (
  credentials: Credentials
): RequestTokenPayload => ({
  ...credentials,
  grant_type: 'password'
});

export const createRefreshTokenPayload = (
  refreshToken: string
): RefreshTokenPayload => ({
  refresh_token: refreshToken,
  grant_type: 'refresh_token'
});
