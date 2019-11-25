<template>
  <div>
    <Header></Header>
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
      loading: false,
      page: 0,
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
    if (this.apiData.length / 15 < this.page) {
      const pages = this.getPage(this.page);
      this.apiData.concat(pages);
    }
  },

  mounted() {
    const pages = this.getPage(this.page);
    if (pages) {
      this.loading = true;
      this.apiData = pages;
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
