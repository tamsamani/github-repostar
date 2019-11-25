import moment from 'moment';
import fetchQuery from '~/helpers/Query';

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
  GET_CURRENT_DATE: (state) => state.currentFitchedDate,
  GET_FILTER_DATE: (state) => state.filterDate,
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
        // const apiData = await import('@/assets/api' + page + '.json');
        const data = (await fetchQuery(date, page)).data;
        commit('ADD_REPOS', data.items);
      } catch (error) {
        commit('SET_ERROR', error);
      }
    } else {
      // this mean we have to get new data
      // loading
      const data = (await fetchQuery(date, 0)).data;
      commit('SET_TOTAL', data.total_count);
      commit('SET_REPOS', data.items); /* new Data fitched */
    }
  }
};
