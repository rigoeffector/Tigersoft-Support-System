import { all, fork } from 'redux-saga/effects';
import { watchClientsListData } from './clients/list';
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

export default function* rootSaga() {
  yield all([
    fork(watchClientsListData),
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
    fork(watchUpdatePermissionData)
  ]);
}
