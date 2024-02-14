import request from '../request';

export const ticketsApi = {
  tickets: {
    read: (data) => request('GET', `tickets/read.php`, data, false),
    create: (data) => request('POST', `tickets/create.php`, data, false),
    delete: (data) => request('DELETE', `tickets/delete.php`, data, false),
    update: (data) => request('PATCH', `tickets/update.php`, data, false)
  }
};
