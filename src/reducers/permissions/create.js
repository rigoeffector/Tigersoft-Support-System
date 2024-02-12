import { CREATE_PERMISSION_ERROR, CREATE_PERMISSION_LOADING, CREATE_PERMISSION_SUCCESS, CREATE_PERMISSION_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const createPermissionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PERMISSION_LOADING:
      return { ...state, loading: true };
    case CREATE_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case CREATE_PERMISSION_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case CREATE_PERMISSION_RESET:
      return initialState;
    default:
      return state;
  }
};

export default createPermissionReducer;
