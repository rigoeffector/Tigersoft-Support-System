/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  DELETE_CLIENT_LOADING,
  DELETE_CLIENT_ERROR,
  DELETE_CLIENT_RESET,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  GET_CLIENTS_LIST_REQUEST
} from '../../reducers/clients/constants';
import { clientsApi } from '../../api/clients';
import { listClientsRequestSaga } from './read';

export function* deleteClientRequestSaga(action) {
  try {
    yield put(loading(DELETE_CLIENT_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(clientsApi.clients.delete, { ...payload });
    debugger;
    if (response && response.success) {
      yield put(success(DELETE_CLIENT_SUCCESS, response));
      yield* listClientsRequestSaga({
        type: GET_CLIENTS_LIST_REQUEST
      });
      // history.replace('dashboard/CLIENTs');
    } else {
      yield put(error(DELETE_CLIENT_ERROR, response));
      yield delay(2000);
      yield put({ type: DELETE_CLIENT_RESET });
    }
  } catch (err) {
    yield put(error(DELETE_CLIENT_ERROR, err));
    yield delay(2000);
    yield put({ type: DELETE_CLIENT_RESET });
  }
}

export function* watchDeleteClientData() {
  yield takeLatest(DELETE_CLIENT_REQUEST, deleteClientRequestSaga);
}
