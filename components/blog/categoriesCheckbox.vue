<template>
  <div>
    <div class="form-group">
      <input type="text" class="form-control form-control-sm" placeholder="Tìm kiếm" v-model="keyword">
    </div>
    <div class="form-group overflow-auto" style="max-height: 300px">
      <checkbox
        v-for="category in categories"
        :label="category.title"
        :value="category.id"
        :key="category.id"
        :checked="isCheckedCategory(category)"
        @change="handleChange($event, category)" />
    </div>
    <form class="mb-0" v-show="openFormCreateCategory" method="post" @submit.prevent="createCategory">
      <div class="form-group">
        <input type="text" class="form-control form-control-sm" placeholder="Nhập tên danh mục" :id="categoryTitleId" v-model="categoryTitle">
      </div>
      <div class="form-group">
        <categories-select v-model="categoryParentId" class="form-control-sm" placeholder="Danh mục cha"></categories-select>
      </div>
      <div class="form-group d-flex mb-0">
        <div class="cursor-pointer text-danger mr-auto" @click="hideFormCreateCategory">Đóng</div>
        <button type="submit" :class="{ 'btn-loading': isCreatingCategory }" class="btn btn-secondary btn-sm">Tạo</button>
      </div>
    </form>
    <div v-if="!openFormCreateCategory" class="cursor-pointer text-primary" @click="showFormCreateCategory">Thêm danh mục mới</div>
  </div>
</template>
<script>
  import checkbox from '@/components/checkbox';
  import categoriesSelect from '@/components/blog/categoriesSelect';
  import { strSlug, strRandom } from '@/helpers/str';
  import { clone } from '@/helpers/object';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: {
      value: {
        type: Array,
        default () {
          return []
        }
      },
      onlyParent: {
        type: Boolean,
        default: false,
      }
    },

    computed: {
      categories () {
        let categories = this['blog/category/getRecursiveList'];

        if (this.onlyParent) {
          categories = categories.filter(category => category.parent_id == 0);
        }

        if (this.keyword.trim().length >= 0) {
          categories = categories.filter(category => {
            return strSlug(category.title).toLowerCase().includes(strSlug(this.keyword).toLowerCase());
          });
        }

        return categories;
      },

      categoryTitleId () {
        return strRandom(5);
      },

      ...mapGetters(['blog/category/getRecursiveList'])
    },

    components: {
      checkbox,
      categoriesSelect,
    },

    data () {
      return {
        keyword: '',
        openFormCreateCategory: false,
        isCreatingCategory: false,
        categoryTitle: '',
        categoryParentId: 0,
      }
    },

    methods: {
      showFormCreateCategory () {
        this.openFormCreateCategory = true;
        let that = this;
        setTimeout(function () {
          $(`#${that.categoryTitleId}`).trigger('focus');
        }, 50);
      },

      hideFormCreateCategory () {
        this.openFormCreateCategory = false;
      },

      async createCategory () {
        this.isCreatingCategory = true;

        await this['blog/category/create']({
          title: this.categoryTitle,
          parent_id: this.categoryParentId,
        });

        this.isCreatingCategory = false;
        this.categoryTitle = '';
        this.categoryParentId = 0;
      },

      isCheckedCategory (category) {
        return this.value.map(n => parseInt(n)).indexOf(parseInt(category.id)) > -1
      },

      handleChange ($event, category) {
        let clonedValue = clone(this.value);

        if ($event.target.checked) {
          clonedValue.push(parseInt(category.id));
        } else {
          clonedValue = clonedValue.filter(categoryId => categoryId != category.id);
        }

        this.$emit('input', clonedValue);
      },

      ...mapActions([
        'blog/category/create',
      ]),
    }
  }
</script>
