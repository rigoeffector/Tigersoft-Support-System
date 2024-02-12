/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  CREATE_PERMISSION_LOADING,
  CREATE_PERMISSION_ERROR,
  CREATE_PERMISSION_RESET,
  CREATE_PERMISSION_REQUEST,
  CREATE_PERMISSION_SUCCESS,
  GET_PERMISSIONS_LIST_REQUEST
} from '../../reducers/permissions/constants';
import { permissionsApi } from '../../api/permissions';
import { listPermissionsRequestSaga } from './read';

export function* createPermissionRequestSaga(action) {
  try {
    yield put(loading(CREATE_PERMISSION_LOADING, { loading: true }));
    const { payload } = action;

    const response = yield call(permissionsApi.permissions.create, { ...payload });
    debugger;
    if (response && response.success) {
      yield put(success(CREATE_PERMISSION_SUCCESS, response));
      yield* listPermissionsRequestSaga({
        type: GET_PERMISSIONS_LIST_REQUEST
      });
      history.replace('dashboard/permissions');
    } else {
      yield put(error(CREATE_PERMISSION_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_PERMISSION_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_PERMISSION_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_PERMISSION_RESET });
  }
}

export function* watchCreatePermissionData() {
  yield takeLatest(CREATE_PERMISSION_REQUEST, createPermissionRequestSaga);
}
