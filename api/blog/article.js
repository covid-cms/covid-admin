import axios from '@/api/axios';
import headers from '@/api/headers';
import { apiUrl } from '@/helpers/url';
import { serialize } from '@/helpers/str';

export default {
  getList (params) {
    return axios.get(apiUrl('api/blog/articles'), {
      params: params,
      headers: headers.getAuthHeaders()
    });
  },

  create (data) {
    return axios.post(apiUrl('api/blog/articles'), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  getDetail (articleId) {
    return axios.get(apiUrl(`api/blog/articles/${articleId}`), {
      headers: headers.getAuthHeaders()
    });
  },

  update (articleId, data) {
    return axios.put(apiUrl(`api/blog/articles/${articleId}`), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  delete (articleId) {
    return axios.delete(apiUrl(`api/blog/articles/${articleId}`), {
      headers: headers.getAuthHeaders()
    });
  },
}
