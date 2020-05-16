<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <div class="mr-4">
            <h1 class="m-0 text-dark">Chỉnh sửa tag</h1>
          </div>
          <div class="mr-auto">
            <a target="_blank" :href="tag.public_url" class="btn btn-outline-secondary btn-xs">Xem ngoài trang chủ</a>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <form method="post" @submit.prevent="saveTag">
          <div class="row">
            <div class="col-lg-8 col-md-12">
              <div class="card card-outline">
                <div class="card-header">
                  <h3 class="card-title">Thông tin cơ bản</h3>
                </div>
                <div class="card-body">
                  <div class="form-group mb-0">
                    <label class="required">Tên tag</label>
                    <input type="text" class="form-control" placeholder="Nhập tên tag" v-model="tag.title">
                  </div>
                </div>
              </div>
              <div class="card card-outline">
                <div class="card-header">
                  <h3 class="card-title">SEO</h3>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label>Meta title</label>
                    <input type="text" class="form-control" placeholder="Meta title" v-model="tag.meta_title">
                  </div>
                  <div class="form-group">
                    <label class="required">Slug</label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">{{ 'blog/tags/' | homeUrl }}</span>
                      </div>
                      <input type="text" class="form-control" placeholder="" v-model="tag.slug">
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Meta description</label>
                    <textarea class="form-control" v-model="tag.meta_description" placeholder="Meta description"></textarea>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <button class="btn-outline-danger btn min-width" type="button" @click="deleteTag">Xóa</button>
                <div class="ml-auto">
                  <nuxt-link to="/blog/tags" class="btn-outline-secondary btn min-width" type="button">Trở về</nuxt-link>
                  <button class="btn-danger btn min-width" type="submit" :class="{ 'btn-loading': isSubmitting }">Cập nhật</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import { strRandom } from '@/helpers/str';
  import { homeUrl } from '@/helpers/url';
  import tags from '@/samples/blog/tags';
  import tagApi from '@/api/blog/tag';
  import fvMessage from '@/components/formValidator/message';
  import Validator from '@/plugins/validator';

  export default {
    middleware: 'authenticate',

    head: {
      title: 'Chỉnh sửa tag'
    },

    components: {
      fvMessage
    },

    filters: {
      homeUrl
    },

    created () {
      this.setActivedMenu(['blog', 'tag']);
      this['blog/tag/fetch']();
    },

    async asyncData ({ params, error }) {
      var response;

      try {
        var { data: response } = await tagApi.getDetail(params.id);
      } catch (e) {
        return error({ statusCode: e.response.status });
      }

      return {
        tag: response.data.tag,
        isSubmitting: false,
        validator: Validator.make(),
      }
    },

    methods: {
      async saveTag () {
        this.validator.resetErrors();
        this.isSubmitting = true;
        let { data: response } = await tagApi.update(this.tag.id, this.tag);
        this.isSubmitting = false;

        if (response.error) {
          this.validator.setErrors(response.error);
          this.$toast.fire({
            icon: 'error',
            title: 'Thông tin chưa được lưu'
          });
          return;
        }

        this.$toast.fire({
          icon: 'success',
          title: 'Đã lưu',
        });
      },

      async deleteTag () {
        let { value: confirm } = await this.$alert.fire({
          title: 'Bạn có chắc chắn muốn xóa?',
          text: "Sau khi xóa sẽ không thể khôi phục!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy'
        });

        if (confirm) {
          await tagApi.delete(this.tag.id);
          this.$router.push('/blog/tags');
        }
      },

      ...mapActions([
        'setActivedMenu',
        'blog/tag/fetch',
      ]),
    }
  }
</script>
