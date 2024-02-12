/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  CREATE_USER_LOADING,
  CREATE_USER_ERROR,
  CREATE_USER_RESET,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_REQUEST
} from '../../reducers/users/constants';
import { usersApi } from '../../api/users';
import { listUsersRequestSaga } from './read';

export function* createUserRequestSaga(action) {
  try {
    yield put(loading(CREATE_USER_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(usersApi.users.create, { payload });
    if (response && response.success) {
      yield put(success(CREATE_USER_SUCCESS, response));
      yield* listUsersRequestSaga({
        type: GET_USERS_LIST_REQUEST
      });
      history.replace('dashboard/users');
    } else {
      yield put(error(CREATE_USER_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_USER_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_USER_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_USER_RESET });
  }
}

export function* watchCreateUserData() {
  yield takeLatest(CREATE_USER_REQUEST, createUserRequestSaga);
}
