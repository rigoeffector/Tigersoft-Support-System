import { combineReducers } from 'redux';
import readClientsListReducer from './clients/read';
import customizationReducer from 'store/customizationReducer';
import getUsersReducer from './users/read';
import createUserReducer from './users/create';
import deleteUserReducer from './users/delete';
import updateUserReducer from './users/update';

const rootReducer = combineReducers({
  customization: customizationReducer,
  listClients: readClientsListReducer,
  getUsers: getUsersReducer,
  createUser: createUserReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserReducer
});

export default rootReducer;
