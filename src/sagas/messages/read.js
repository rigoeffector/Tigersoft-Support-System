/* eslint-disable no-unused-vars */
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { error, loading, success } from '../../actions/common';

import {
  GET_MESSAGES_LIST_LOADING,
  GET_MESSAGES_LIST_ERROR,
  GET_MESSAGES_LIST_RESET,
  GET_MESSAGES_LIST_REQUEST,
  GET_MESSAGES_LIST_SUCCESS
} from '../../reducers/messages/constants';
import { messageApi } from '../../api/messages';

export function* listMessagesRequestSaga(action) {
  try {
    yield put(loading(GET_MESSAGES_LIST_LOADING, { loading: true }));
    const { payload } = action;
    const response = yield call(messageApi.message.read, { ...payload });
    if (response && response.success) {
      yield put(success(GET_MESSAGES_LIST_SUCCESS, response));
    } else {
      yield put(error(GET_MESSAGES_LIST_ERROR, response));
      yield delay(2000);
      yield put({ type: GET_MESSAGES_LIST_RESET });
    }
  } catch (err) {
    yield put(error(GET_MESSAGES_LIST_ERROR, err));
    yield delay(2000);
    yield put({ type: GET_MESSAGES_LIST_RESET });
  }
}

export function* watchMessagesListData() {
  yield takeLatest(GET_MESSAGES_LIST_REQUEST, listMessagesRequestSaga);
}
