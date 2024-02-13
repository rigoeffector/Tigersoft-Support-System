/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  DELETE_ROLE_LOADING,
  DELETE_ROLE_ERROR,
  DELETE_ROLE_RESET,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  GET_ROLES_LIST_REQUEST
} from '../../reducers/roles/constants';
import { rolesApi } from '../../api/roles';
import { listRolesRequestSaga } from './read';

export function* deleteRoleRequestSaga(action) {
  try {
    yield put(loading(DELETE_ROLE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(rolesApi.roles.delete, { ...payload });
    if (response && response.success) {
      yield put(success(DELETE_ROLE_SUCCESS, response));
      yield* listRolesRequestSaga({
        type: GET_ROLES_LIST_REQUEST
      });
      history.replace('dashboard/roles');
    } else {
      yield put(error(DELETE_ROLE_ERROR, response));
      yield delay(2000);
      yield put({ type: DELETE_ROLE_RESET });
    }
  } catch (err) {
    yield put(error(DELETE_ROLE_ERROR, err));
    yield delay(2000);
    yield put({ type: DELETE_ROLE_RESET });
  }
}

export function* watchDeleteRoleData() {
  yield takeLatest(DELETE_ROLE_REQUEST, deleteRoleRequestSaga);
}
