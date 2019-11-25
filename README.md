# github-repostar

> Repostar small Web App that will list the most starred [Github] repositories created after selected Date.

[github]: https://github.com/

## Features

There some feature adds in this :

- Responsive Cards & detailed for each repository.
- Infinity Scrolling with separated fetched data features (conserve data usage).
- Back to Top page when going down deeper.
- Date Picker for fetch repositories based to date.


Date picker used for date input because it's beautiful, responsive & easy to use with no conflictions or complex usage.

Infinite Loading stay in the bottom of Page, & because we split our fetched data to many chunks (called pages inside code) we only getting this chunk,
this will help prevent a lot of usages. & better for UX also.

Back to Top is helpfull as UX, it's fire when reaching 2000px deeper than the top of the page.

The Repository card will become responsive to mobile.
> please keep in mind use the mobile view of the desktop browser may change than the actual view.

## Dependencies

There some dependencies/package installed to preventing the remake cycle.

| name                        | version | details                         |
| --------------------------- | ------: | :------------------------------ |
| nuxt                        |  ^2.0.0 | Based Framework                 |
| axios                       | ^0.19.0 | fetch data                      |
| @nuxtjs/axios               |  ^5.3.6 | Fetched data                    |
| @nuxtjs/moment              |  ^1.4.0 | Format & handle date            |
| @mathieustan/vue-datepicker |  ^0.2.1 | datepicker                      |
| vue-infinite-loading        |  ^2.4.4 | loading infinity data scrolling |
| vue-scrollto                | ^2.17.1 | back to top                     |

& those core dev-dependencies packages used to augment the quality of the app.

| name                | version | details                                      |
| ------------------- | ------: | :------------------------------------------- |
| @nuxtjs/tailwindcss |  ^1.0.0 | highly customizable, low-level CSS framework |
| node-sass           | ^4.13.0 | SCSS for CSS Preporcessor                    |
| sass-loader         |  ^8.0.0 | Loading SCSS/SASS Files                      |

& those uses for make ESLint CodeStyle & Formatting Unified between editors.

| name                   | version | details                                       |
| ---------------------- | ------: | :-------------------------------------------- |
| prettier               | ^1.16.4 | Fomate Code based to Nuxt Structor Philosophy |
| eslint                 |  ^6.1.0 | Check Safe Code Writing                       |
| babel-eslint           | ^10.0.1 |                                               |
| eslint-config-prettier |  ^4.1.0 |                                               |
| eslint-plugin-nuxt     | >=0.4.2 |                                               |
| eslint-plugin-prettier |  ^3.0.1 |                                               |
| @nuxtjs/eslint-module  | ^1.0.0" |
| @nuxtjs/eslint-config  |  ^1.0.1 |

& those for Unit Test.

| name            |        version | details                         |
| --------------- | -------------: | :------------------------------ |
| jest            |        ^24.1.0 | Unit Test                       |
| @vue/test-utils | ^1.0.0-beta.27 | Nuxt Framework Test Integration |
| babel-jest      |        ^24.1.0 | Webpack support                 |
| vue-jest        |       ^4.0.0-0 | Vue test Support                |

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# testing build
$ yarn test
```

For detailed explanation on how things work, check out those sites :

- [Nuxt.js docs](https://nuxtjs.org)
- [Tailwindcss](https://tailwindcss.com)
- [Axios Docs](https://github.com/axios/axios)
- [Github Search API](https://developer.github.com/v3/search/)
