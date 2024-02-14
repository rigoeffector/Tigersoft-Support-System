/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  CREATE_TICKET_LOADING,
  CREATE_TICKET_ERROR,
  CREATE_TICKET_RESET,
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  GET_TICKETS_LIST_REQUEST
} from '../../reducers/tickets/constants';
import { ticketsApi } from '../../api/tickets';
import { listTicketsRequestSaga } from './read';

export function* createTicketRequestSaga(action) {
  try {
    yield put(loading(CREATE_TICKET_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(ticketsApi.tickets.create, { ...payload });
    if (response && response.success) {
      yield put(success(CREATE_TICKET_SUCCESS, response));
      yield* listTicketsRequestSaga({
        type: GET_TICKETS_LIST_REQUEST
      });
    } else {
      yield put(error(CREATE_TICKET_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_TICKET_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_TICKET_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_TICKET_RESET });
  }
}

export function* watchTicketCreateData() {
  yield takeLatest(CREATE_TICKET_REQUEST, createTicketRequestSaga);
}
