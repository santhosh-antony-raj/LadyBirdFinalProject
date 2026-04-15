import { mount } from '@vue/test-utils';
import CoachList from '../../src/pages/coach/CoachList.vue';

describe('CoachList.vue', () => {
  //Computed property
  it('filteredCoach', () => {
    //setup fakeCoaches
    const fakeCoaches = [
      { id: 'c1', name: 'alice', areas: 'frontend' },
      { id: 'c2', name: 'bob', areas: 'backend' },
    ];

    //fake mock
    const wrapper = mount(CoachList, {
      global: {
        //stubs to omit
        stubs: ['router-link', 'the-pagination', 'coach-item'],
        mocks: {
          $store: {
            getters: {
              'coachMod/coaches': fakeCoaches,
            },
          },
          $route: {
            params: {
              filter: 'frontend',
            },
          },
        },
      },
    });
    //assertions
    expect(wrapper.vm.filteredCoaches).toHaveLength(1);
    expect(wrapper.vm.filteredCoaches[0].name).toBe('alice');
  });
  it('paginatedCaoch', () => {
    const fakeCoaches = [
      { id: '1', areas: ['all'] },
      { id: '2', areas: ['all'] },
      { id: '3', areas: ['all'] },
      { id: '4', areas: ['all'] },
      { id: '5', areas: ['all'] },
      { id: '6', areas: ['all'] },
    ];
    const wrapper = mount(CoachList, {
      global: {
        stubs: ['router-link'],
        mocks: {
          $route: { params: { filter: 'all' } },
          $store: {
            getters: {
              'coachMod/coaches': fakeCoaches,
            },
          },
        },
      },
    });
    //checktotal pages  6 / 5 = 1.2 ceil 2.
    expect(wrapper.vm.totalPages).toBe(2);
    //slice paginated coach
    wrapper.vm.currentPage = 2;

    //page 2 should have one remaining coach and it to be (6th one)
    expect(wrapper.vm.paginatedCoaches).toHaveLength(1);
    expect(wrapper.vm.paginatedCoaches[0].id).toBe('6');
  });
  //methods
  it('NextPrevGoto pages', async () => {
    const fakeCoaches = new Array(6).fill({ id: 'c1', areas: 'all' });
    const wrapper = mount(CoachList, {
      global: {
        stubs: ['router-link'],
        mocks: {
          $route: { params: { filter: 'all' } },
          $store: { getters: { 'coachMod/coaches': fakeCoaches } },
        },
      },
    });
    //set page value current page first
    wrapper.vm.currentPage = 1;

    //create pagination comp
    const pagination = wrapper.findComponent({ name: 'ThePagination' });
    await pagination.vm.$emit('nextPage');

    //check are we now in 2 page
    expect(wrapper.vm.currentPage).toBe(2);

    /* await pagination.vm.$emit('prevPage'); */
    wrapper.vm.previousPage();

    //check are we know in page 1
    expect(wrapper.vm.currentPage).toBe(1);

    //test goto page
    await pagination.vm.$emit('goTo', 2);

    expect(wrapper.vm.currentPage).toBe(2);
  });
  it('delete a coach when confirm', async () => {
    const dispatchdata = jest.fn();
    //modal mock
    const showMock = jest.fn();
    const hideMock = jest.fn();
    window.bootstrap = {
      // 1. This handles "new window.bootstrap.Modal()"
      Modal: jest.fn().mockImplementation(() => ({
        show: showMock,
        hide: hideMock,
      })),
    };

    // 2. This is the fix! getInstance must be a property of Modal
    window.bootstrap.Modal.getInstance = jest.fn().mockImplementation(() => ({
      hide: hideMock,
    }));
    const wrapper = mount(CoachList, {
      global: {
        stubs: ['router-link', 'the-pagination', 'coach-item'],
        mocks: {
          $route: { params: { filter: 'all' } },
          $store: {
            getters: { 'coachMod/coaches': [{ id: 'c1', filter: 'all' }] },
            dispatch: dispatchdata,
          },
        },
      },
    });
    wrapper.vm.handleDelete('c1');
    //confirm delete
    await wrapper.find('[data-test="delete-btn"]').trigger('click');
    expect(dispatchdata).toHaveBeenCalledWith('coachMod/deleteCoach', 'c1');
  });
  it('update coach validation check', () => {
    const showMock = jest.fn();
    const hideMock = jest.fn();
    const dispatchMock = jest.fn();
    window.bootstrap = {
      Modal: jest.fn().mockImplementation(() => ({
        show: showMock,
        hide: hideMock,
      })),
    };
    window.bootstrap.Modal.getInstance = jest.fn().mockImplementation(() => ({
      hide: hideMock,
    }));
    const wrapper = mount(CoachList, {
      global: {
        stubs: ['router-link', 'the-pagination', 'coach-item'],
        mocks: {
          $route: { params: { filter: 'all' } },
          $store: { getters: { 'coachMod/coaches': [{ id: 'c1', areas: 'all' }] }, dispatch: dispatchMock },
        },
      },
    });

    const coachData = { id: 'c1', firsName: 'Alice', lastName: 'smith', hourlRate: 130, description: 'oldDescription', areas: ['frontend'] };
    wrapper.vm.openEditModal(coachData);
    //make any one value empty
    wrapper.vm.editForm.firstName.value = '';
    //asserts check dispatch not have been called
    wrapper.vm.saveEdit();
    expect(dispatchMock).not.toHaveBeenCalled();

    //asserts check particualr value is valid
    expect(wrapper.vm.editForm.firstName.isValid).toBe(false);
  });
  it('update coach modal', () => {
    const showDispatch = jest.fn();
    const showMock = jest.fn();
    const hideMock = jest.fn();

    window.bootstrap = {
      Modal: jest.fn().mockImplementation(() => ({
        show: showMock,
        hide: hideMock,
      })),
    };
    window.bootstrap.Modal.getInstance = jest.fn().mockImplementation(() => ({
      hide: hideMock,
    }));

    const wrapper = mount(CoachList, {
      global: {
        stubs: ['router-link', 'the-pagination'],
        mocks: {
          $route: { params: { filter: 'all' } },
          $store: { getters: { 'coachMod/coaches': [{ id: 'c1', areas: 'all' }] }, dispatch: showDispatch },
        },
      },
    });
    const coachData = { id: 'c1', firstName: 'alice', lastName: 'smith', hourlyRate: 130, areas: ['frontend'], description: 'old description' };

    wrapper.vm.openEditModal(coachData);
    wrapper.vm.editForm.hourlyRate.value = 50;
    wrapper.vm.editForm.description.value = 'new description';
    wrapper.vm.saveEdit();
    //asserts
    expect(showMock).toHaveBeenCalled();
    expect(showDispatch).toHaveBeenCalledWith('coachMod/updateCoach', expect.any(Object));
  });
  it('filteredCoaches returns empty array when no filter param', () => {
    const wrapper = mount(CoachList, {
      global: {
        stubs: ['router-link', 'the-pagination', 'coach-item'],
        mocks: {
          $route: { params: {} },
          $store: {
            getters: {
              'coachMod/coaches': [{ id: 'c1', areas: ['frontend'] }],
            },
          },
        },
      },
    });
    expect(wrapper.vm.filteredCoaches).toHaveLength(0);
  });
});
