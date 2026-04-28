import { mount } from '@vue/test-utils';
import CoachMessages from '@/pages/contact/CoachMessages.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
}));
jest.mock('vuex', () => ({
  useStore: jest.fn(),
}));
describe('CoachMessages.vue', () => {
  test('renders correctly with store and route data', async () => {
    const mockDispatch = jest.fn();
    useRoute.mockReturnValue({
      params: {
        filter: 'all',
        id: 'c1',
      },
      name: 'coach-detail',
    });
    useStore.mockReturnValue({
      getters: {
        'contactMod/getMsg': [{ id: 'm1', msg: 'Hello Jest!', email: 'test@example.com' }],
      },
      dispatch: mockDispatch,
    });

    const wrapper = mount(CoachMessages, {
      global: {
        // This solves the "Failed to resolve component: router-link" warning
        stubs: ['router-link', 'router-view'],
      },
    });

    expect(wrapper.exists()).toBe(true);
    // await wrapper.vm.msgDelete('m1');
    const delbtn = wrapper.find('.del');
    await delbtn.trigger('click');
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith('contactMod/delMsg', 'm1');
    // expect(wrapper.vm.$store.getters['contactMod/getMsg']).toContainEqual({ id: 'm1', message: 'Hello Jest!' });
    expect(wrapper.text()).toContain('Hello Jest!');
  });
});
