import Vue from 'vue';
import Swal from 'admin-lte/plugins/sweetalert2/sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

Vue.prototype.$alert = Swal;
