import request from '../request';

export const usersApi = {
  users: {
    list: (data) => request('GET', `users/read.php`, data, false),
    create: (data) => request('POST', `users/create.php`, data, false),
    delete: (data) => request('DELETE', `users/delete.php`, data, false),
    update: (data) => request('PATCH', `users/update.php`, data, false)
  }
};
