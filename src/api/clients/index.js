import request from '../request';

export const clientsApi = {
  clients: {
    read: (data) => request('GET', `clients/read.php`, data, false, false),
    update: (data) => request('GET', `clients/update.php`, data, false, false),
    delete: (data) => request('GET', `clients/delete.php`, data, false, false),
    create: (data) => request('GET', `clients/create.php`, data, false, false)
  }
};
