import { AxiosError } from 'axios';
import _setWith from 'lodash/setWith';
import {
  ColorVariants,
  Message,
  ValidationErrors,
  ValidationPayload
} from 'modules/Shared/type';

export default class ApiError extends Error {
  public readonly error: AxiosError;

  constructor(message = 'ApiError.', error: AxiosError) {
    super(message);

    this.error = error;
  }

  getMessageValue(): string {
    if (this.error.response) {
      const { data, statusText } = this.error.response;

      const { errors, message } = data;

      return message || errors || statusText;
    }

    return this.error.message;
  }

  getMessage(variant: ColorVariants = ColorVariants.Danger): Message | null {
    const value = this.getMessageValue();

    if (value) {
      return { value, variant };
    }

    return null;
  }

  getErrors(): ValidationErrors | null {
    const { errors } = this.error.response.data;

    if (errors) {
      const object = {};

      Object.entries(this.error.response.data.errors).map(([key, values]) =>
        _setWith(object, key, values, Object)
      );

      return object;
    }

    return null;
  }

  getPayload(): ValidationPayload {
    console.log(this.getMessage());
    console.log(this.getErrors());

    return {
      message: this.getMessage(),
      errors: this.getErrors()
    };
  }
}
