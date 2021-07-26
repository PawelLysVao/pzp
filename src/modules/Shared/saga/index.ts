import { managePageAction } from 'modules/Layout/action';
import {
  MANAGE_THROW,
  ManageThrowAction,
  SET_LOCATION_SEARCH,
  SetLocationSearchAction
} from 'modules/Shared/action';
import NotFound from 'modules/Shared/exception/NotFound';
import ServerError from 'modules/Shared/exception/ServerError';
import { SagaIterator } from 'redux-saga';
import { put, takeEvery, select } from 'redux-saga/effects';
import Unauthorized from 'modules/Auth/exception/Unauthorized';
import { replace } from 'connected-react-router';
import { RootState } from 'app/reducer';

export function* manageThrowSaga({ error }: ManageThrowAction): SagaIterator {
  if (error instanceof Unauthorized) {
    yield put(managePageAction({ type: '403' }));
  } else if (error instanceof NotFound) {
    yield put(managePageAction({ type: '404' }));
  } else if (error instanceof ServerError) {
    yield put(managePageAction({ type: '500' }));
  }
}

export function* setLocationSearchSaga({
  payload
}: SetLocationSearchAction): SagaIterator {
  const { searchParams, merge } = payload;

  const location: Location = yield select(
    (state: RootState) => state.router.location
  );

  const urlSearchParams = new URLSearchParams(searchParams as any);

  if (merge) {
    const locationUrlSearchParams = new URLSearchParams(location.search);

    locationUrlSearchParams.forEach((value, key) => {
      if (!urlSearchParams.has(key)) {
        urlSearchParams.set(key, value);
      }
    });
  }

  urlSearchParams.forEach((value, key) => {
    if (!value) {
      urlSearchParams.delete(key);
    }
  });

  const toPush = { ...location, search: urlSearchParams.toString() };

  yield put(replace(toPush));
}

export default function* sharedSaga(): SagaIterator {
  yield takeEvery(MANAGE_THROW, manageThrowSaga);
  yield takeEvery(SET_LOCATION_SEARCH, setLocationSearchSaga);
}
