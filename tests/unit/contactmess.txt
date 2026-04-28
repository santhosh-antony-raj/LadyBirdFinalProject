import { mount } from '@vue/test-utils';
import CoachMessages from '@/pages/contact/CoachMessages.vue';

describe('CoachMessages.vue', () => {
  test('renders correctly with store and route data', async () => {
    const mockDispatch = jest.fn();
    const wrapper = mount(CoachMessages, {
      global: {
        // This solves the "Failed to resolve component: router-link" warning
        stubs: ['router-link', 'router-view'],

        mocks: {
          // 1. Mock the Store (from your previous error)
          $store: {
            getters: {
              'contactMod/getMsg': [{ id: 'm1', message: 'Hello Jest!' }],
            },
            dispatch: mockDispatch,
          },
          // 2. Mock the Route (solves the "reading params" error)
          $route: {
            params: {
              filter: 'all',
              id: 'c1',
            },
            name: 'coach-detail',
          },
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    await wrapper.vm.msgDelete('m1');
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith('contactMod/delMsg', 'm1');
    expect(wrapper.vm.$store.getters['contactMod/getMsg']).toContainEqual({ id: 'm1', message: 'Hello Jest!' });
  });
});
