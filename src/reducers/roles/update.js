import { UPDATE_ROLE_ERROR, UPDATE_ROLE_LOADING, UPDATE_ROLE_SUCCESS, UPDATE_ROLE_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const updateRoleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ROLE_LOADING:
      return { ...state, loading: true };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case UPDATE_ROLE_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case UPDATE_ROLE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default updateRoleReducer;
