<template>
  <div class="content-wrapper document-layout">
    <div class="content-header position-fixed bg-white border-bottom bg-white">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <div>
            <h1 class="m-0 text-dark">Chỉnh sửa bài viết</h1>
          </div>
          <div class="ml-auto">
            <template v-if="isDraftArticle">
              <button :class="{ 'btn-loading': isSubmitting }" class="btn btn-outline-secondary min-width" @click.prevent="updateArticle">Lưu nháp</button>
              <button :class="{ 'btn-loading': isSubmitting }" class="btn btn-danger min-width" @click.prevent="publishArticle">Đăng bài</button>
            </template>
            <template v-else>
              <button :class="{ 'btn-loading': isSubmitting }" class="btn btn-outline-secondary min-width" @click.prevent="switchDraftMode">Chuyển về trạng thái nháp</button>
              <button :class="{ 'btn-loading': isSubmitting }" class="btn btn-danger min-width" @click.prevent="updateArticle">Cập nhật</button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="content with-fixed-header pl-0">
      <div class="border-right position-fixed overflow-auto fit-height primary-col">
        <form>
          <div class="p-5 bg-white">
            <div class="editor pt-4">
              <div class="form-group">
                <editor-title v-model="article.title" :is-invalid="validator.hasError('title')" />
                <fv-message :message="validator.getError('title')" />
              </div>
              <div class="form-group">
                <editor v-model="article.content" />
              </div>
            </div>
          </div>
          <div class="card shadow-none border-top rounded-0 mb-0">
            <div class="card-header">
              <h3 class="card-title font-weight-bold">SEO</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group">
                <label>Meta title</label>
                <input type="text" class="form-control" placeholder="Meta title" v-model="article.meta_title">
              </div>
              <div class="form-group">
                <label>Slug</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon3">{{ 'blog/articles/' | homeUrl }}</span>
                  </div>
                  <input type="text" class="form-control" :class="{ 'is-invalid': validator.hasError('slug') }"  v-model="article.slug">
                </div>
                <fv-message :message="validator.getError('slug')" />
              </div>
              <div class="form-group">
                <label>Meta description</label>
                <textarea class="form-control" v-model="article.meta_description" placeholder="Meta description"></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="position-fixed overflow-auto fit-height secondary-col bg-white">
        <div class="card shadow-none border-bottom rounded-0 mb-0">
          <div class="card-header">
            <h3 class="card-title font-weight-bold">Danh mục</h3>
            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <categories-checkbox v-model="article.categories" />
          </div>
        </div>
        <div class="card shadow-none border-bottom rounded-0 mb-0">
          <div class="card-header">
            <h3 class="card-title font-weight-bold">Tags</h3>
            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <tags-input v-model="article.tags" />
          </div>
        </div>
        <div class="card shadow-none border-bottom rounded-0 mb-0">
          <div class="card-header">
            <h3 class="card-title font-weight-bold">Ảnh đại diện</h3>
            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <image-input v-model="article.thumbnail" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { homeUrl } from '@/helpers/url';
  import { strSlug } from '@/helpers/str';
  import editor from '@/components/editor';
  import editorTitle from '@/components/editorTitle';
  import categoriesCheckbox from '@/components/blog/categoriesCheckbox';
  import tagsInput from '@/components/blog/tagsInput';
  import imageInput from '@/components/imageInput';
  import articleApi from '@/api/blog/article';
  import fvMessage from '@/components/formValidator/message';
  import Validator from '@/plugins/validator';

  const PUBLISHED = 'published';
  const DRAFT = 'draft';

  export default {
    middleware: 'authenticate',

    head: {
      title: 'Chỉnh sửa bài viết'
    },

    components: {
      editor,
      editorTitle,
      categoriesCheckbox,
      tagsInput,
      imageInput,
      fvMessage,
    },

    filters: {
      homeUrl
    },

    created () {
      this.setActivedMenu(['blog', 'article']);
      this['blog/category/fetch']();
      this['blog/tag/fetch']();
    },

    computed: {
      isDraftArticle () {
        return this.article.status == DRAFT;
      }
    },

    async asyncData ({ params, error }) {
      var response;

      try {
        var { data: response } = await articleApi.getDetail(params.id);
      } catch (e) {
        return error({ statusCode: e.response.status });
      }

      let article = response.data.article;
      return {
        article: {
          ...article,
          categories: article.categories ? article.categories.map(category => category.id) : [],
          tags: article.tags ? article.tags.map(tag => tag.id) : [],
        },
        isSubmitting: false,
        validator: Validator.make(),
      }
    },

    methods: {
      async updateArticle () {
        this.validator.resetErrors();

        let formData = {
          title: this.article.title,
          content: this.article.content,
          meta_title: this.article.meta_title,
          meta_description: this.article.meta_description,
          slug: this.article.slug,
          thumbnail: this.article.thumbnail,
          tags: this.article.tags,
          status: this.article.status,
          categories: this.article.categories,
        };

        this.isSubmitting = true;
        let { data: response } = await articleApi.update(this.article.id, formData);
        this.isSubmitting = false;

        if (response.error) {
          this.validator.setErrors(response.errors);
          this.$toast.error('Chưa cập nhật được bài viết');
          return;
        }

        this.$toast.success('Đã lưu');
      },

      publishArticle () {
        this.article.status = PUBLISHED;
        return this.updateArticle();
      },

      switchDraftMode () {
        this.article.status = DRAFT;
        return this.updateArticle();
      },

      ...mapActions([
        'setActivedMenu',
        'blog/category/fetch',
        'blog/tag/fetch',
      ]),
    }
  }
</script>

<style scoped>
  .fit-height {
    top: calc(57px + 69px);
    height: calc(100vh - 57px - 69px);
  }
</style>
