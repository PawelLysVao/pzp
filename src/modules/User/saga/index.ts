import userListSaga from 'modules/User/saga/list';
import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

export default function* userSaga(): SagaIterator {
  yield fork(userListSaga);
}
