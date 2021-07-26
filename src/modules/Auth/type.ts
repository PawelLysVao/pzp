export type GrantType = 'password' | 'refresh_token';

export type Credentials = {
  email: string;
  password: string;
};

export interface RequestTokenPayload extends Credentials {
  grant_type: string;
}

export interface RefreshTokenPayload {
  grant_type: string;
  refresh_token: string;
}

export type Token = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};
