import axios from '@/api/axios';
import headers from '@/api/headers';
import { apiUrl } from '@/helpers/url';
import { serialize } from '@/helpers/str';

export default {
  getList (params) {
    return axios.get(apiUrl('api/blog/categories'), {
      params: params,
      headers: headers.getAuthHeaders()
    });
  },

  getDetail (categoryId) {
    return axios.get(apiUrl(`api/blog/categories/${categoryId}`), {
      headers: headers.getAuthHeaders()
    });
  },

  create (data) {
    return axios.post(apiUrl('api/blog/categories'), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  update (categoryId, data) {
    return axios.put(apiUrl(`api/blog/categories/${categoryId}`), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  delete (categoryId) {
    return axios.delete(apiUrl(`api/blog/categories/${categoryId}`), {
      headers: headers.getAuthHeaders()
    });
  },
}
