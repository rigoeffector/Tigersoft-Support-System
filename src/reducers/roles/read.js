import { GET_ROLES_LIST_ERROR, GET_ROLES_LIST_LOADING, GET_ROLES_LIST_SUCCESS, GET_ROLES_LIST_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const getRolesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ROLES_LIST_LOADING:
      return { ...state, loading: true };
    case GET_ROLES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case GET_ROLES_LIST_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case GET_ROLES_LIST_RESET:
      return initialState;
    default:
      return state;
  }
};

export default getRolesReducer;
