import tagApi from '@/api/blog/tag';

const state = function () {
  return {
    list: [],
    isFetching: false,
  }
}

const getters = {
  isFetching (state) {
    return state.isFetching;
  }
}

const mutations = {
  setList (state, payload) {
    state.list = payload;
  },

  pushList (state, payload) {
    state.list.push(payload);
  },

  deleteListItem (state, tagId) {
    state.list = state.list.filter(tag => tag.id != tagId);
  },

  setIsFetching (state, status) {
    state.isFetching = status;
  },

  clear (state) {
    state.list = [];
  }
}

const actions = {
  fetch ({ commit }) {
    commit('setIsFetching', true);
    let request = tagApi.getList();

    request
      .then(({ data: response }) => {
        commit('setList', response.data.tags);
      })
      .finally(() => {
        commit('setIsFetching', false);
      });

    return request;
  },

  create ({ commit }, payload) {
    let request = tagApi.create(payload);

    request.then(({ data: response }) => {
      if (!response.error) {
        commit('pushList', response.data.tag);
      }
    });

    return request;
  },

  delete ({ commit }, tagId) {
    let request = tagApi.delete(tagId);

    request.then(({ data: response }) => {
      if (!response.error) {
        commit('deleteListItem', tagId);
      }
    });

    return request;
  },

  clear ({ commit }) {
    commit('clear');
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
