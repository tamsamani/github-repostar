<template>
  <div class="repo-card">
    <div class="mr-8">
      <a :href="owner.html_url" target="_blank">
        <img
          :src="owner.avatar_url"
          class="w-48 h-auto rounded-lg shadow-md bg-white p-1"
          title="Avatar image"
        />
      </a>
    </div>
    <div class="text-left flex-1 flex flex-col">
      <div class="flex justify-between">
        <h3 class="text-lg font-bold">
          <a :href="html_url" target="_blank">{{ name }}</a>
        </h3>
        <div class="text-sm text-gray-700 flex-shrink-0">
          Update: {{ new Date(updated_at).toLocaleDateString() }}
        </div>
      </div>
      <p class="text-base text-gray-800 flex-grow flex-1">{{ description }}</p>
      <div class="flex text-sm justify-end">
        <div>
          submited on {{ new Date(created_at).toLocaleDateString() }} by
          <a
            :href="owner.html_url"
            class="text-bold text-blue-600 hover:text-indigo-700"
            target="_blank"
            >@{{ owner.login }}</a
          >
        </div>
      </div>
      <div class="flex justify-between flex-wrap">
        <div class="flex">
          <div class="font-light mr-4">
            {{ repo.private ? 'private' : 'public' }}
          </div>
          <div class="font-light mr-4">
            {{ license ? license.key : 'None' }}
          </div>
          <div class="font-bold">{{ language }}</div>
        </div>
        <div class="flex justify-end">
          <RepoStates>
            <span slot="left">stars</span>
            <span slot="right">{{ stargazers_count }}</span>
          </RepoStates>
          <RepoStates class="mx-2">
            <span slot="left">forks</span>
            <span slot="right">{{ forks_count }}</span>
          </RepoStates>
          <RepoStates>
            <span slot="left">watchs</span>
            <span slot="right">{{ watchers_count }}</span>
          </RepoStates>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RepoStates from './RepoStates';
export default {
  components: {
    RepoStates
  },
  props: {
    repo: {
      type: Object,
      required: true,
      validator(repo) {
        return repo != null;
      }
    }
  },
  data() {
    const {
      name,
      description,
      owner,
      created_at,
      updated_at,
      html_url,
      language,
      stargazers_count,
      watchers_count,
      forks_count,
      license
    } = this.repo;
    return {
      name,
      description,
      owner,
      created_at,
      updated_at,
      html_url,
      language,
      stargazers_count,
      watchers_count,
      forks_count,
      license
    };
  }
};
</script>

<style lang="postcss">
.repo-card {
  @apply bg-gray-200 rounded shadow my-6 p-6 flex max-w-3xl;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>
