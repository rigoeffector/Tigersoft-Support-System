import request from '../request';

export const messageApi = {
  message: {
    create: (data) => request('POST', `messages/create.php`, data, false, false),
    read: (data) => request('POST', `messages/read.php`, data, false, false)
  }
};
