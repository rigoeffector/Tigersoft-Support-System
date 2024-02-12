import { DELETE_CLIENT_ERROR, DELETE_CLIENT_LOADING, DELETE_CLIENT_SUCCESS, DELETE_CLIENT_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const deleteClientReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_CLIENT_LOADING:
      return { ...state, loading: true };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case DELETE_CLIENT_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case DELETE_CLIENT_RESET:
      return initialState;
    default:
      return state;
  }
};

export default deleteClientReducer;
