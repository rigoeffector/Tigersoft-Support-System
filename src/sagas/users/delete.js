/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  DELETE_USER_LOADING,
  DELETE_USER_ERROR,
  DELETE_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USERS_LIST_REQUEST
} from '../../reducers/users/constants';
import { usersApi } from '../../api/users';
import { listUsersRequestSaga } from './read';
import history from '../../history';

export function* deleteUserRequestSaga(action) {
  try {
    yield put(loading(DELETE_USER_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(usersApi.users.delete, { ...payload });
    if (response && response.success) {
      yield put(success(DELETE_USER_SUCCESS, response));
      yield* listUsersRequestSaga({
        type: GET_USERS_LIST_REQUEST
      });
      yield delay(2000);
      yield put({ type: DELETE_USER_RESET });
    } else {
      yield put(error(DELETE_USER_ERROR, response));
      yield delay(2000);
      yield put({ type: DELETE_USER_RESET });
    }
  } catch (err) {
    yield put(error(DELETE_USER_ERROR, err));
    yield delay(2000);
    yield put({ type: DELETE_USER_RESET });
  }
}

export function* watchDeleteUserData() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUserRequestSaga);
}
