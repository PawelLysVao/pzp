import { AxiosError } from 'axios';
import ApiError from 'modules/Shared/exception/ApiError';

export default class Unauthenticated extends ApiError {
  constructor(error: AxiosError) {
    super('Unauthenticated.', error);
  }
}
