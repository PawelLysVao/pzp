import { RootState } from 'app/reducer';
import axios, { AxiosError, AxiosPromise } from 'axios';
import { logoutAction, LogoutPayload } from 'modules/Auth/action';
import Unauthenticated from 'modules/Auth/exception/Unauthenticated';
import { createRefreshTokenPayload } from 'modules/Auth/helper';
import { API_REFRESH_TOKEN, refreshToken } from 'modules/Auth/repository';
import {
  clearToken,
  loadToken,
  saveToken,
  setAuthHeader
} from 'modules/Auth/service';
import { Token } from 'modules/Auth/type';
import { getAPIUrl } from 'modules/Shared/helper/api';
import { Store } from 'redux';
import { ColorVariants } from 'modules/Shared/type';

let refreshing: AxiosPromise<Token> = null;

// eslint-disable-next-line import/prefer-default-export
export const handleUnauthenticated = (
  error: AxiosError,
  store: Store<RootState>
): Promise<unknown> => {
  const {
    config: { url }
  } = error;

  if (url === getAPIUrl(API_REFRESH_TOKEN)) {
    const unauthenticated = new Unauthenticated(error);

    const logoutPayload: LogoutPayload = {
      message: {
        variant: ColorVariants.Danger,
        value: 'User is not authorized'
      }
    };

    store.dispatch(logoutAction(logoutPayload));

    return Promise.reject(unauthenticated);
  }

  if (refreshing === null) {
    const token = loadToken();

    if (!token || !token.refresh_token) {
      const unauthenticated = new Unauthenticated(error);

      return Promise.reject(unauthenticated);
    }

    refreshing = refreshToken(createRefreshTokenPayload(token.refresh_token));

    refreshing
      .then((response) => {
        saveToken(response.data);

        setAuthHeader(response.data.access_token);

        return response;
      })
      .catch((rejection) => {
        clearToken();

        return rejection;
      })
      .finally(() => {
        refreshing = null;
      });
  }

  return new Promise((resolve, reject) => {
    refreshing
      .then((response) => {
        const { config } = error;

        config.headers.Authorization = `Bearer ${response.data.access_token}`;

        resolve(axios.request(config));
      })
      .catch(() => {
        reject(new Unauthenticated(error));
      });
  });
};
