import { UPDATE_TICKET_ERROR, UPDATE_TICKET_LOADING, UPDATE_TICKET_SUCCESS, UPDATE_TICKET_RESET } from './constants';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  message: null
};

const updateTicketReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_TICKET_LOADING:
      return { ...state, loading: true };
    case UPDATE_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload?.success,
        error: null,
        data: payload.data,
        message: payload.message
      };
    case UPDATE_TICKET_ERROR:
      return { ...state, loading: false, error: payload.error, message: payload.message };
    case UPDATE_TICKET_RESET:
      return initialState;
    default:
      return state;
  }
};

export default updateTicketReducer;
