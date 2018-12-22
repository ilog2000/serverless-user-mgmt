import m from 'mithril';
import stream from 'mithril-stream';
import config from '../config.js';
import { showError, setStreamed, getPOJO } from '../utils.js';

const User = {
  list: [],

  loadList: async () => {
    try {
      const token = localStorage.getItem('__token');
      const result = await m.request({
        method: 'GET',
        url: config.BASE_API_URL + '/api/v1/users',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        // withCredentials: true
      });

      User.list = result.Items;
    } catch (error) {
      showError('ERROR: ' + error.message);
    }
  },

  current: {
    id: stream(''),
    email: stream(''),
    first_name: stream(''),
    last_name: stream(''),
    picture: stream(''),
    role: stream(''),
    active: stream(false),
  },

  load: async id => {
    try {
      const token = localStorage.getItem('__token');
      const result = await m.request({
        method: 'GET',
        url: config.BASE_API_URL + '/api/v1/users/' + id,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        // withCredentials: true
      });

      setStreamed(User.current, result.Item)
    } catch (error) {
      showError('ERROR: ' + error.message);
    }
  },

  update: async () => {
    try {
      const token = localStorage.getItem('__token');
      const user = getPOJO(User.current);
      await m.request({
        method: 'PUT',
        url: config.BASE_API_URL + '/api/v1/users/' + user.id,
        data: user,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      m.route.set('/list', {});
    } catch (error) {
      showError('ERROR: ' + error.message);
    }
  },

  create: async (user) => {
    try {
      const token = localStorage.getItem('__token');
      await m.request({
        method: 'POST',
        url: config.BASE_API_URL + '/api/v1/users',
        data: user,
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

  delete: async id => {
    try {
      const token = localStorage.getItem('__token');
      await m.request({
        method: 'DELETE',
        url: config.BASE_API_URL + '/api/v1/users/' + id,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        // withCredentials: true,
      });

      window.location.reload();
    } catch (error) {
      showError('ERROR: ' + error.message);
    }
  },
};

export default User;
