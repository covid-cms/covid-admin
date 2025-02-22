import axios from './axios';
import headers from './headers';
import { apiUrl } from '@/helpers/url';
import { serialize } from '@/helpers/str';

export default {
  login (data) {
    return axios.post(apiUrl('api/auth/login'), serialize(data));
  },

  logout (data) {
    return axios.delete(apiUrl('api/auth/logout'), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  refresh (data) {
    return axios.post(apiUrl('api/auth/refresh'), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  }
}
