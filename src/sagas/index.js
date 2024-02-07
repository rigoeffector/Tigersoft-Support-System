import { all, fork } from 'redux-saga/effects';
import { watchClientsListData } from './clients/list';

export default function* rootSaga() {
  yield all([fork(watchClientsListData)]);
}
