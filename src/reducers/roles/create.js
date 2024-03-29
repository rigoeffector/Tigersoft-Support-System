import { CREATE_ROLE_ERROR, CREATE_ROLE_LOADING, CREATE_ROLE_SUCCESS, CREATE_ROLE_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const createRoleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ROLE_LOADING:
      return { ...state, loading: true };
    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case CREATE_ROLE_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case CREATE_ROLE_RESET:
      return initialState;
    default:
      return state;
  }
};

export default createRoleReducer;
