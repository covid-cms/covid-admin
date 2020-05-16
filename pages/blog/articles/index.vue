<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="d-flex align-items-center">
          <div class="mr-4">
            <h1 class="m-0 text-dark">Danh sách bài viết</h1>
          </div>
          <div class="mr-auto">
            <button @click.prevent="$router.push('/blog/articles/create')" to="/blog/articles/create" class="btn btn-outline-danger btn-xs">Viết bài mới</button>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <div class="card card-danger card-outline card-outline-tabs">
          <div class="card-header p-0 border-bottom-0">
            <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
              <li class="nav-item">
                <a class="nav-link text-dark" :class="{ active: isActiveTab('all') }" @click.prevent="changeTab('all')" href="#all" role="tab">Tất cả bài viết</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" :class="{ active: isActiveTab('published') }" @click.prevent="changeTab('published')" href="#published" role="tab">Bài đã đăng</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-dark" :class="{ active: isActiveTab('draft') }" @click.prevent="changeTab('draft')" href="#draft" role="tab">Bài nháp</a>
              </li>
            </ul>
          </div>
          <form class="card-body border-bottom" @submit.prevent="search">
            <div class="d-flex">
              <div class="mr-3" style="min-width: 250px">
                <categories-select v-model="filters.category_id" />
              </div>
              <div class="w-100 mr-3">
                <input type="text" class="form-control" placeholder="Nhập từ khóa tìm kiếm" v-model.lazy="filters.keyword" v-debounce="500">
              </div>
              <div>
                <button type="submit" placeholder="Tìm kiếm theo tên bài viết" class="btn btn-danger" style="min-width: 100px">Tìm kiếm</button>
              </div>
            </div>
          </form>
          <div class="card-body table-responsive p-0">
            <smart-table :loading="isLoading">
              <thead>
                <tr>
                  <th>Tên bài viết</th>
                  <th class="date-format">Ngày đăng</th>
                  <th>Trạng thái</th>
                  <th>Danh mục</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="article in articles">
                  <td><nuxt-link class="text-primary" :to="`/blog/articles/${article.id}/edit`">{{ article.title }}</nuxt-link></td>
                  <td class="date-format">{{ article.published_at | dateFormat }}</td>
                  <td><span class="tag tag-success">{{ article.status | articleStatusTitle }}</span></td>
                  <td>
                    {{ article.categories.map(category => category.title).join(', ') }}
                  </td>
                  <td class="action-col">
                    <button type="button" class="btn border-0 btn-outline-secondary dropdown-toggle btn-xs clear-after" data-toggle="dropdown" aria-expanded="false">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <ul class="dropdown-menu border-0">
                      <li><nuxt-link class="dropdown-item" :to="`/blog/articles/${article.id}/edit`">Chỉnh sửa</nuxt-link></li>
                      <li><a class="dropdown-item" :href="article.public_url">Xem ngoài trang chủ</a></li>
                      <li class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" href="#" @click.prevent="deleteArticle(article)">Xóa</a></li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </smart-table>
          </div>
          <div class="card-footer clearfix">
            <pagination :total="total" :current="filters.page" @change="changePage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { articleStatusTitle } from '@/helpers/blog';
  import { dateFormat } from '@/helpers/datetime';
  import categoriesSelect from '@/components/blog/categoriesSelect';
  import smartTable from '@/components/smartTable';
  import pagination from '@/components/pagination';
  import articles from '@/samples/blog/articles';
  import articleApi from '@/api/blog/article';

  const PUBLISHED = 'published';
  const DRAFT = 'draft';
  const ALL = 'all';

  export default {
    middleware: 'authenticate',

    components: {
      categoriesSelect,
      smartTable,
      pagination,
    },

    filters: {
      articleStatusTitle,
      dateFormat
    },

    asyncData ({ params, query }) {
      return {
        articles: [],
        total: 0,

        filters: {
          page: (query.page && query.page >= 1) ? Number(query.page) : 1,
          status: query.status || ALL,
          category_id: query.category_id || undefined,
          keyword: query.keyword || undefined,
        },

        isLoading: false,
      }
    },

    created () {
      this.setActivedMenu(['blog', 'article']);
      this['blog/category/fetch']();
      this.fetchData();
    },

    methods: {
      async fetchData () {
        this.isLoading = true;

        const { data: paginatedArticles } = await articleApi.getList(this.filters);

        this.articles = paginatedArticles.data;
        this.total = paginatedArticles.total;
        this.perpage = paginatedArticles.per_page;
        this.isLoading = false;
      },

      changeTab (tab) {
        if (tab == PUBLISHED) {
          this.filters.status = PUBLISHED;
        } else if (tab == DRAFT) {
          this.filters.status = DRAFT;
        } else if (tab == ALL) {
          this.filters.status = 'all';
        } else {
          throw 'Không hiểu tab ' + tab;
        }
      },

      isActiveTab (tab) {
        return this.filters.status == tab;
      },

      updateBrowserUrl () {
          this.$router.push({ path: this.$route.path, query: this.filters });
      },

      search () {
        this.fetchData();
        this.updateBrowserUrl();
      },

      async deleteArticle (article) {
        let { value: confirm } = await this.$alert.fire({
          title: 'Bạn có chắc chắn muốn xóa?',
          text: 'Sau khi xóa sẽ không thể khôi phục!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy'
        });

        if (confirm) {
          await articleApi.delete(article.id);
          this.$toast.fire({
            icon: 'success',
            title: 'Đã xóa',
          });
          this.fetchData();
        }
      },

      changePage (page) {
        this.filters.page = page;
      },

      ...mapActions([
        'setActivedMenu',
        'blog/category/fetch'
      ]),
    },

    watch: {
      'filters.page' () {
        this.search();
      },
      'filters.category_id' () {
        this.changePage(1);
        this.search();
      },
      'filters.keyword' () {
        this.changePage(1);
        this.search();
      },
      'filters.status' () {
        this.changePage(1);
        this.search();
      }
    }
  }
</script>
