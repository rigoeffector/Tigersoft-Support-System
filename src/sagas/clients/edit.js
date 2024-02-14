/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  UPDATE_CLIENT_LOADING,
  UPDATE_CLIENT_ERROR,
  UPDATE_CLIENT_RESET,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  GET_CLIENTS_LIST_REQUEST
} from '../../reducers/clients/constants';
import { clientsApi } from '../../api/clients';
import { listClientsRequestSaga } from './read';

export function* updateClientRequestSaga(action) {
  try {
    yield put(loading(UPDATE_CLIENT_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(clientsApi.clients.delete, { ...payload });
    if (response && response.success) {
      yield put(success(UPDATE_CLIENT_SUCCESS, response));
      yield* listClientsRequestSaga({
        type: GET_CLIENTS_LIST_REQUEST
      });
      // history.replace('dashboard/CLIENTs');
    } else {
      yield put(error(UPDATE_CLIENT_ERROR, response));
      yield delay(2000);
      yield put({ type: UPDATE_CLIENT_RESET });
    }
  } catch (err) {
    yield put(error(UPDATE_CLIENT_ERROR, err));
    yield delay(2000);
    yield put({ type: UPDATE_CLIENT_RESET });
  }
}

export function* watchUpdateClientData() {
  yield takeLatest(UPDATE_CLIENT_REQUEST, updateClientRequestSaga);
}
