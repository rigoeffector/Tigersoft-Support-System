/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  CREATE_ROLE_LOADING,
  CREATE_ROLE_ERROR,
  CREATE_ROLE_RESET,
  CREATE_ROLE_REQUEST,
  CREATE_ROLE_SUCCESS,
  GET_ROLES_LIST_REQUEST
} from '../../reducers/roles/constants';
import { rolesApi } from '../../api/roles';
import { listRolesRequestSaga } from './read';

export function* createRoleRequestSaga(action) {
  try {
    yield put(loading(CREATE_ROLE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(rolesApi.roles.create, { payload });
    if (response && response.success) {
      yield put(success(CREATE_ROLE_SUCCESS, response));
      yield* listRolesRequestSaga({
        type: GET_ROLES_LIST_REQUEST
      });
      history.replace('dashboard/roles');
    } else {
      yield put(error(CREATE_ROLE_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_ROLE_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_ROLE_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_ROLE_RESET });
  }
}

export function* watchCreateRoleData() {
  yield takeLatest(CREATE_ROLE_REQUEST, createRoleRequestSaga);
}
