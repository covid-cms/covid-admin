import createMutationsSharer from 'vuex-shared-mutations'
import createPersistedState from 'vuex-persistedstate'
import initApi from '@/api/init';
import accountApi from '@/api/account';

const STORAGE_KEY = process.env.STORAGE_KEY;

const state = function () {
  return {
    activedMenu: ['dashboard'],
    openLogoutModal: false,

    auth: {
      check: false,
      accessToken: '',
      expiresAt: null,
      user: {
        id: '',
        email: '',
        name: ''
      },
    },
  }
}

const getters = {
  getAuthAccessToken (state) {
    return state.auth.accessToken;
  }
}

const mutations = {
  setActivedMenu (state, menuName) {
    state.activedMenu = menuName;
  },

  setOpenLogoutModal (state, status) {
    state.openLogoutModal = !!status;
  },

  setAuthAccessToken (state, token) {
    state.auth.accessToken = token
  },

  setAuthUser (state, user) {
    for (let key in state.auth.user) {
      state.auth.user[key] = user[key]
    }
  },

  setAuthCheck (state, status) {
    state.auth.check = status
  },

  setAuthExpiresAt (state, value) {
    state.auth.expiresAt = value
  },
}

const actions = {
  async init ({ commit }) {
    let { data: response } = await initApi.getInitData();
    if (!response.error) {
      if (response.data.account) {
        commit('setAuthUser', response.data.account);
      }
    }
  },

  updateAccountInfo ({ commit }, payload) {
    let request = accountApi.update(payload);

    request.then(({ data: response }) => {
      if (!response.error) {
        if (response.data.account) {
          commit('setAuthUser', response.data.account);
        }
      }
    });

    return request;
  },

  setActivedMenu ({ commit }, payload) {
    commit('setActivedMenu', payload);
  },

  showLogoutModal ({ commit }) {
    commit('setOpenLogoutModal', true);
  },

  hideLogoutModal ({ commit }) {
    commit('setOpenLogoutModal', false);
  },

  setAuth ({ commit }, data) {
    let { accessToken, refreshToken, expiresAt, user } = data;
    commit('setAuthCheck', true)
    commit('setAuthAccessToken', accessToken)
    commit('setAuthExpiresAt', expiresAt);
    commit('setAuthUser', user);
  },

  logout ({ commit }) {
    commit('setAuthAccessToken', '')
    commit('setAuthUser', { id: '', email: '', name: '' });
    commit('setAuthExpiresAt', null);
    commit('setAuthCheck', false);
  }
}

const plugins = [
  createPersistedState({
    key: STORAGE_KEY,
    paths: [
      'activedMenu',
      'openLogoutModal',
      'auth',
      'auth.check',
      'auth.accessToken',
      'auth.expiresAt',
      'auth.user',
      'auth.user.id',
      'auth.user.email',
      'auth.user.name',
    ],
  }),
  createMutationsSharer({ predicate: [] })
]

export default {
  state,
  getters,
  mutations,
  actions,
  plugins,
}
