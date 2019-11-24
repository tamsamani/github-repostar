module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'eslint-config-prettier'
  ],
  plugins: ['prettier'],

  rules: {
    // make it off beacause api comes with "_" in some cases
    camelcase: 'off'
  }
};
