/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';
import history from '../../history';
import {
  CREATE_MESSAGE_LOADING,
  CREATE_MESSAGE_ERROR,
  CREATE_MESSAGE_RESET,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_MESSAGES_LIST_REQUEST
} from '../../reducers/messages/constants';
import { messageApi } from '../../api/messages';
import { listMessagesRequestSaga } from './read';

export function* createMessagesRequestSaga(action) {
  try {
    yield put(loading(CREATE_MESSAGE_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(messageApi.message.create, { ...payload });
    if (response && response.success) {
      yield put(success(CREATE_MESSAGE_SUCCESS, response));
      yield* listMessagesRequestSaga({
        type: GET_MESSAGES_LIST_REQUEST
      });
    } else {
      yield put(error(CREATE_MESSAGE_ERROR, response));
      yield delay(2000);
      yield put({ type: CREATE_MESSAGE_RESET });
    }
  } catch (err) {
    yield put(error(CREATE_MESSAGE_ERROR, err));
    yield delay(2000);
    yield put({ type: CREATE_MESSAGE_RESET });
  }
}

export function* watchMessagesCreateData() {
  yield takeLatest(CREATE_MESSAGE_REQUEST, createMessagesRequestSaga);
}
