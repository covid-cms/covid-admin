<template>
  <ckeditor :editor="ckeditor" :value="value" :config="config" @input="handleInput"></ckeditor>
</template>

<script>
  import vue from 'vue';
  import ckeditor from '@/plugins/covid-admin-editor/ckeditor';
  import content from '@/samples/blog/article_detail';
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import { strRandom } from '@/helpers/str';
  import editorConfig from '@/config/editor';

  export default {
    props: {
      id: {
        type: String,
        default () {
          return strRandom(5);
        },
      },

      value: {
        type: String,
        default: '',
      },

      editor: {
        type: String,
        default: editorConfig.default,
      }
    },

    components: {
      ckeditor: CKEditor.component
    },

    computed: {
      ckeditor () {
        return ckeditor;
      },

      config () {
        let editor = this.editor;
        if (!editorConfig.editors[editor]) {
          throw 'Cannot load editor config ' + editor + ': Not found config';
        }
        return editorConfig.editors[editor];
      }
    },

    mounted () {

    },

    methods: {
      handleInput (value) {
        this.$emit('input', value);
      }
    }
  }
</script>
