import { mount, RouterLinkStub } from '@vue/test-utils';
import Sidebar from '../../src/components/layout/TheSidebar.vue';

describe('Sidebar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Sidebar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  });

  test('renders all navigation links', () => {
    const links = wrapper.findAll('a[href], a'); // find all anchor tags rendered by the stub
    expect(links.length).toBe(5);
  });

  test('has correct routes', () => {
    const links = wrapper.findAllComponents(RouterLinkStub);

    expect(links[0].props('to')).toBe('/home');
    expect(links[1].props('to')).toBe('/home');
    expect(links[2].props('to')).toBe('/coachRegister');
    expect(links[3].props('to')).toBe('/coachMsg');
    expect(links[4].props('to')).toBe('/aboutus');
  });
});
