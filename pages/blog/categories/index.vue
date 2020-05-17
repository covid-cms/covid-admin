<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <div class="mr-4">
            <h1 class="m-0 text-dark">Danh mục bài viết</h1>
          </div>
          <div class="mr-auto">
            <button class="btn btn-outline-danger btn-xs" v-if="!isOpenFormCreateCategory" @click="showFormCreateCategory">Thêm danh mục</button>
            <button class="btn btn-outline-secondary btn-xs" v-else @click="hideFormCreateCategory">Đóng</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="card card-outline mb-5" v-if="isOpenFormCreateCategory">
          <div class="card-header">
            <h3 class="card-title">Thêm danh mục mới</h3>
          </div>
          <form action="" @submit.prevent="createCategory">
            <div class="card-body">
              <div class="form-group has-error">
                <label class="required">Tên danh mục</label>
                <input type="text" class="form-control" v-model="category.title" placeholder="Nhập tên danh mục" :id="inputCategoryTitleId" :class="{ 'is-invalid': validator.hasError('title') }">
                <fv-message :message="validator.getError('title')" />
              </div>
              <div class="form-group">
                <label>Slug</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">{{ 'blog/categories/' | homeUrl }}</span>
                  </div>
                  <input type="text" class="form-control" placeholder="" v-model="category.slug" :class="{ 'is-invalid': validator.hasError('slug') }">
                </div>
                <fv-message :message="validator.getError('slug')" />
              </div>
              <div class="form-group mb-0">
                <label>Danh mục cha</label>
                <categories-select placeholder="Danh mục gốc" v-model="category.parent_id" :only-parent="true" />
              </div>
            </div>
            <div class="card-footer text-right">
              <button class="btn min-width btn-outline-secondary" type="button" @click="hideFormCreateCategory">Đóng</button>
              <button class="btn min-width btn-danger" type="submit" :class="{ 'btn-loading': isCreatingCategory }">Thêm</button>
            </div>
          </form>
        </div>
        <div class="card card-danger card-outline card-outline-tabs">
          <div class="card-header p-0 border-bottom-0">
            <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link text-dark active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#custom-tabs-four-home" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Tất cả danh mục</a>
              </li>
            </ul>
          </div>
          <div class="card-body border-bottom">
            <div class="d-flex">
              <div class="w-100 mr-3">
                <input type="text" class="form-control" placeholder="Nhập từ khóa tìm kiếm" v-model="filter.search">
              </div>
              <div>
                <button type="button" class="btn btn-danger" style="min-width: 100px">Tìm kiếm</button>
              </div>
            </div>
          </div>
          <div class="card-body table-responsive p-0">
            <smart-table :loading="isFetchingCategory">
              <thead>
                <tr>
                  <th>Tên danh mục</th>
                  <th>Slug</th>
                  <th class="number-format">Số bài viết</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories">
                  <td><nuxt-link class="text-primary" :to="`/blog/categories/${category.id}/edit`">{{ category.title }}</nuxt-link></td>
                  <td>{{ category.slug }}</td>
                  <td class="number-format">{{ category.total_article }}</td>
                  <td class="action-col">
                    <button type="button" class="btn border-0 btn-outline-secondary dropdown-toggle btn-xs clear-after" data-toggle="dropdown" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu border-0">
                      <li><nuxt-link class="dropdown-item" :to="`/blog/categories/${category.id}/edit`">Chỉnh sửa</nuxt-link></li>
                      <li><a class="dropdown-item" :href="category.public_url">Xem ngoài trang chủ</a></li>
                      <li class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" href="#" @click.prevent="deleteCategory(category)">Xóa</a></li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </smart-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { strRandom, strSlug } from '@/helpers/str';
  import { homeUrl } from '@/helpers/url';
  import categoriesSelect from '@/components/blog/categoriesSelect';
  import smartTable from '@/components/smartTable';
  import Validator from '@/plugins/validator';
  import fvMessage from '@/components/formValidator/message';

  export default {
    middleware: 'authenticate',

    head: {
      title: 'Danh sách danh mục'
    },

    components: {
      fvMessage,
      categoriesSelect,
      smartTable
    },

    filters: {
      homeUrl
    },

    created () {
      this.setActivedMenu(['blog', 'category']);
      this['blog/category/fetch']();
    },

    computed: {
      inputCategoryTitleId () {
        return strRandom(5);
      },

      categories () {
        let categories = this['blog/category/getRecursiveList'];
        if (this.filter.search.trim() != '') {
          categories = categories.filter(category =>  strSlug(category.title).includes(strSlug(this.filter.search.trim())));
        }

        return categories;
      },

      isFetchingCategory () {
        return this['blog/category/isFetching'];
      },

      ...mapGetters([
        'blog/category/getRecursiveList',
        'blog/category/isFetching',
      ])
    },

    data () {
      return {
        isOpenFormCreateCategory: false,
        isCreatingCategory: false,
        validator: Validator.make(),

        category: {
          title: '',
          slug: '',
          parent_id: 0,
        },

        filter: {
          search: '',
        }
      }
    },

    methods: {
      async createCategory () {
        this.validator.resetErrors();
        this.isCreatingCategory = true;
        let { data: response } = await this['blog/category/create'](this.category);
        this.isCreatingCategory = false;

        if (response.error) {
          this.$toast.error('Không tạo được danh mục mới');
          this.validator.setErrors(response.errors);
          return;
        }

        this.$toast.success('Đã thêm danh mục mới');
        this.resetCreateCategoryFields();
      },

      showFormCreateCategory () {
        this.isOpenFormCreateCategory = true;
        let that = this;
        setTimeout(function () {
          $(`#${that.inputCategoryTitleId}`).trigger('focus');
        }, 50);
      },

      hideFormCreateCategory () {
        this.isOpenFormCreateCategory = false;
        this.resetCreateCategoryFields();
        this.validator.resetErrors();
      },

      resetCreateCategoryFields () {
        this.category.title = '';
        this.category.slug = '';
        this.category.parentId = 0;
      },

      async deleteCategory (category) {
        let { value: confirm } = await this.$alert.fire({
          title: 'Bạn có chắc chắn muốn xóa?',
          text: "Sau khi xóa sẽ không thể khôi phục!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy'
        });

        if (confirm) {
          await this['blog/category/delete'](category.id);
          this.$toast.success('Đã xóa');
        }
      },

      ...mapActions([
        'setActivedMenu',
        'blog/category/create',
        'blog/category/fetch',
        'blog/category/delete',
      ]),
    },

    watch: {
      'category.title' (value, oldValue) {
        let oldSlug = strSlug(oldValue);

        if (!this.category.slug || this.category.slug == oldSlug) {
          this.category.slug = strSlug(value);
        }
      }
    }
  }
</script>
