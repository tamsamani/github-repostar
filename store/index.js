// import Vue from 'vue';

// =================================================
// State
// =================================================
export const state = () => {
  const initState = {
    // how much repos in page
    pageSize: 15,
    gitRequestSize: 100,
    repos: []
  };

  return initState;
};

// =================================================
// Getters
// =================================================
export const getters = {
  pages: (state) => Math.ceil(state.repos.length / state.pageSize),
  GET_PAGE: (state) => (page) => {
    const pages = getters.pages(state);
    if (page < pages) {
      return state.repos.slice(15 * page, 15 * (page + 1));
    } else return null;
  }
};

// =================================================
// Mutations
// =================================================
export const mutations = {
  SET_REPOS: (state, repos) => {
    // set new array of repos repos
    console.log('set repos', repos.length);
    state.repos = [...state.repos, ...repos];
  }
};

// =================================================
// Actions
// =================================================
export const actions = {
  async FETCH_REPOS({ commit, state }) {
    const apiData = await import('@/assets/api.json');
    commit('SET_REPOS', apiData.items); // append fitched pages to repos
  }
};
