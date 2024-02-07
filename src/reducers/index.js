import { combineReducers } from 'redux';
import readClientsListReducer from './clients/read';
import customizationReducer from 'store/customizationReducer';

const rootReducer = combineReducers({
  customization: customizationReducer,
  listClients: readClientsListReducer
});

export default rootReducer;
