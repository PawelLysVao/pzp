import {
  AuthAction,
  AUTHENTICATE,
  LOGIN,
  LOGOUT,
  SET_AUTH_STATE,
  SET_AUTH_USER
} from 'modules/Auth/action';
import { AuthState, initAuthState } from 'modules/Auth/state';
import { ColorVariants } from 'modules/Shared/type';
import { createUser } from 'modules/User/model/User';

const initialState = initAuthState();

const reducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        authenticating: true,
        authenticated: false
      };

    case SET_AUTH_USER:
      return {
        ...state,
        user: createUser(action.payload),
        authenticating: false,
        authenticated: true
      };

    case LOGIN: {
      return {
        ...state,
        busy: true,
        message: null,
        errors: null
      };
    }

    case LOGOUT: {
      const {
        message = {
          value: 'You have been logged out',
          variant: ColorVariants.Primary
        }
      } = action.payload;

      return {
        ...initialState,
        message
      };
    }

    case SET_AUTH_STATE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
};

export default reducer;
