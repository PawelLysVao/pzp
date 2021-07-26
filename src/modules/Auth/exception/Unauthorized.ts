import { AxiosError } from 'axios';
import ApiError from 'modules/Shared/exception/ApiError';

export default class Unauthorized extends ApiError {
  constructor(error: AxiosError) {
    super('Unauthorized.', error);
  }
}
