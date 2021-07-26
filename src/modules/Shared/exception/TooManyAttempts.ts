import { AxiosError } from 'axios';
import ApiError from 'modules/Shared/exception/ApiError';

export default class TooManyAttempts extends ApiError {
  constructor(error: AxiosError) {
    super('Too Many Attempts.', error);
  }

  getMessageValue(): string {
    return 'Too many attempts';
  }
}
