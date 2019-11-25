<template>
  <div>
    <Header id="page-top"></Header>
    <div class="fixed bottom-0 right-0 p-4">
      <div
        v-scroll-to="'#page-top'"
        v-show="scroll > 2000"
        class="cursor-pointer px-2 py-1 select-none font-bold border-gray-500 rounded bg-green-700 text-gray-100 transition"
      >
        Scroll Top
      </div>
    </div>
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
        <no-ssr>
          <infinite-loading @infinite="infiniteHandler">
            <div slot="no-more">You Have reach all repos in this period.</div>
          </infinite-loading>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RepoCard from '~/components/RepoCard';
import Header from '~/components/Header';

export default {
  components: {
    RepoCard,
    Header
  },

  data() {
    return {
      scroll: 0,
      loading: false,
      pages: 0,
      apiData: []
    };
  },

  computed: {
    ...mapGetters({
      getPage: 'GET_PAGE'
    })
  },

  async fetch({ store, params }) {
    await store.dispatch('FETCH_REPOS');
  },
  updated() {
    console.log('Update', this.pages, this.apiData);
  },
  destroyed() {
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  mounted() {
    const page = this.getPage(0);
    if (page) {
      this.pages = 1;
      this.loading = true;
      this.apiData = page;
    }
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      this.scroll = window.scrollY;
    },
    loadMore($state) {
      // load more pages
      const page = this.getPage(this.pages);
      if (page) {
        this.apiData = this.apiData.concat(page);

        this.pages++;
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
