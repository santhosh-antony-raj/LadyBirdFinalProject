import { mount } from '@vue/test-utils';
import ContactCoach from '../../src/pages/contact/ContactCoach.vue';

describe('ContactCoach.vue', () => {
  const wrapper = mount(ContactCoach);
  //data
  it('data exist', () => {
    expect(wrapper.vm.email.value).toBe('');
    expect(wrapper.vm.msg.value).toBe('');
    expect(wrapper.vm.isFormValid).toBe(true);
  });
  //methods
  it('test methods saveData', async () => {
    const dispatchspy = jest.fn();

    // 1. Mock the Bootstrap Toast constructor and show method
    const showMock = jest.fn();
    window.bootstrap = {
      Toast: jest.fn().mockImplementation(() => ({
        show: showMock,
      })),
    };

    const wrapper = mount(ContactCoach, {
      // 2. CRITICAL: Attach to document so getElementById works
      attachTo: document.body,
      global: {
        mocks: {
          $store: { dispatch: dispatchspy },
          $route: { params: { id: 'c1' } },
        },
      },
    });

    // 3. Fill values
    await wrapper.find('#email').setValue('sam@gmail.com');
    await wrapper.find('textarea').setValue('hello');
    expect(wrapper.vm.email.value).toBe('sam@gmail.com');
    expect(wrapper.vm.msg.value).toBe('hello');

    // 4. Trigger Submit
    await wrapper.find('[data-test="contactcoach-btn"]').trigger('submit');

    // 5. Assertions
    expect(wrapper.vm.email.isValid).toBe(true);
    expect(wrapper.vm.msg.isValid).toBe(true);
    expect(wrapper.vm.isFormValid).toBe(true);

    expect(dispatchspy).toHaveBeenCalled();
    expect(showMock).toHaveBeenCalled(); // Verifies toast.show() was called
    expect(dispatchspy).toHaveBeenCalledWith('contactMod/addMsg', expect.objectContaining({ coachId: 'c1', email: { isValid: true, value: 'sam@gmail.com' }, msg: { isValid: true, value: 'hello' } })); //expect.any(object);
    // 6. Cleanup
    wrapper.unmount();
  });
  it('test method validateForm', async () => {
    // await wrapper.setData({ isFormValid: true }); //your wish
    await wrapper.find('[data-test="contactcoach-btn"]').trigger('submit');
    expect(wrapper.vm.email.isValid).toBe(false);
    expect(wrapper.vm.msg.isValid).toBe(false);
    expect(wrapper.vm.isFormValid).toBe(false);
  });
});
