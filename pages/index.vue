<template>
  <div class="page container">
    <div v-if="!loading">Loading...</div>
    <div v-else class="w-full">
      <div
        v-for="(repo, key) in apiData"
        :key="key"
        class="flex overflow-auto px-3 md:block"
      >
        <RepoCard :repo="repo" class="md:mx-auto md:w-full" />
        <div class="pr-3 md:pr-0"></div>
      </div>
      <client-only>
        <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
          <div slot="no-more" class="font-bold py-4 px-2 text-gray-600">
            You Have reach all repos in this period.
          </div>
        </infinite-loading>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RepoCard from '~/components/RepoCard';

export default {
  components: {
    RepoCard
  },

  data() {
    return {
      loading: false,
      pages: 0,
      apiData: []
    };
  },

  computed: {
    ...mapGetters({
      filterDate: 'GET_FILTER_DATE',
      currentDate: 'GET_CURRENT_DATE',
      getPage: 'GET_PAGE',
      gettedAll: 'IS_ALL_GETTED',
      stateError: 'GET_ERROR'
    })
  },

  watch: {
    // watch for currentpage if updated
    filterDate() {
      this.loading = false;
    },
    currentDate(oldValue, newValue) {
      setTimeout(() => this.resetPage(), 100);
    }
  },

  async fetch({ store, params }) {
    await store.dispatch('FETCH_REPOS');
  },
  updated() {
    // console.log('Update', this.pages, this.apiData);
  },

  mounted() {
    this.resetPage();
  },
  methods: {
    resetPage() {
      const page = this.getPage(0);
      if (page) {
        this.pages = 1;
        this.loading = true;
        this.apiData = page;
      }
    },
    async loadMore($state) {
      // load more pages
      const page = this.getPage(this.pages);
      if (page) {
        this.apiData = this.apiData.concat(page);
        this.pages++;
        $state.loaded();
      } else if (!this.stateError && !this.gettedAll) {
        await this.$store.dispatch('FETCH_REPOS');
        this.loading = true;
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    infiniteHandler($state) {
      setTimeout(() => {
        this.loadMore($state);
      }, 1000);
      // $state.complete();
    }
  }
};
</script>

<style lang="postcss">
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  @apply font-light text-4xl text-gray-700 pb-4;
  word-spacing: 5px;
}

.links {
  @apply pt-4;
}
</style>
