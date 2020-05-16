import axios from '@/api/axios';
import headers from '@/api/headers';
import { apiUrl } from '@/helpers/url';
import { serialize } from '@/helpers/str';

export default {
  getList (params) {
    return axios.get(apiUrl('api/blog/tags'), {
      params: params,
      headers: headers.getAuthHeaders()
    });
  },

  getDetail (tagId) {
    return axios.get(apiUrl(`api/blog/tags/${tagId}`), {
      headers: headers.getAuthHeaders()
    });
  },

  create (data) {
    return axios.post(apiUrl('api/blog/tags'), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  update (tagId, data) {
    return axios.put(apiUrl(`api/blog/tags/${tagId}`), serialize(data), {
      headers: headers.getAuthHeaders()
    });
  },

  delete (tagId) {
    return axios.delete(apiUrl(`api/blog/tags/${tagId}`), {
      headers: headers.getAuthHeaders()
    });
  },
}
