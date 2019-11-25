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
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/Header';
export default {
  components: {
    Header
  },
  data() {
    return {
      scroll: 0
    };
  },
  destroyed() {
    // to unbinding scrolling state
    if (process.browser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  mounted() {
    // for check scrolling state
    if (process.browser) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll() {
      this.scroll = window.scrollY;
    }
  }
};
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
