/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  GET_TICKETS_LIST_LOADING,
  GET_TICKETS_LIST_ERROR,
  GET_TICKETS_LIST_RESET,
  GET_TICKETS_LIST_REQUEST,
  GET_TICKETS_LIST_SUCCESS
} from '../../reducers/tickets/constants';
import { ticketsApi } from '../../api/tickets';

export function* listTicketsRequestSaga(action) {
  try {
    yield put(loading(GET_TICKETS_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(ticketsApi.tickets.read);
    if (response && response.success) {
      yield put(success(GET_TICKETS_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_TICKETS_LIST_ERROR, response));
      yield delay(2000);
      yield put({ type: GET_TICKETS_LIST_RESET });
    }
  } catch (err) {
    yield put(error(GET_TICKETS_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_TICKETS_LIST_RESET });
  }
}

export function* watchTicketsListData() {
  yield takeLatest(GET_TICKETS_LIST_REQUEST, listTicketsRequestSaga);
}
