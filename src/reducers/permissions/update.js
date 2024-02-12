import { UPDATE_PERMISSION_ERROR, UPDATE_PERMISSION_LOADING, UPDATE_PERMISSION_SUCCESS, UPDATE_PERMISSION_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const updatePermissionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PERMISSION_LOADING:
      return { ...state, loading: true };
    case UPDATE_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case UPDATE_PERMISSION_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case UPDATE_PERMISSION_RESET:
      return initialState;
    default:
      return state;
  }
};

export default updatePermissionReducer;
