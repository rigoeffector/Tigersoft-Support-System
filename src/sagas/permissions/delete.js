/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  DELETE_PERMISSION_LOADING,
  DELETE_PERMISSION_ERROR,
  DELETE_PERMISSION_RESET,
  DELETE_PERMISSION_REQUEST,
  DELETE_PERMISSION_SUCCESS,
  GET_PERMISSIONS_LIST_REQUEST
} from '../../reducers/permissions/constants';
import { permissionsApi } from '../../api/permissions';
import { listPermissionsRequestSaga } from './read';

export function* deletePermissionRequestSaga(action) {
  try {
    yield put(loading(DELETE_PERMISSION_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(permissionsApi.permissions.delete, { ...payload });
    if (response && response.success) {
      yield put(success(DELETE_PERMISSION_SUCCESS, response));
      yield* listPermissionsRequestSaga({
        type: GET_PERMISSIONS_LIST_REQUEST
      });
      history.replace('dashboard/permissions');
    } else {
      yield put(error(DELETE_PERMISSION_ERROR, response));
      yield delay(2000);
      yield put({ type: DELETE_PERMISSION_RESET });
    }
  } catch (err) {
    yield put(error(DELETE_PERMISSION_ERROR, err));
    yield delay(2000);
    yield put({ type: DELETE_PERMISSION_RESET });
  }
}

export function* watchDeletePermissionData() {
  yield takeLatest(DELETE_PERMISSION_REQUEST, deletePermissionRequestSaga);
}
