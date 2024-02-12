import request from '../request';

export const permissionsApi = {
  permissions: {
    list: (data) => request('GET', `permissions/read.php`, data, false, false),
    create: (data) => request('POST', `permissions/create.php`, data, false, false),
    delete: (data) => request('DELETE', `permissions/delete.php`, data, false, false),
    update: (data) => request('PATCH', `permissions/update.php`, data, false, false)
  }
};
