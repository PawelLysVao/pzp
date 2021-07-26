import { PaginationParams, SearchingProps } from 'modules/Shared/type';
import User from 'modules/User/model/User';

export interface UserListState extends SearchingProps {
  users: User[];
  fetching: boolean;
  pagination: PaginationParams;
}

export const initUserListState = (): UserListState => ({
  users: [],
  pagination: {
    page: 1,
    count: 10
  },
  filter: {},
  sort: {},
  fetching: false
});
