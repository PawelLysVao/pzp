import { RootState } from 'app/reducer';
import { setLocationSearchAction } from 'modules/Shared/action';
import { createSearchParams } from 'modules/Shared/helper/params';
import {
  FETCH_USER_LIST,
  fetchUserListAction,
  SET_USER_LIST_PARAMS,
  userListFetchedAction
} from 'modules/User/action/list';
import { fetchUsers, FetchUsersResponse } from 'modules/User/repository';
import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Validation from 'modules/Shared/exception/Validation';

export function* setUserListParamsSaga(): SagaIterator {
  yield put(fetchUserListAction());
}

export function* fetchUserListSaga(): SagaIterator {
  try {
    const { pagination, filter, sort } = yield select(
      (state: RootState) => state.user.list
    );

    const searchParams = createSearchParams({ pagination, filter, sort });

    yield put(setLocationSearchAction({ searchParams }));

    const mappedFilter = {
      ...filter
    };

    if (filter.age_max) {
      mappedFilter.age_max = Number(filter.age_max);
    }
    if (filter.age_min) {
      mappedFilter.age_min = Number(filter.age_min);
    }
    if (filter.plants_owned) {
      mappedFilter.plants_owned = Number(filter.plants_owned);
    }
    if (filter.plants_knowledge) {
      mappedFilter.plants_knowledge = Number(filter.plants_knowledge);
    }

    const { data }: FetchUsersResponse = yield call(fetchUsers, {
      ...sort,
      pagination,
      search: mappedFilter
    });

    const { content } = data;

    yield put(userListFetchedAction({ users: content }));
  } catch (error) {
    if (error instanceof Validation) {
      yield put(userListFetchedAction({ users: [] }));
    } else {
      throw error;
    }
  }
}

export default function* userListSaga(): SagaIterator {
  yield takeLatest(SET_USER_LIST_PARAMS, setUserListParamsSaga);
  yield takeLatest(FETCH_USER_LIST, fetchUserListSaga);
}
