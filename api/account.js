import axios from './axios';
import headers from './headers';
import { apiUrl } from '@/helpers/url';
import { serialize } from '@/helpers/str';

export default {
  getDetail (articleId) {
    return axios.get(apiUrl('api/account'), {
      headers: headers.getAuthHeaders()
    });
  },

  update (data) {
    return axios.put(apiUrl('api/account'), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  changePassword (data) {
    return axios.put(apiUrl('api/account/password'), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },
}
