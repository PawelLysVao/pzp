import { RootState } from 'app/reducer';
import axios from 'axios';
import Unauthorized from 'modules/Auth/exception/Unauthorized';
import { handleUnauthenticated } from 'modules/Auth/helper/token';
import { addToastAction, AddToastPayload } from 'modules/Layout/action';
import { TOAST_CLOSE_IN } from 'modules/Layout/type';
import BadRequest from 'modules/Shared/exception/BadRequest';
import NotFound from 'modules/Shared/exception/NotFound';
import ServerError from 'modules/Shared/exception/ServerError';
import TooManyAttempts from 'modules/Shared/exception/TooManyAttempts';
import Validation from 'modules/Shared/exception/Validation';
import { ColorVariants } from 'modules/Shared/type';
import { Store } from 'redux';

// eslint-disable-next-line import/prefer-default-export
export const registerAxiosInterceptors = (store: Store<RootState>): void => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status } = error.response;

        if (status === 400) {
          return Promise.reject(new BadRequest(error));
        }

        if (status === 401) {
          return handleUnauthenticated(error, store);
        }

        if (status === 403) {
          return Promise.reject(new Unauthorized(error));
        }

        if (status === 404) {
          return Promise.reject(new NotFound(error));
        }

        if (status === 422) {
          return Promise.reject(new Validation(error));
        }

        if (status === 429) {
          const toast: AddToastPayload = {
            header: 'Serwer',
            body: 'Za dużo zapytań do serwera w krótkim czasie',
            color: ColorVariants.Danger,
            closeIn: TOAST_CLOSE_IN
          };

          store.dispatch(addToastAction(toast));

          return Promise.reject(new TooManyAttempts(error));
        }

        if (status === 500) {
          return Promise.reject(new ServerError(error));
        }
      }

      return Promise.reject(error);
    }
  );
};
