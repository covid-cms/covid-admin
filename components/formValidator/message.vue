<template>
  <div>
    <span v-for="messageItem in messages" class="error invalid-feedback">{{ messageItem }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        default: '',
      }
    },

    computed: {
      messages () {
        if (!Array.isArray(this.message)) {
          return [this.message];
        }

        return this.message;
      }
    }
  }
</script>
