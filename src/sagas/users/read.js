/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  GET_USERS_LIST_LOADING,
  GET_USERS_LIST_ERROR,
  GET_USERS_LIST_RESET,
  GET_USERS_LIST_REQUEST,
  GET_USERS_LIST_SUCCESS
} from '../../reducers/users/constants';
import { usersApi } from '../../api/users';

export function* listUsersRequestSaga(action) {
  try {
    yield put(loading(GET_USERS_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(usersApi.users.list);
    if (response && response.success) {
      yield put(success(GET_USERS_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_USERS_LIST_ERROR, response));
      yield delay(2000);
      yield put({ type: GET_USERS_LIST_RESET });
    }
  } catch (err) {
    yield put(error(GET_USERS_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_USERS_LIST_RESET });
  }
}

export function* watchUsersListData() {
  yield takeLatest(GET_USERS_LIST_REQUEST, listUsersRequestSaga);
}
