<template>
  <div class="edior-title">
    <textarea :id="id" :value="value" @input="emitInputEvent" type="text" class="form-control" :class="{ 'is-invalid': isInvalid }" placeholder="Nhập tên bài viết" @keyup.enter="disableTypingEnter"></textarea>
  </div>
</template>

<script>
  import autosize from 'autosize';
  import { strRandom } from '@/helpers/str';

  export default {
    props: {
      value: {
        type: String,
        default: '',
        // default: 'Kiến trúc Microservice là gì? Cùng tìm hiểu trong 10 phút',
      },
      id: {
        type: String,
        default () {
          return strRandom(5);
        }
      },
      isInvalid: {
        type: Boolean,
        default: false,
      }
    },

    computed: {
      container () {
        return $(`#${this.id}`);
      }
    },

    mounted () {
      autosize(this.container);
    },

    methods: {
      disableTypingEnter () {
        this.$emit('input', this.value.trim());
        this.container.trigger('blur');
        this.$emit('blur');
      },

      emitInputEvent (event) {
        this.$emit('input', event.target.value)
      }
    }
  }
</script>
