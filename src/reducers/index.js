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

const rootReducer = combineReducers({
  customization: customizationReducer,
  listClients: readClientsListReducer,
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
  updateTicket: updateTicketReducer
});

export default rootReducer;
