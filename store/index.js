// import Vue from 'vue';

// =================================================
// State
// =================================================
export const state = () => {
  const initState = {
    pages: 0,
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
  GET_PAGE: (state) => (page) => {
    if (page <= state.pages) {
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
    state.repos = [...state.repos, ...repos];
  },
  CALC_PAGES: (state) => {
    // calculate pages based to pageSize
    state.pages = Math.ceil(state.repos.length / state.pageSize);
  }
};

// =================================================
// Actions
// =================================================
export const actions = {
  async FETCH_REPOS({ commit, state }) {
    const apiData = await import('@/assets/api.json');
    commit('SET_REPOS', apiData.items); // append fitched pages to repos
    commit('CALC_PAGES'); // after set new repos we should recalculate number of pages
  }
};
