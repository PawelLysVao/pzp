import { Credentials, OAuthCredentials, RefreshTokenPayload, RequestTokenPayload } from 'modules/Auth/type';

export const getOAuthCredentials = (): OAuthCredentials => {
  return {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  };
};

export const createRequestTokenPayload = (credentials: Credentials): RequestTokenPayload => ({
  ...credentials,
  ...getOAuthCredentials(),
  grant_type: 'password'
});

export const createRefreshTokenPayload = (refreshToken: string): RefreshTokenPayload => ({
  refresh_token: refreshToken,
  ...getOAuthCredentials(),
  grant_type: 'refresh_token'
});
