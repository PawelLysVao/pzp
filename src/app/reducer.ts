import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import authReducer from 'modules/Auth/reducer';
import { AuthState } from 'modules/Auth/state';
import layoutReducer from 'modules/Layout/reducer';
import { LayoutState } from 'modules/Layout/state';
import userReducer from 'modules/User/reducer';
import { UserState } from 'modules/User/state';
import { combineReducers, Reducer } from 'redux';

export type RootState = {
  router: RouterState;
  auth: AuthState;
  layout: LayoutState;
  user: UserState;
};

const createRootReducer = (history: History): Reducer => {
  const reducers = {
    auth: authReducer,
    layout: layoutReducer,
    router: connectRouter(history),
    user: userReducer()
  };

  return combineReducers<RootState>(reducers);
};

export default createRootReducer;
