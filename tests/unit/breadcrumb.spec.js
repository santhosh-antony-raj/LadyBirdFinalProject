import { mount } from '@vue/test-utils';
import BreadCrumb from '../../src/components/layout/BreadCrumb.vue';
import TheHeader from '../../src/components/layout/TheHeader.vue';

describe('Breadcrumb.vue', () => {
  it('computes label correctly when filter is present', () => {
    const wrapper = mount(BreadCrumb, {
      global: {
        stubs: ['router-link'],
        mocks: {
          $route: {
            params: { filter: 'frontend' },
            name: 'someRoute',
          },
        },
      },
    });

    // Access computed property via .vm
    expect(wrapper.vm.label).toBe('Frontend');
    expect(wrapper.find('.current').text()).toBe('Frontend');
  });

  it('computes label as ID when filter is missing but ID is present', () => {
    const wrapper = mount(BreadCrumb, {
      global: {
        stubs: ['router-link'],
        mocks: {
          $route: {
            params: { id: 'c1' }, // No filter here
            name: 'details',
          },
        },
      },
    });

    expect(wrapper.vm.label).toBe('#c1');
  });

  it('computes label as route name when params are empty', () => {
    const wrapper = mount(BreadCrumb, {
      global: {
        stubs: ['router-link'],
        mocks: {
          $route: {
            params: {},
            name: 'Settings',
          },
        },
      },
    });

    expect(wrapper.vm.label).toBe('Settings');
  });
});

describe('The Header.vue', () => {
  it('loogedUEmail', async () => {
    const showDispatch = jest.fn();
    const wrapper = mount(TheHeader, {
      global: {
        mocks: {
          $store: { getters: { 'userAuthMod/userEmail': 'sam@gmail.com' }, dispatch: showDispatch },
        },
      },
    });
    expect(wrapper.vm.loggedUEmail).toBe('sam@gmail.com');
    wrapper.vm.autoLog();
    expect(showDispatch).toHaveBeenCalled();
    expect(showDispatch).toHaveBeenCalledWith('userAuthMod/autoLogout');
  });
});
