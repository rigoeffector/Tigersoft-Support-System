import request from '../request';

export const authApi = {
  auth: {
    login: (data) => request('POST', `login/login.php`, data, false, false)
  }
};
