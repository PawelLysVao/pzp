import { PasswordValues } from 'modules/Layout/type';
import { UserIdentityValues } from 'modules/User/type';
// import { RegulationsWithRodo } from 'modules/Regulation/type';

export type GrantType = 'password' | 'refresh_token';

export interface OAuthCredentials {
  client_id: string;
  client_secret: string;
}

export type Credentials = {
  username: string;
  password: string;
};

export interface RequestTokenPayload extends OAuthCredentials, Credentials {
  grant_type: GrantType;
}

export interface RefreshTokenPayload extends OAuthCredentials {
  grant_type: GrantType;
  refresh_token: string;
}

export type Token = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
};

export type PermissionSlug = string;
export type FunctionalitySlug = string;

export interface ResetPasswordValues {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordPayload extends ResetPasswordValues {
  token: string;
}

// TODO: fix recaptcha token key
//, RegulationsWithRodo
export interface RegisterValues extends UserIdentityValues, PasswordValues {
  'g-recaptcha-response'?: string;
}
