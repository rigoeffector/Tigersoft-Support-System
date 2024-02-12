import { all, fork } from 'redux-saga/effects';
import { watchClientsListData } from './clients/list';
import { watchUsersListData } from './users/create';

export default function* rootSaga() {
  yield all([fork(watchClientsListData), fork(watchUsersListData)]);
}
