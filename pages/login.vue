<template>
  <body class="login-page">
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>Covid</b>CMS</a>
      </div>
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Đăng nhập</p>
          <form action="" method="post" @submit.prevent="submitFormLogin">
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Nhập email" v-model="email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" placeholder="Nhập mật khẩu" v-model="password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-danger btn-block" :class="{ 'btn-loading': submitting }">Đăng nhập</button>
          </form>
        </div>
      </div>
      <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </body>
</template>
<script>
  import { mapActions } from 'vuex';
  import { setDocumentTitle } from '@/helpers/document';
  import authApi from '@/api/auth';

  export default {
    layout: 'blank',
    middleware: 'guest',

    head: {
      title: 'Đăng nhập'
    },

    data () {
      return {
        email: '',
        password: '',
        submitting: false,
        errorMessage: '',
      }
    },

    methods: {
      async submitFormLogin () {
        this.submitting = true;
        this.errorMessage = '';

        let { data: response } = await authApi.login({
          email: this.email,
          password: this.password
        });

        this.submitting = false;

        if (response.error) {
          this.errorMessage = response.message;
        } else {
          this.setAuth({
            accessToken: response.access_token,
            expiresAt: response.expires_at,
            user: {
              id: response.account.id,
              email: response.account.email,
              name: response.account.name,
            }
          });
          this.$router.push({ name: 'index' });
        }

      },
      ...mapActions(['setAuth']),
    }
  }
</script>
