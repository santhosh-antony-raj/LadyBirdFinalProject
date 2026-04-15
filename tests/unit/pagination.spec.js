import { mount } from '@vue/test-utils';
import ThePagination from '../../src/components/ThePagination.vue';

describe('thepagination.vue', () => {
  it('testcaseforall', async () => {
    const wrapper = mount(ThePagination, {
      props: { currentPage: 1, totalPages: 2 },
    });
    expect(wrapper.vm.currentPage).toBe(1);
    expect(wrapper.vm.totalPages).toBe(2);

    await wrapper.find('[data-test="preClick"]').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('prevPage');
    const pages = wrapper.findAll('[data-test="gotoClick"]');
    await pages[0].trigger('click');
    expect(wrapper.emitted()).toHaveProperty('goTo');
    expect(wrapper.emitted().goTo[0]).toEqual([1]);
    await wrapper.find('[data-test="nextClick"]').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('nextPage');
  });
});
