import { DELETE_PERMISSION_ERROR, DELETE_PERMISSION_LOADING, DELETE_PERMISSION_SUCCESS, DELETE_PERMISSION_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const deletePermissionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_PERMISSION_LOADING:
      return { ...state, loading: true };
    case DELETE_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case DELETE_PERMISSION_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case DELETE_PERMISSION_RESET:
      return initialState;
    default:
      return state;
  }
};

export default deletePermissionReducer;
