import { DELETE_ROLE_ERROR, DELETE_ROLE_LOADING, DELETE_ROLE_SUCCESS, DELETE_ROLE_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const deleteRoleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_ROLE_LOADING:
      return { ...state, loading: true };
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case DELETE_ROLE_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case DELETE_ROLE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default deleteRoleReducer;
