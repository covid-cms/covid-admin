import { state } from '@/helpers/store';

export default {
  getAuthHeaders () {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${state().auth.accessToken}`
    };
  },
}
