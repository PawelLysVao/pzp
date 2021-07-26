import listReducer from 'modules/User/reducer/list';
import { combineReducers, Reducer } from 'redux';
import { UserState } from 'modules/User/state';

const reducer = (): Reducer<UserState> => {
  const reducers = {
    list: listReducer
  };

  return combineReducers<UserState>(reducers);
};

export default reducer;
