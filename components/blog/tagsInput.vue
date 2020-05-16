<template>
  <select class="form-control" :id="id" multiple="multiple" data-placeholder="Chọn tags">
    <option v-for="tag in tags" :value="tag.id" :key="tag.id" :selected="isSelected(tag)">{{ tag.title }}</option>
  </select>
</template>
<script>
  import { strRandom } from '@/helpers/str';
  import { clone } from '@/helpers/object';
  import select2 from 'admin-lte/plugins/select2/js/select2.full';
  import tagApi from '@/api/blog/tag';

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
      },

      value: {
        type: Array,
        default () {
          return [];
        }
      }
    },

    computed: {
      tags () {
        return this.$store.state.blog.tag.list;
      }
    },

    mounted () {
      $(`#${this.id}`)
        .select2({
          tags: true,
          placeholder: this.placeholder,
          createTag: this.createTag,
        })
        .on('change', this.change);
    },

    methods: {
      isSelected (tag) {
        return this.value.map(n => parseInt(n)).indexOf(parseInt(tag.id)) > -1
      },

      async change () {
        let value = $(`#${this.id}`).val();
        let formatedValue = [];

        if (Array.isArray(value)) {
          for (let tagId of value) {
            if (parseInt(tagId) == tagId) {
              formatedValue.push(parseInt(tagId));
            } else {
              let title = tagId.replace(/new:/ig, '');
              let { data: response } = await tagApi.create({ title });
              if (response.error) {
                continue;
              }

              formatedValue.push(parseInt(response.data.tag.id));
            }
          }
        }

        this.$emit('input', formatedValue);
      },

      createTag (params) {
        let term = $.trim(params.term);
        if (term === '') {
          return null;
        }

        return {
          id: 'new:' + term,
          text: term,
          newTag: true,
        }
      }
    }
  }
</script>
