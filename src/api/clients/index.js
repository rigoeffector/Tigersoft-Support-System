import request from '../request';

export const clientsApi = {
  clients: {
    read: (data) => request('GET', `clients/read.php`, data, false, false),
    update: (data) => request('PATCH', `clients/update.php`, data, false, false),
    delete: (data) => request('DELETE', `clients/delete.php`, data, false, false),
    create: (data) => request('POST', `clients/create.php`, data, false, false)
  }
};
