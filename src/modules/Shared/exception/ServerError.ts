import { AxiosError } from 'axios';
import ApiError from 'modules/Shared/exception/ApiError';

export default class ServerError extends ApiError {
  constructor(error: AxiosError) {
    super('Server error.', error);
  }

  getMessageValue(): string {
    return 'Server error';
  }
}
