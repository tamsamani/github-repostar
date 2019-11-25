/* eslint-disable no-return-await */
import axios from 'axios';
// query needs
export default async function fetchQuery(date, page) {
  const params = {
    q: 'created:>' + date,
    sort: 'stars',
    order: 'desc'
  };
  if (page > 1) params.page = page;
  return await axios.get('https://api.github.com/search/repositories', {
    params,
    headers: { Accept: 'application/vnd.github.mercy-preview+json' }
  });
}
