import { mount } from '@vue/test-utils';
import API from '@/assets/api.json';
import RepoCard from '@/components/RepoCard.vue';

// test for repo has data work as expected
describe('Repo Card', () => {
  test('Rendering Correct with data', () => {
    const wrapper = mount(RepoCard, { propsData: { repo: API.items[0] } });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
