import { mount } from '@vue/test-utils';
import Signup from '../../src/pages/auth/SingUp.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  useRoute: jest.fn(),
}));
jest.mock('vuex', () => ({
  useStore: jest.fn(),
}));
describe('Signup.vue', () => {
  let wrapper;
  let mockRouter;
  let mockRoute;
  let mockStore;

  beforeEach(() => {
    mockRouter = { replace: jest.fn() };
    mockRoute = { query: {} };
    mockStore = { dispatch: jest.fn() };

    useRouter.mockReturnValue(mockRouter);
    useRoute.mockReturnValue(mockRoute);
    useStore.mockReturnValue(mockStore);
    // Mock Bootstrap Toast
    window.bootstrap = {
      Toast: jest.fn().mockImplementation(() => ({
        show: jest.fn(),
      })),
    };

    wrapper = mount(Signup, {
      global: {
        stubs: ['router-link', 'base-spinner'],
        mocks: {
          $store: mockStore,
          $router: mockRouter,
          $route: mockRoute,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Renders form
  test('renders signup form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  // 2. Email input update
  test('updates email input', async () => {
    const input = wrapper.find('input[type="email"]');
    await input.setValue('test@mail.com');

    expect(wrapper.vm.email.value).toBe('test@mail.com');
  });

  // 3. Toggle password visibility
  test('toggles password visibility', async () => {
    expect(wrapper.vm.showPassWord).toBe(false);

    await wrapper.vm.togglePassword();

    expect(wrapper.vm.showPassWord).toBe(true);
  });

  // 4. Invalid form (empty)
  test('shows validation errors for empty fields', async () => {
    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.email.isValid).toBe(false);
    expect(wrapper.vm.password.isValid).toBe(false);
  });

  // 5. Invalid email format
  test('invalid email format', async () => {
    wrapper.vm.email.value = 'invalid';
    wrapper.vm.password.value = '123456';

    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.email.isValid).toBe(false);
  });

  // 6. Password too short
  test('invalid password length', async () => {
    wrapper.vm.email.value = 'test@mail.com';
    wrapper.vm.password.value = '123';

    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.password.isValid).toBe(false);
  });

  // 7. Successful signup
  test('dispatches signup and redirects on success', async () => {
    jest.useFakeTimers();

    mockStore.dispatch.mockResolvedValue();

    wrapper.vm.email.value = 'test@mail.com';
    wrapper.vm.password.value = '123456';

    await wrapper.vm.onSubmitData();

    expect(mockStore.dispatch).toHaveBeenCalledWith('userAuthMod/signup', {
      email: 'test@mail.com',
      password: '123456',
    });

    expect(wrapper.vm.isLoading).toBe(false);

    // run setTimeout
    jest.runAllTimers();

    expect(mockRouter.replace).toHaveBeenCalled();
  });

  // 8. Failed signup
  test('handles signup failure', async () => {
    mockStore.dispatch.mockRejectedValue(new Error('Account Exists'));

    wrapper.vm.email.value = 'test@mail.com';
    wrapper.vm.password.value = '123456';

    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.error).toBe('Account Exists');
    expect(wrapper.vm.isLoading).toBe(false);
  });

  // 9. clearValidity method
  test('clearValidity resets field', () => {
    wrapper.vm.email.isValid = false;

    wrapper.vm.clearValidity('email');

    expect(wrapper.vm.email.isValid).toBe(true);
  });

  // 10. DOM error message visibility
  test('shows error message in DOM', async () => {
    await wrapper.vm.onSubmitData();

    const error = wrapper.find('.field-error.visible');
    expect(error.exists()).toBe(true);
  });

  // 11. router-link exists
  test('renders router-link', () => {
    expect(wrapper.findComponent({ name: 'router-link' }).exists()).toBe(true);
  });
});
