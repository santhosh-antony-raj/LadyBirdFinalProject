import { mount } from '@vue/test-utils';
import UserAuth from '../../src/pages/auth/UserAuth.vue'; // adjust path

describe('Login.vue', () => {
  let wrapper;

  const mockRouter = {
    replace: jest.fn(),
  };

  const mockRoute = {
    query: {},
  };

  const mockStore = {
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    // Mock bootstrap Toast
    window.bootstrap = {
      Toast: jest.fn().mockImplementation(() => ({
        show: jest.fn(),
      })),
    };

    wrapper = mount(UserAuth, {
      global: {
        mocks: {
          $store: mockStore,
          $router: mockRouter,
          $route: mockRoute,
        },
      },
      stubs: { 'router-link': true },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Component renders
  test('renders login form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  // 2. Email input update
  test('updates email input', async () => {
    const input = wrapper.find('input[type="email"]');
    await input.setValue('test@mail.com');

    expect(wrapper.vm.email.value).toBe('test@mail.com');
  });

  // 3. Password toggle
  test('toggles password visibility', async () => {
    expect(wrapper.vm.showPassword).toBe(false);

    await wrapper.vm.togglePassword();

    expect(wrapper.vm.showPassword).toBe(true);
  });

  // 4. Invalid form (empty)
  test('shows validation error for empty fields', async () => {
    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.email.isValid).toBe(false);
    expect(wrapper.vm.password.isValid).toBe(false);
  });

  // 5. Invalid email
  test('invalid email format', async () => {
    wrapper.vm.email.value = 'invalidemail';
    wrapper.vm.password.value = '123456';

    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.email.isValid).toBe(false);
  });

  // 6. Password less than 6 chars
  test('invalid password length', async () => {
    wrapper.vm.email.value = 'test@mail.com';
    wrapper.vm.password.value = '123';

    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.password.isValid).toBe(false);
  });

  // 7. Successful login
  test('dispatches login and redirects on success', async () => {
    mockStore.dispatch.mockResolvedValue();

    wrapper.vm.email.value = 'test@mail.com';
    wrapper.vm.password.value = '123456';

    jest.useFakeTimers();
    await wrapper.vm.onSubmitData();
    jest.runAllTimers();

    expect(mockRouter.replace).toHaveBeenCalled();

    expect(mockStore.dispatch).toHaveBeenCalledWith('userAuthMod/login', {
      email: 'test@mail.com',
      password: '123456',
    });

    expect(wrapper.vm.isLoading).toBe(false);
  });

  // 8. Failed login
  test('handles login failure', async () => {
    mockStore.dispatch.mockRejectedValue(new Error('login failed'));

    wrapper.vm.email.value = 'test@mail.com';
    wrapper.vm.password.value = '123456';

    await wrapper.vm.onSubmitData();

    expect(wrapper.vm.error).toBe('login failed');
    expect(wrapper.vm.isLoading).toBe(false);
  });

  // 9. clearValidity method
  test('clearValidity resets field state', () => {
    wrapper.vm.email.isValid = false;

    wrapper.vm.clearValdity('email');

    expect(wrapper.vm.email.isValid).toBe(true);
  });
});
