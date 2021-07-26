import { AxiosError } from 'axios';
import ApiError from 'modules/Shared/exception/ApiError';

export default class BadRequest extends ApiError {
  constructor(error: AxiosError) {
    super('Bad request.', error);
  }

  getMessageValue(): string {
    return 'Bad request';
  }
}
