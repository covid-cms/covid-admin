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
      ...mapActions(['setActivedMenu']),
    }
  }
</script>
