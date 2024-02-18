/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  UPDATE_USER_LOADING,
  UPDATE_USER_ERROR,
  UPDATE_USER_RESET,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  GET_USERS_LIST_REQUEST
} from '../../reducers/users/constants';
import { usersApi } from '../../api/users';
import { listUsersRequestSaga } from './read';

export function* updateUserRequestSaga(action) {
  try {
    yield put(loading(UPDATE_USER_LOADING, { loading: true }));
    const { payloadWithId } = action;
    debugger;
    const response = yield call(usersApi.users.update, { ...payloadWithId });
    if (response && response.success) {
      yield put(success(UPDATE_USER_SUCCESS, response));
      yield* listUsersRequestSaga({
        type: GET_USERS_LIST_REQUEST
      });
      // history.replace('dashboard/users');
      yield put({ type: UPDATE_USER_RESET });
    } else {
      yield put(error(UPDATE_USER_ERROR, response));
      yield delay(2000);
      yield put({ type: UPDATE_USER_RESET });
    }
  } catch (err) {
    yield put(error(UPDATE_USER_ERROR, err));
    yield delay(2000);
    yield put({ type: UPDATE_USER_RESET });
  }
}

export function* watchUpdateUserData() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUserRequestSaga);
}
