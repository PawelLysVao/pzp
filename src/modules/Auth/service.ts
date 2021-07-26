import axios from 'axios';
import { Token } from 'modules/Auth/type';

export const TOKEN_KEY = 'token';

export const hasToken = (): boolean => {
  const value = localStorage.getItem(TOKEN_KEY);

  if (value) {
    try {
      JSON.parse(value);
    } catch (_error) {
      clearToken();

      return false;
    }
  }

  return value !== null;
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const loadToken = (): Token | null => {
  const value = localStorage.getItem(TOKEN_KEY);

  if (value) {
    try {
      const parsed = JSON.parse(value);

      return parsed;
    } catch (_error) {
      clearToken();

      return null;
    }
  }

  return null;
};

export const clearToken = (): void => localStorage.removeItem(TOKEN_KEY);

export const setAuthHeader = (accessToken: string): void => {
  axios.defaults.headers.Authorization = `Bearer ${accessToken}`;
};
