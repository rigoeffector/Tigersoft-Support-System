/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  GET_ROLES_LIST_LOADING,
  GET_ROLES_LIST_ERROR,
  GET_ROLES_LIST_RESET,
  GET_ROLES_LIST_REQUEST,
  GET_ROLES_LIST_SUCCESS
} from '../../reducers/roles/constants';
import { rolesApi } from 'api/roles';

export function* listRolesRequestSaga(action) {
  try {
    yield put(loading(GET_ROLES_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(rolesApi.roles.list);
    if (response && response.success) {
      yield put(success(GET_ROLES_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_ROLES_LIST_ERROR, response));
      yield delay(2000);
      yield put({ type: GET_ROLES_LIST_RESET });
    }
  } catch (err) {
    yield put(error(GET_ROLES_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_ROLES_LIST_RESET });
  }
}

export function* watchRolesListData() {
  yield takeLatest(GET_ROLES_LIST_REQUEST, listRolesRequestSaga);
}
