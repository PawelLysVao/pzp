import {
  FETCH_USER_LIST,
  SET_USER_LIST_PARAMS,
  USER_LIST_FETCHED,
  UserListAction
} from 'modules/User/action/list';
import { createUser } from 'modules/User/model/User';
import { initUserListState, UserListState } from 'modules/User/state/list';

const initState = initUserListState();

const reducer = (
  state: UserListState = initState,
  action: UserListAction
): UserListState => {
  switch (action.type) {
    case SET_USER_LIST_PARAMS:
      return { ...state, ...action.payload };

    case FETCH_USER_LIST:
      return { ...state, fetching: true };

    case USER_LIST_FETCHED: {
      const { users = [] } = action.payload;

      return { ...state, fetching: false, users: users.map(createUser) };
    }

    default:
      return state;
  }
};

export default reducer;
