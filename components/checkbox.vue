<template>
  <div class="icheck-danger">
    <input type="checkbox" :id="id" :value="value" :checked="checked" @change="handleChange">
    <label class="form-check-label" :for="id"><slot></slot>{{ label }}</label>
  </div>
</template>

<script>
  import { strRandom } from '@/helpers/str';

  export default {
    props: {
      id: {
        type: String,
        default () {
          return strRandom(5);
        }
      },
      label: {
        type: String,
        default: '',
      },
      value: {
        default: undefined
      },
      checked: {
        type: Boolean,
        default: false,
      }
    },

    methods: {
      handleChange ($event) {
        this.$emit('change', $event);
      }
    }
  }
</script>
