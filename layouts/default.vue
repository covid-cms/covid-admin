<template>
  <div class="wrapper">
    <nav-header />
    <main-sidebar />
    <nuxt />
    <logout-modal :open="openLogoutModal" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import mainSidebar from './partials/mainSidebar';
  import navHeader from './partials/navHeader';
  import appFooter from './partials/footer';
  import logoutModal from './partials/logoutModal';

  export default {
    name: 'default',

    components: {
      mainSidebar,
      appFooter,
      navHeader,
      logoutModal
    },

    computed: {
      openLogoutModal () {
        return this.$store.state.openLogoutModal;
      }
    },

    created () {
      this.init();
    },

    methods: {
      ...mapActions(['init']),
    }
  }
</script>
