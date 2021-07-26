import { takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { MANAGE_PAGE, ManagePageAction } from 'modules/Layout/action';

export function* managePageSaga({ payload }: ManagePageAction): SagaIterator {
  const { title } = payload;

  if (title) {
    document.title = `Fyta${title ? `: ${title}` : ''}`;
  }

  return yield;
}

export default function* layoutSaga(): SagaIterator {
  yield takeLatest(MANAGE_PAGE, managePageSaga);
}
