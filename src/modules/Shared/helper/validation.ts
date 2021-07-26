import _get from 'lodash/get';
import _has from 'lodash/has';
import { ValidationErrors } from 'modules/Shared/type';

export const getError = (
  errors: ValidationErrors = {},
  key: string
): string | null => {
  const value = _get(errors, key);

  if (Array.isArray(value) && value.length > 0) {
    return value[0];
  }

  return null;
};

export const hasError = (
  errors: ValidationErrors = {},
  key: string
): boolean => {
  return _has(errors, key);
};
