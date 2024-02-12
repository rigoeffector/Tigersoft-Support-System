import { UPDATE_USER_ERROR, UPDATE_USER_LOADING, UPDATE_USER_SUCCESS, UPDATE_USER_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const updateUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_LOADING:
      return { ...state, loading: true };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case UPDATE_USER_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case UPDATE_USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default updateUserReducer;
