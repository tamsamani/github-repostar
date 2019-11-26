<template>
  <header class="bg-purple-600 text-red-100">
    <div class="navbar">
      <div class="text-lg font-bold">
        Github Repostar
      </div>
      <div>
        <slot />
        <VueDatePicker
          v-model="date"
          :validate="true"
          :max-date="new Date()"
          @onChange="setdate"
          format="YYYY-MM-DD"
          button-validate="Ok"
          button-cancel="Cancel"
          color="#EF4114"
          origin="-50px 0px"
        >
          <template #activator>
            <div class="font-bold flex items-center text-lg">
              <mdi-calendar-arrow-right width="20" />
              <span class="ml-1">{{ date }}</span>
            </div>
          </template>
        </VueDatePicker>
      </div>
    </div>
  </header>
</template>

<script>
import mdiCalendarArrowRight from 'mdi-vue/CalendarArrowRight';
export default {
  components: {
    mdiCalendarArrowRight
  },
  data() {
    return {
      date: this.$store.state.filterDate
    };
  },
  methods: {
    setdate() {
      // handle date and re fetching data based to this
      this.$store.commit('SET_DATE', this.date);
      this.$store.dispatch('FETCH_REPOS');
    }
  }
};
</script>

<style lang="postcss">
.navbar {
  @apply w-full flex justify-between max-w-3xl mx-auto items-center py-1 px-2;
}
.menu__content {
  @apply -ml-4;
}
</style>
