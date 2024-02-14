import { all, fork } from 'redux-saga/effects';
import { watchClientsListData } from './clients/read';
import { watchCreateUserData } from './users/create';
import { watchRolesListData } from './roles/read';
import { watchDeleteUserData } from './users/delete';
import { watchUsersListData } from './users/read';
import { watchUpdateUserData } from './users/update';
import { watchCreateRoleData } from './roles/create';
import { watchDeleteRoleData } from './roles/delete';
import { watchUpdateRoleData } from './roles/update';
import { watchPermissionsListData } from './permissions/read';
import { watchCreatePermissionData } from './permissions/create';
import { watchDeletePermissionData } from './permissions/delete';
import { watchUpdatePermissionData } from './permissions/update';
import { watchUpdateClientData } from './clients/edit';
import { watchDeleteClientData } from './clients/delete';
import { watchClientsCreateData } from './clients/create';
import { watchTicketsListData } from './tickets/read';
import { watchTicketCreateData } from './tickets/create';
import { watchTicketDeleteData } from './tickets/delete';
import { watchTicketUpdateData } from './tickets/update';
import { watchLoginUserData } from './auth/login';
import { watchMessagesListData } from './messages/read';
import { watchMessagesCreateData } from './messages/create';

export default function* rootSaga() {
  yield all([
    fork(watchClientsListData),
    fork(watchUpdateClientData),
    fork(watchDeleteClientData),
    fork(watchClientsCreateData),
    fork(watchRolesListData),
    fork(watchCreateRoleData),
    fork(watchDeleteRoleData),
    fork(watchCreateUserData),
    fork(watchDeleteUserData),
    fork(watchUpdateRoleData),
    fork(watchUsersListData),
    fork(watchUpdateUserData),
    fork(watchPermissionsListData),
    fork(watchCreatePermissionData),
    fork(watchDeletePermissionData),
    fork(watchUpdatePermissionData),
    fork(watchTicketsListData),
    fork(watchTicketCreateData),
    fork(watchTicketDeleteData),
    fork(watchTicketUpdateData),
    fork(watchLoginUserData),
    fork(watchMessagesListData),
    fork(watchMessagesCreateData)
  ]);
}
