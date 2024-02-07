import request from '../request';

export const clientsApi = {
  clients: {
    list: (data) => request('GET', `clients/list`, data, false)
  }
};
