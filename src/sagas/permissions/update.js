/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  UPDATE_PERMISSION_LOADING,
  UPDATE_PERMISSION_ERROR,
  UPDATE_PERMISSION_RESET,
  UPDATE_PERMISSION_REQUEST,
  UPDATE_PERMISSION_SUCCESS,
  GET_PERMISSIONS_LIST_REQUEST
} from '../../reducers/permissions/constants';
import { permissionsApi } from '../../api/permissions';
import { listPermissionsRequestSaga } from './read';

export function* updatePermissionRequestSaga(action) {
  try {
    yield put(loading(UPDATE_PERMISSION_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(permissionsApi.permissions.update, { ...payload });
    if (response && response.success) {
      yield put(success(UPDATE_PERMISSION_SUCCESS, response));
      yield* listPermissionsRequestSaga({
        type: GET_PERMISSIONS_LIST_REQUEST
      });
      // history.replace('dashboard/permissions');
    } else {
      yield put(error(UPDATE_PERMISSION_ERROR, response));
      yield delay(2000);
      yield put({ type: UPDATE_PERMISSION_RESET });
    }
  } catch (err) {
    yield put(error(UPDATE_PERMISSION_ERROR, err));
    yield delay(2000);
    yield put({ type: UPDATE_PERMISSION_RESET });
  }
}

export function* watchUpdatePermissionData() {
  yield takeLatest(UPDATE_PERMISSION_REQUEST, updatePermissionRequestSaga);
}
