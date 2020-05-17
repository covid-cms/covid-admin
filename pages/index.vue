<template>
  <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Tổng quan</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container-fluid">
        <button class="btn btn-danger" @click.prevent="showToast">Show toast</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    middleware: 'authenticate',

    head: {
      title: 'Tổng quan',
    },

    created () {
      this.setActivedMenu(['dashboard']);
    },

    methods: {
      showToast () {
        this.$toast2.info("Here is some information!");
      },
      ...mapActions(['setActivedMenu']),
    }
  }
</script>
