import { CREATE_USER_ERROR, CREATE_USER_LOADING, CREATE_USER_SUCCESS, CREATE_USER_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const createUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_USER_LOADING:
      return { ...state, loading: true };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case CREATE_USER_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case CREATE_USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default createUserReducer;
