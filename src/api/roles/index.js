import request from '../request';

export const rolesApi = {
  roles: {
    list: (data) => request('GET', `roles/read.php`, data, false),
    create: (data) => request('POST', `roles/create.php`, data, false),
    delete: (data) => request('DELETE', `roles/delete.php`, data, false),
    update: (data) => request('PATCH', `roles/update.php`, data, false)
  }
};
