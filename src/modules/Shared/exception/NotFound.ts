import { AxiosError } from 'axios';
import ApiError from 'modules/Shared/exception/ApiError';

export default class NotFound extends ApiError {
  constructor(error?: AxiosError) {
    super('Not found.', error);
  }

  getMessageValue(): string {
    return 'Not found';
  }
}
