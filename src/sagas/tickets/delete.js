/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  DELETE_TICKET_LOADING,
  DELETE_TICKET_ERROR,
  DELETE_TICKET_RESET,
  DELETE_TICKET_REQUEST,
  DELETE_TICKET_SUCCESS,
  GET_TICKETS_LIST_REQUEST
} from '../../reducers/tickets/constants';
import { ticketsApi } from '../../api/tickets';
import { listTicketsRequestSaga } from './read';

export function* deleteTicketRequestSaga(action) {
  try {
    yield put(loading(DELETE_TICKET_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(ticketsApi.tickets.delete, { ...payload });
    if (response && response.success) {
      yield put(success(DELETE_TICKET_SUCCESS, response));
      yield* listTicketsRequestSaga({
        type: GET_TICKETS_LIST_REQUEST
      });
    } else {
      yield put(error(DELETE_TICKET_ERROR, response));
      yield delay(2000);
      yield put({ type: DELETE_TICKET_RESET });
    }
  } catch (err) {
    yield put(error(DELETE_TICKET_ERROR, err));
    yield delay(2000);
    yield put({ type: DELETE_TICKET_RESET });
  }
}

export function* watchTicketDeleteData() {
  yield takeLatest(DELETE_TICKET_REQUEST, deleteTicketRequestSaga);
}
