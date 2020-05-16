import axios from './axios';
import headers from './headers';
import { apiUrl } from '@/helpers/url';
import { serialize } from '@/helpers/str';

export default {
  upload (formData) {
    return axios.post(apiUrl('api/storage'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers.getAuthHeaders()
      }
    });
  }
}
