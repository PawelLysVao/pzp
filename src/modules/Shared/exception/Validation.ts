import { AxiosError } from 'axios';
import ApiError from 'modules/Shared/exception/ApiError';

export default class Validation extends ApiError {
  constructor(error: AxiosError) {
    super('Validation.', error);
  }

  getMessageValue(): string {
    return 'Validation errors';
  }
}
