<template>
  <div class="d-flex align-items-center justify-content-center image-container" :class="{ loading: loading }">
    <div class="spinner-grow position-absolute" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <img :src="src" class="img-fluid img-thumbnail">
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String,
        default: '',
      },
      loading: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>

<style scoped>
  .image-container.loading img.img-thumbnail {
    opacity: .6;
  }
</style>
