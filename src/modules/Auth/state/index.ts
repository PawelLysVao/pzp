import { Message, ValidationErrors } from 'modules/Shared/type';
import User from 'modules/User/model/User';

export type AuthState = {
  authenticated: boolean;
  authenticating: boolean;
  busy: boolean;
  user?: User;
  errors?: ValidationErrors;
  message?: Message;
};

export type PartialAuthState = Partial<AuthState>;

export type SettableAuthState = Omit<
  PartialAuthState,
  'authenticating' | 'authenticated' | 'user'
>;

export const initAuthState = (): AuthState => ({
  authenticated: false,
  authenticating: false,
  busy: false,
  user: null
});
