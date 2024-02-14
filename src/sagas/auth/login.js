/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';
import history from '../../history';
import {
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_RESET,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS
} from '../../reducers/auth/constants';
import { authApi } from '../../api/auth';
import { saveState } from '../../utils';

export function* loginUserRequestSaga(action) {
  try {
    yield put(loading(LOGIN_USER_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(authApi.auth.login, { ...payload });
    if (response && response.success) {
      const ctx = buildContext(response.data || {});
      saveState('ctx', ctx);
      yield put(success('CONTEXT', ctx));
      yield put(success(LOGIN_USER_SUCCESS, response));
      history.push('/free/dashboard/default');
      yield delay(1000);
      window.location.reload();
    } else {
      yield put(error(LOGIN_USER_ERROR, response));
      yield delay(2000);
      yield put({ type: LOGIN_USER_RESET });
    }
  } catch (err) {
    yield put(error(LOGIN_USER_ERROR, err));
    yield delay(2000);
    yield put({ type: LOGIN_USER_RESET });
  }
}
function buildContext(data) {
  return {
    data
  };
}

export function* watchLoginUserData() {
  yield takeLatest(LOGIN_USER_REQUEST, loginUserRequestSaga);
}
