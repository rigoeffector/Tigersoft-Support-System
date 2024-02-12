import { DELETE_TICKET_ERROR, DELETE_TICKET_LOADING, DELETE_TICKET_SUCCESS, DELETE_TICKET_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const deleteTicketReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_TICKET_LOADING:
      return { ...state, loading: true };
    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case DELETE_TICKET_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case DELETE_TICKET_RESET:
      return initialState;
    default:
      return state;
  }
};

export default deleteTicketReducer;
