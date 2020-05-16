import axios from './axios';
import headers from './headers';
import { apiUrl } from '@/helpers/url';

export default {
  getInitData (articleId) {
    return axios.get(apiUrl('api/init'), {
      headers: headers.getAuthHeaders()
    });
  },
}
