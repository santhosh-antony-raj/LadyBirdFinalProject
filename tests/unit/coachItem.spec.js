import { mount } from '@vue/test-utils';
import CoachItem from '../../src/components/CoachItem.vue';

describe('coachitem.vue', () => {
  it('testcase gor coachitem', async () => {
    const wrapper = mount(CoachItem, {
      props: { id: 'c1', index: '1', firstName: 'gold', lastName: 'smith', areas: ['frontend'], description: 'desc' },
      global: {
        stubs: ['router-link'],
      },
    });
    expect(wrapper.vm.badgeColor('frontend')).toBe('warning');
    expect(wrapper.vm.badgeColor('unknown')).toBe('secondary');

    expect(wrapper.vm.fullName).toBe('gold smith');

    await wrapper.find('[data-test="onEdit"]').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('edit');
    expect(wrapper.emitted().edit[0][0]).toEqual(expect.objectContaining({ id: 'c1', firstName: 'gold' }));

    await wrapper.find('[data-test="delEmit"]').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('delete');
    expect(wrapper.emitted().delete[0]).toEqual(['c1']);
  });
});
