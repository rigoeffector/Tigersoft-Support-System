/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  UPDATE_ROLE_LOADING,
  UPDATE_ROLE_ERROR,
  UPDATE_ROLE_RESET,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  GET_ROLES_LIST_REQUEST
} from '../../reducers/roles/constants';
import { rolesApi } from '../../api/roles';
import { listRolesRequestSaga } from './read';

export function* updateRoleRequestSaga(action) {
  try {
    yield put(loading(UPDATE_ROLE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(rolesApi.roles.update, { ...payload });
    if (response && response.success) {
      yield put(success(UPDATE_ROLE_SUCCESS, response));
      yield* listRolesRequestSaga({
        type: GET_ROLES_LIST_REQUEST
      });
      history.replace('dashboard/roles');
    } else {
      yield put(error(UPDATE_ROLE_ERROR, response));
      yield delay(2000);
      yield put({ type: UPDATE_ROLE_RESET });
    }
  } catch (err) {
    yield put(error(UPDATE_ROLE_ERROR, err));
    yield delay(2000);
    yield put({ type: UPDATE_ROLE_RESET });
  }
}

export function* watchUpdateRoleData() {
  yield takeLatest(UPDATE_ROLE_REQUEST, updateRoleRequestSaga);
}
