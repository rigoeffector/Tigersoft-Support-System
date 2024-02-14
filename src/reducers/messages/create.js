import { CREATE_MESSAGE_ERROR, CREATE_MESSAGE_LOADING, CREATE_MESSAGE_SUCCESS, CREATE_MESSAGE_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const createMessageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_MESSAGE_LOADING:
      return { ...state, loading: true };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case CREATE_MESSAGE_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case CREATE_MESSAGE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default createMessageReducer;
