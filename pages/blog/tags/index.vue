<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <div class="mr-4">
            <h1 class="m-0 text-dark">Tag bài viết</h1>
          </div>
          <div class="mr-auto">
            <button class="btn btn-outline-danger btn-xs" v-if="!isOpenFormCreateTag" @click="showFormCreateTag">Thêm tag</button>
            <button class="btn btn-outline-secondary btn-xs" v-else @click="hideFormCreateTag">Đóng</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="card card-outline mb-5" v-if="isOpenFormCreateTag">
          <div class="card-header">
            <h3 class="card-title">Thêm tag mới</h3>
          </div>
          <form action="" @submit.prevent="createTag">
            <div class="card-body">
              <div class="form-group has-error">
                <label class="required">Tên tag</label>
                <input type="text" class="form-control" v-model="tag.title" placeholder="Nhập tên tag" :id="inputTagTitleId" :class="{ 'is-invalid': validator.hasError('title') }">
                <fv-message :message="validator.getError('title')" />
              </div>
              <div class="form-group mb-0">
                <label class="required">Slug</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">{{ 'blog/tags/' | homeUrl }}</span>
                  </div>
                  <input type="text" class="form-control" placeholder="" v-model="tag.slug" :class="{ 'is-invalid': validator.hasError('slug') }">
                </div>
                <fv-message :message="validator.getError('slug')" />
              </div>
            </div>
            <div class="card-footer text-right">
              <button class="btn min-width btn-outline-secondary" type="button" @click="hideFormCreateTag">Đóng</button>
              <button class="btn min-width btn-danger" type="submit" :class="{ 'btn-loading': isCreatingTag }">Thêm</button>
            </div>
          </form>
        </div>
        <div class="card card-danger card-outline card-outline-tabs">
          <div class="card-header p-0 border-bottom-0">
            <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link text-dark active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#custom-tabs-four-home" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Tất cả tag</a>
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
            <smart-table :loading="isFetchingTag">
              <thead>
                <tr>
                  <th>Tên tag</th>
                  <th>Slug</th>
                  <th class="number-format">Số bài viết</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tag in tags">
                  <td><nuxt-link class="text-primary" :to="`/blog/tags/${tag.id}/edit`">{{ tag.title }}</nuxt-link></td>
                  <td>{{ tag.slug }}</td>
                  <td class="number-format">{{ tag.total_article }}</td>
                  <td class="action-col">
                    <button type="button" class="btn border-0 btn-outline-secondary dropdown-toggle btn-xs clear-after" data-toggle="dropdown" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu border-0">
                      <li><nuxt-link class="dropdown-item" :to="`/blog/tags/${tag.id}/edit`">Chỉnh sửa</nuxt-link></li>
                      <li><a class="dropdown-item" :href="tag.public_url">Xem ngoài trang chủ</a></li>
                      <li class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" href="#" @click.prevent="deleteTag(tag)">Xóa</a></li>
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
  import smartTable from '@/components/smartTable';
  import fvMessage from '@/components/formValidator/message';
  import Validator from '@/plugins/validator';

  export default {
    middleware: 'authenticate',

    head: {
      title: 'Danh sách tag'
    },

    components: {
      smartTable,
      fvMessage,
    },

    filters: {
      homeUrl
    },

    created () {
      this.setActivedMenu(['blog', 'tag']);
      this['blog/tag/fetch']();
    },

    computed: {
      inputTagTitleId () {
        return strRandom(5);
      },

      tags () {
        let tags = this.$store.state.blog.tag.list;
        if (this.filter.search.trim() != '') {
          tags = tags.filter(tag =>  strSlug(tag.title).includes(strSlug(this.filter.search.trim())));
        }

        return tags;
      },

      isFetchingTag () {
        return this['blog/tag/isFetching'];
      },

      ...mapGetters([
        'blog/tag/isFetching',
      ])
    },

    data () {
      return {
        isOpenFormCreateTag: false,
        isCreatingTag: false,
        validator: Validator.make(),

        tag: {
          title: '',
          slug: '',
        },

        filter: {
          search: '',
        }
      }
    },

    methods: {
      async createTag () {
        this.validator.resetErrors();
        this.isCreatingTag = true;
        let { data: response } = await this['blog/tag/create'](this.tag);
        this.isCreatingTag = false;

        if (response.error) {
          this.$toast.error('Không tạo được tag mới');
          this.validator.setErrors(response.errors);
          return;
        }

        this.$toast.success('Đã thêm tag mới');
        this.resetCreateTagFields();
      },

      showFormCreateTag () {
        this.isOpenFormCreateTag = true;
        let that = this;
        setTimeout(function () {
          $(`#${that.inputTagTitleId}`).trigger('focus');
        }, 50);
      },

      hideFormCreateTag () {
        this.isOpenFormCreateTag = false;
        this.resetCreateTagFields();
        this.validator.resetErrors();
      },

      resetCreateTagFields () {
        this.tag.title = '';
        this.tag.slug = '';
      },

      async deleteTag (tag) {
        let { value: confirm } = await this.$alert.fire({
          title: 'Bạn có chắc chắn muốn xóa?',
          text: "Sau khi xóa sẽ không thể khôi phục!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy'
        });

        if (confirm) {
          await this['blog/tag/delete'](tag.id);
          this.$toast.success('Đã xóa');
        }
      },

      ...mapActions([
        'setActivedMenu',
        'blog/tag/create',
        'blog/tag/fetch',
        'blog/tag/delete',
      ]),
    },

    watch: {
      'tag.title' (value, oldValue) {
        let oldSlug = strSlug(oldValue);

        if (!this.tag.slug || this.tag.slug == oldSlug) {
          this.tag.slug = strSlug(value);
        }
      }
    }
  }
</script>
