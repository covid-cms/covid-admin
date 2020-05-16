<template>
  <aside class="main-sidebar elevation-3 sidebar-dark-danger">
    <a href="index3.html" class="brand-link">
      <img src="/admin/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">Covid</span>
    </a>
    <div class="sidebar">
      <div class="user-panel mt-2 pb-2 mb-2 d-flex">
        <div class="image">
          <img src="/admin/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <nuxt-link to="/account" class="d-block cursor-pointer">{{ username }}</nuxt-link>
        </div>
      </div>
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column nav-flat nav-child-indent" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item" v-for="menuItem in mainMenu" :class="{ 'has-treeview': menuItem.hasChild, 'menu-open': menuItem.isOpen }">
            <nuxt-link :to="menuItem.routeTo" class="nav-link" :class="{ active: menuItem.active }">
              <i class="nav-icon" :class="menuItem.icon"></i>
              <p> {{ menuItem.title }} <i v-if="menuItem.hasChild" class="right fas fa-angle-left"></i></p>
            </nuxt-link>
            <ul v-if="menuItem.hasChild" class="nav nav-treeview">
              <li class="nav-item" v-for="childMenuItem in menuItem.childs">
                <nuxt-link :to="childMenuItem.routeTo" class="nav-link" :class="{ active: childMenuItem.active }">
                  <i class="far fa-circle nav-icon"></i>
                  <p>{{ childMenuItem.title }}</p>
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
  import mainMenuConfig from '@/config/main_menu';

  export default {
    name: 'mainSidebar',

    computed: {
      activedMenu () {
        return this.$store.state.activedMenu;
      },

      mainMenu () {
        return mainMenuConfig.map(menuItem => {
          let isOpen;
          let childs = menuItem.childs.map(childMenuItem => {
            let active = this.activedMenu.indexOf(childMenuItem.id) > -1;
            if (active) {
              isOpen = true;
            }

            return {
              ...childMenuItem,
              active: active,
            }
          });

          return {
            ...menuItem,
            isOpen: isOpen,
            childs: childs,
            active: this.activedMenu.indexOf(menuItem.id) > -1,
            hasChild: menuItem.childs && menuItem.childs.length > 0
          }
        });
      },

      username () {
        return this.$store.state.auth.user.name;
      }
    }
  }
</script>
