import m from 'mithril';
import stream from 'mithril-stream';
import config from '../config.js';
import { showError } from '../utils.js';

const Auth = {
  email: stream(''),
  password: stream(''),

  validateLogin: function() {
    return Auth.email() !== '' && Auth.password() !== '';
  },

  login: async () => {
    try {
      const email = Auth.email();
      const password = Auth.password();

      const result = await m.request({
        method: 'POST',
        url: config.BASE_API_URL + '/login',
        data: { email, password },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        // withCredentials: true,
      });

      localStorage.setItem('__email', email);
      localStorage.setItem('__token', result.token);
      m.route.set('/list', {});
    } catch (error) {
      showError('ERROR: ' + error.message);
    }
  },

  id: stream(''),
  oldpassword: stream(''),
  newpassword: stream(''),
  repeatpassword: stream(''),

  validateChangePassword: function() {
    return Auth.oldpassword() !== '' && Auth.newpassword() !== '' && Auth.newpassword() === Auth.repeatpassword();
  },

  changePassword: async () => {
    try {
      const token = localStorage.getItem('__token');
      const id = Auth.id();
      const oldpassword = Auth.oldpassword();
      const newpassword = Auth.newpassword();
  
      await m.request({
        method: 'POST',
        url: config.BASE_API_URL + '/changepassword',
        data: { id, oldpassword, newpassword },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        // withCredentials: true,
      });

      m.route.set('/list', {});
    } catch (error) {
      showError('ERROR: ' + error.message);
    }
  },
};

export default Auth;
