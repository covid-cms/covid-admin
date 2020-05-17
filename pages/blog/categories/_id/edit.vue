<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <div class="mr-4">
            <h1 class="m-0 text-dark">Chỉnh sửa danh mục</h1>
          </div>
          <div class="mr-auto">
            <a target="_blank" :href="category.public_url" class="btn btn-outline-secondary btn-xs">Xem ngoài trang chủ</a>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <form method="post" @submit.prevent="saveCategory">
          <div class="row">
            <div class="col-lg-8 col-md-12">
              <div class="card card-outline">
                <div class="card-header">
                  <h3 class="card-title">Thông tin cơ bản</h3>
                </div>
                <div class="card-body">
                  <div class="form-group">
                    <label class="required">Tên danh mục</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': validator.hasError('title') }" placeholder="Nhập tên danh mục" v-model="category.title">
                    <fv-message :message="validator.getError('title')" />
                  </div>
                  <div class="form-group">
                    <label>Danh mục cha</label>
                    <categories-select placeholder="Danh mục gốc" :ignored="[category.id]" v-model="category.parent_id" :only-parent="true" />
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
                    <input type="text" class="form-control" placeholder="Meta title" v-model="category.meta_title">
                  </div>
                  <div class="form-group">
                    <label class="required">Slug</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">{{ 'blog/categories/' | homeUrl }}</span>
                      </div>
                      <input type="text" class="form-control" placeholder="" v-model="category.slug" :class="{ 'is-invalid': validator.hasError('slug') }">
                    </div>
                    <fv-message :message="validator.getError('slug')" />
                  </div>
                  <div class="form-group">
                    <label>Meta description</label>
                    <textarea class="form-control" v-model="category.meta_description" placeholder="Meta description"></textarea>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center">
                <button class="btn-outline-danger btn min-width" type="button" @click="deleteCategory">Xóa</button>
                <div class="ml-auto">
                  <nuxt-link to="/blog/categories" class="btn-outline-secondary btn min-width" type="button">Trở về</nuxt-link>
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
  import { arrFirst } from '@/helpers/arr';
  import { homeUrl } from '@/helpers/url';
  import categoriesSelect from '@/components/blog/categoriesSelect';
  import fvMessage from '@/components/formValidator/message';
  import categoryApi from '@/api/blog/category';
  import Validator from '@/plugins/validator';

  export default {
    middleware: 'authenticate',

    head: {
      title: 'Chỉnh sửa danh mục'
    },

    components: {
      categoriesSelect,
      fvMessage
    },

    filters: {
      homeUrl
    },

    created () {
      this.setActivedMenu(['blog', 'category']);
      this['blog/category/fetch']();
    },

    async asyncData ({ params, store, error }) {
      var response;

      try {
        var { data: response } = await categoryApi.getDetail(params.id);
      } catch (e) {
        return error({ statusCode: e.response.status });
      }

      return {
        category: response.data.category,
        isSubmitting: false,
        validator: Validator.make(),
      }
    },

    methods: {
      async saveCategory () {
        this.isSubmitting = true;
        this.validator.resetErrors();

        let { data: response } = await categoryApi.update(this.category.id, this.category);
        this.isSubmitting = false;

        if (response.error) {
          this.validator.setErrors(response.errors);
          this.$toast.error('Thông tin chưa được lưu');
          return;
        }

        this.$toast.success('Đã lưu');
      },

      async deleteCategory () {
        let { value: confirm } = await this.$alert.fire({
          title: 'Bạn có chắc chắn muốn xóa?',
          text: 'Sau khi xóa sẽ không thể khôi phục!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy'
        });

        if (confirm) {
          await categoryApi.delete(this.category.id);
          this.$router.push('/blog/categories');
        }
      },

      ...mapActions([
        'setActivedMenu',
        'blog/category/fetch',
      ]),
    }
  }
</script>
