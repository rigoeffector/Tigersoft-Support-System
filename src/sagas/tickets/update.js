/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  UPDATE_TICKET_LOADING,
  UPDATE_TICKET_ERROR,
  UPDATE_TICKET_RESET,
  UPDATE_TICKET_REQUEST,
  UPDATE_TICKET_SUCCESS,
  GET_TICKETS_LIST_REQUEST
} from '../../reducers/tickets/constants';
import { ticketsApi } from '../../api/tickets';
import { listTicketsRequestSaga } from './read';

export function* updateTicketRequestSaga(action) {
  try {
    yield put(loading(UPDATE_TICKET_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(ticketsApi.tickets.update, { ...payload });
    if (response && response.success) {
      yield put(success(UPDATE_TICKET_SUCCESS, response));
      yield* listTicketsRequestSaga({
        type: GET_TICKETS_LIST_REQUEST
      });
    } else {
      yield put(error(UPDATE_TICKET_ERROR, response));
      yield delay(2000);
      yield put({ type: UPDATE_TICKET_RESET });
    }
  } catch (err) {
    yield put(error(UPDATE_TICKET_ERROR, err));
    yield delay(2000);
    yield put({ type: UPDATE_TICKET_RESET });
  }
}

export function* watchTicketUpdateData() {
  yield takeLatest(UPDATE_TICKET_REQUEST, updateTicketRequestSaga);
}
