<template>
  <select class="form-control" :id="id" :mutiple="mutiple" @change="change">
    <option></option>
    <option v-for="category in categories" v-if="shouldShow(category)" :key="category.id" :value="category.id" :selected="isSelected(category)">{{ category.title }}</option>
  </select>
</template>
<script>
  import { strRandom } from '@/helpers/str';
  import select2 from 'admin-lte/plugins/select2/js/select2.full';

  export default {
    props: {
      id: {
        type: String,
        default () {
          return strRandom(5);
        }
      },

      placeholder: {
        type: String,
        default: 'Danh mục'
      },

      value: {
        default: undefined,
      },

      mutiple: {
        type: Boolean,
        default: false,
      },

      onlyParent: {
        type: Boolean,
        default: false,
      },

      ignored: {
        type: Array,
        default () {
          return [];
        }
      }
    },

    computed: {
      categories () {
        let categories = this.$store.state.blog.category.list;

        if (this.onlyParent) {
          return categories.filter(category => category.parent_id == 0);
        }

        return categories;
      }
    },

    mounted () {
      $(`#${this.id}`)
        .select2({
          placeholder: this.placeholder,
          allowClear: true
        })
        .on('change', this.change);
    },

    methods: {
      isSelected (category) {
        if (this.mutiple) {
          return this.value.map(n => parseInt(n)).indexOf(category.id) > -1;
        }

        return this.value == category.id;
      },

      change ($event) {
        this.$emit('input', $event.target.value)
      },

      shouldShow (category) {
        return this.ignored.findIndex(categoryId => categoryId == category.id) == -1;
      }
    }
  }
</script>
