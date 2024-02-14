import { combineReducers } from 'redux';
import readClientsListReducer from './clients/read';
import customizationReducer from 'store/customizationReducer';
import getUsersReducer from './users/read';
import createUserReducer from './users/create';
import deleteUserReducer from './users/delete';
import updateUserReducer from './users/update';
import getRolesReducer from './roles/read';
import createRoleReducer from './roles/create';
import deleteRoleReducer from './roles/delete';
import updateRoleReducer from './roles/update';
import getPermissionsReducer from './permissions/read';
import createPermissionReducer from './permissions/create';
import deletePermissionReducer from './permissions/delete';
import updatePermissionReducer from './permissions/update';
import getTicketsReducer from './tickets/read';
import createTicketReducer from './tickets/create';
import updateTicketReducer from './tickets/update';
import deleteClientReducer from './clients/delete';
import updateClientReducer from './clients/edit';
import deleteTicketReducer from './tickets/delete';
import createClientReducer from './clients/create';
import loginUserReducer from './auth/login';
import getMessagesReducer from './messages/read';
import createMessageReducer from './messages/create';

const rootReducer = combineReducers({
  auth: loginUserReducer,
  customization: customizationReducer,
  listClients: readClientsListReducer,
  deleteClient: deleteClientReducer,
  updateClient: updateClientReducer,
  createClient: createClientReducer,
  getUsers: getUsersReducer,
  createUser: createUserReducer,
  deleteUser: deleteUserReducer,
  updateUser: updateUserReducer,
  getRoles: getRolesReducer,
  createRole: createRoleReducer,
  deleteRole: deleteRoleReducer,
  updateRole: updateRoleReducer,
  getPermissions: getPermissionsReducer,
  createPermission: createPermissionReducer,
  deletePermission: deletePermissionReducer,
  updatePermission: updatePermissionReducer,
  getTickets: getTicketsReducer,
  createTicket: createTicketReducer,
  updateTicket: updateTicketReducer,
  deleteTicket: deleteTicketReducer,
  createMessage: createMessageReducer,
  getMessages: getMessagesReducer
});

export default rootReducer;
