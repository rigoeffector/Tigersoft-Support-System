import { DELETE_USER_ERROR, DELETE_USER_LOADING, DELETE_USER_SUCCESS, DELETE_USER_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const deleteUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_USER_LOADING:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case DELETE_USER_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case DELETE_USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default deleteUserReducer;
