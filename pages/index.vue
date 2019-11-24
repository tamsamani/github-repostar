<template>
  <div class="container">
    <div v-if="!loading">Loading...</div>
    <div v-else class="p-4 md:p-0">
      <template v-for="(repo, key) in apiData">
        <RepoCard :key="key" :repo="repo" />
      </template>
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
