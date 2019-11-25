<template>
  <div class="repo-card p-3 md:p-6">
    <div class="lg:w-48 md:w-32 mr-4 md:mr-8 w-24 flex-none">
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
          <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
        </h3>
        <div class="text-sm text-gray-700 flex-shrink-0 pt-1">
          Update: {{ $moment(repo.updated_at).format('YYYY-MM-DD') }}
        </div>
      </div>
      <div class="text-base text-gray-800 flex-grow flex-1 overflow-hidden">
        <p class="line-clamp-5 text-justify">
          {{ repo.description }}
        </p>
      </div>
      <div class="flex text-sm justify-end">
        <div>
          submited on
          <span class="font-bold">{{
            $moment(repo.created_at).format('YYYY-MM-DD')
          }}</span>
          by
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
          <div class="font-bold">{{ repo.language }}</div>
        </div>
        <div class="flex justify-end">
          <RepoStates>
            <span slot="left">stars</span>
            <span slot="right">{{ repo.stargazers_count }}</span>
          </RepoStates>
          <RepoStates class="mx-2">
            <span slot="left">watchs</span>
            <span slot="right">{{ repo.watchers_count }}</span>
          </RepoStates>
          <RepoStates>
            <span slot="left">forks</span>
            <span slot="right">{{ repo.forks_count }}</span>
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
    const { owner, license } = this.repo;
    return { owner, license };
  }
};
</script>

<style lang="postcss">
.repo-card {
  @apply bg-gray-200 rounded shadow my-3 flex max-w-3xl;
  &:hover {
    @apply bg-gray-300;
  }
}
</style>
