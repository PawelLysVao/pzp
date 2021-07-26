import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { getAPIUrl } from 'modules/Shared/helper/api';
import { SearchParams } from 'modules/Shared/type';
import { UserEntity } from 'modules/User/model/User';

export const API_USERS = '/admin-user/list';

export type FetchUsersResponse = AxiosResponse<{
  content: UserEntity[];
}>;

export const fetchUsers = (
  params: SearchParams = {}
): AxiosPromise<FetchUsersResponse> =>
  axios.post(getAPIUrl(API_USERS, null), params);

export type FetchUserResponse = AxiosResponse<{
  user: UserEntity;
}>;
