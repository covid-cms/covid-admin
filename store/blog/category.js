import categoryApi from '@/api/blog/category';

const state = function () {
  return {
    list: [],
    isFetching: false,
  }
}

const getters = {
  getRecursiveList (state) {
    let list = state.list;
    let recursiveList = [];

    for (let category of list) {
      if (category.parent_id == 0) {
        recursiveList.push(category);
        let childs = list
          .filter(childCategory => childCategory.parent_id == category.id)
          .map(childCategory => {
            return {
              ...childCategory,
              title: "— " + childCategory.title,
            }
          })
        recursiveList = recursiveList.concat(childs);
      }
    }

    return recursiveList;
  },

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

  deleteListItem (state, categoryId) {
    state.list = state.list.filter(category => category.id != categoryId);
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
    let request = categoryApi.getList();

    request
      .then(({ data: response }) => {
        commit('setList', response.data.categories);
      })
      .finally(() => {
        commit('setIsFetching', false);
      });

    return request;
  },

  create ({ commit }, payload) {
    let request = categoryApi.create(payload);

    request.then(({ data: response }) => {
      if (!response.error) {
        commit('pushList', response.data.category);
      }
    });

    return request;
  },

  delete ({ commit }, categoryId) {
    let request = categoryApi.delete(categoryId);

    request.then(({ data: response }) => {
      if (!response.error) {
        commit('deleteListItem', categoryId);
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
