/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  GET_CLIENTS_LIST_LOADING,
  GET_CLIENTS_LIST_ERROR,
  GET_CLIENTS_LIST_RESET,
  GET_CLIENTS_LIST_REQUEST,
  GET_CLIENTS_LIST_SUCCESS
} from '../../reducers/clients/constants';
import { clientsApi } from '../../api/clients';

export function* listClientsRequestSaga(action) {
  try {
    yield put(loading(GET_CLIENTS_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(clientsApi.clients.read);
    if (response && response.success) {
      yield put(success(GET_CLIENTS_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_CLIENTS_LIST_ERROR, response));
      yield delay(2000);
      yield put({ type: GET_CLIENTS_LIST_RESET });
    }
  } catch (err) {
    yield put(error(GET_CLIENTS_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_CLIENTS_LIST_RESET });
  }
}

export function* watchClientsListData() {
  yield takeLatest(GET_CLIENTS_LIST_REQUEST, listClientsRequestSaga);
}
