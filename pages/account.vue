<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Tài khoản của bạn</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-8 col-md-12">
            <div class="card card-outline">
              <div class="card-header">
                <h3 class="card-title">Thông tin cá nhân</h3>
              </div>
              <form action="" @submit.prevent="updateAccount">
                <div class="card-body">
                  <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" readonly v-model="account.email">
                  </div>
                  <div class="form-group mb-0">
                    <label class="required">Tên</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': accountValidator.hasError('name') }" placeholder="Nhập tên của bạn" v-model="account.name">
                    <fv-message :message="accountValidator.getError('name')" />
                  </div>
                </div>
                <div class="card-footer text-right">
                  <button type="submit" :class="{ 'btn-loading': isUpdatingAccount }" class="btn min-width btn-danger">Lưu</button>
                </div>
              </form>
            </div>
            <div class="card card-outline">
              <div class="card-header">
                <h3 class="card-title">Đổi mật khẩu</h3>
              </div>
              <form action="" @submit.prevent="changePassword">
                <div class="card-body">
                   <div class="form-group">
                    <label class="required">Nhập mật khẩu mới</label>
                    <input type="password" class="form-control" :class="{ 'is-invalid': passwordValiator.hasError('password') }" placeholder="Nhập mật khẩu mới" v-model="password.password">
                    <fv-message :message="passwordValiator.getError('password')" />
                  </div>
                  <div class="form-group mb-0">
                    <label class="required">Nhập lại mật khẩu</label>
                    <input type="password" class="form-control" :class="{ 'is-invalid': passwordValiator.hasError('password_confirmation') }" placeholder="Nhập lại mật khẩu" v-model="password.password_confirmation">
                    <fv-message :message="passwordValiator.getError('password_confirmation')" />
                  </div>
                </div>
                <div class="card-footer text-right">
                  <button :class="{ 'btn-loading': isUpdatingPassword }" class="btn min-width btn-danger">Lưu</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import fvMessage from '@/components/formValidator/message';
  import Validator from '@/plugins/validator';
  import accountApi from '@/api/account';

  export default {
    middleware: 'authenticate',

    components: {
      fvMessage,
    },

    created () {
      this.setActivedMenu(['account']);
    },

    data () {
      return {
        account: {
          email: this.$store.state.auth.user.email,
          name: this.$store.state.auth.user.name,
        },
        accountValidator: Validator.make(),
        passwordValiator: Validator.make(),
        isUpdatingAccount: false,
        isUpdatingPassword: false,

        password: {
          password: '',
          password_confirmation: '',
        }
      }
    },

    methods: {
      async updateAccount () {
        this.accountValidator.resetErrors();

        this.isUpdatingAccount = true;
        let { data: response } = await this.updateAccountInfo({ name: this.account.name });
        this.isUpdatingAccount = false;
        if (response.error) {
          this.accountValidator.setErrors(response.errors);
          this.$toast.fire({
            icon: 'error',
            title: 'Chưa cập nhật được thông tin cá nhân'
          });
          return;
        }

        this.$toast.fire({ icon: 'success', title: 'Đã lưu' });
      },

      async changePassword () {
        this.passwordValiator.resetErrors();

        this.isUpdatingPassword = true;
        let { data: response } = await accountApi.changePassword(this.password);
        this.isUpdatingPassword = false;
        if (response.error) {
          this.passwordValiator.setErrors(response.errors);
          this.$toast.fire({
            icon: 'error',
            title: 'Chưa đổi được mật khẩu'
          });
          return;
        }

        this.$toast.fire({ icon: 'success', title: 'Đã lưu' });
        this.password.password = '';
        this.password.password_confirmation = '';
      },

      ...mapActions(['setActivedMenu', 'updateAccountInfo']),
    }
  }
</script>
