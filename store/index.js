import moment from 'moment';

// =================================================
// State
// =================================================
export const state = () => {
  const date = moment()
    .subtract(1, 'M') // use for back 1 mounth from now (current date)
    .format('YYYY-MM-DD'); // formate to Github API allowed date

  const initState = {
    // how much repos in page
    filterDate: date, // for make new filters
    currentFitchedDate: null, // for remeber when paginate fetches
    pageSize: 15, // repositories chunks
    currentPage: 0, // current page of data
    totalResults: 0, // total result of repos
    repos: [], // repositories list
    error: null // error object for know problem happend when getted a data
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
  },
  IS_ALL_GETTED: (state) => state.repos.length >= state.totalResults,
  GET_ERROR: (state) => state.error
};

// =================================================
// Mutations
// =================================================
export const mutations = {
  SET_REPOS: (state, repos) => {
    // set new array of repos repos
    state.repos = [...repos];
    state.currentPage = 1;
    state.currentFitchedDate = state.filterDate;
  },
  SET_TOTAL: (state, total) => {
    state.totalResults = total;
  },
  ADD_REPOS: (state, repos) => {
    state.repos = state.repos.concat(repos);
    state.currentPage++;
    state.currentFitchedDate = state.filterDate;
  },
  SET_DATE: (state, date) => {
    const mdate = moment(date);
    if (mdate.isValid()) {
      state.filterDate = mdate.format('YYYY-MM-DD');
    } else {
      // throw error if we have error handler
    }
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  }
};

// =================================================
// Actions
// =================================================
export const actions = {
  async FETCH_REPOS({ commit, state }) {
    const date = state.filterDate;
    const oldDate = state.currentFitchedDate;
    if (date === oldDate) {
      // this mean we need to load next page
      // loading
      const page = state.currentPage + 1;
      try {
        const apiData = await import('@/assets/api' + page + '.json');
        commit('ADD_REPOS', apiData.items);
      } catch (error) {
        commit('SET_ERROR', error);
      }
      console.log('Add with new page %s in %d', page, date);
    } else {
      // this mean we have to get new data
      // loading
      const apiData = await import('@/assets/api.json');
      commit('SET_TOTAL', apiData.total_count);
      commit('SET_REPOS', apiData.items); /* new Data fitched */
      console.log('Add with new date %s', date);
    }
    // if (page) console.log('Fetch data based to %s & %s', page, date);
    // commit('SET_REPOS', apiData.items); // append fitched pages to repos
  }
};
