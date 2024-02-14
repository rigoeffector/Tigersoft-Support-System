/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';
import history from '../../history';
import {
  CREATE_CLIENT_LOADING,
  CREATE_CLIENT_ERROR,
  CREATE_CLIENT_RESET,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_SUCCESS,
  GET_CLIENTS_LIST_REQUEST
} from '../../reducers/clients/constants';
import { clientsApi } from '../../api/clients';
import { listClientsRequestSaga } from './read';

export function* createClientRequestSaga(action) {
  try {
    yield put(loading(CREATE_CLIENT_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(clientsApi.clients.create, { ...payload });
    if (response && response.success) {
      yield put(success(CREATE_CLIENT_SUCCESS, response));
      history.replace('/free/pages/login');
      window.location.reload();
    } else {
      yield put(error(CREATE_CLIENT_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_CLIENT_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_CLIENT_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_CLIENT_RESET });
  }
}

export function* watchClientsCreateData() {
  yield takeLatest(CREATE_CLIENT_REQUEST, createClientRequestSaga);
}
