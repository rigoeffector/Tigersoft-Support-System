/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  GET_PERMISSIONS_LIST_LOADING,
  GET_PERMISSIONS_LIST_ERROR,
  GET_PERMISSIONS_LIST_RESET,
  GET_PERMISSIONS_LIST_REQUEST,
  GET_PERMISSIONS_LIST_SUCCESS
} from '../../reducers/permissions/constants';
import { permissionsApi } from 'api/permissions';

export function* listPermissionsRequestSaga(action) {
  try {
    yield put(loading(GET_PERMISSIONS_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(permissionsApi.permissions.list);
    if (response && response.success) {
      yield put(success(GET_PERMISSIONS_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_PERMISSIONS_LIST_ERROR, response));
      yield delay(2000);
      yield put({ type: GET_PERMISSIONS_LIST_RESET });
    }
  } catch (err) {
    yield put(error(GET_PERMISSIONS_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_PERMISSIONS_LIST_RESET });
  }
}

export function* watchPermissionsListData() {
  yield takeLatest(GET_PERMISSIONS_LIST_REQUEST, listPermissionsRequestSaga);
}
