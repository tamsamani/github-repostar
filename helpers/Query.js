/* eslint-disable no-return-await */
// query needs
export default async function fetchQuery({ $axios, date, page }) {
  const params = {
    q: 'created:>' + date,
    sort: 'stars',
    order: 'desc'
  };
  if (page > 1) params.page = page;
  return await $axios.$get('/search/repositories', {
    params,
    headers: { Accept: 'application/vnd.github.mercy-preview+json' }
  });
}
