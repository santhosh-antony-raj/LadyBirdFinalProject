import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      // tokenExpiration:null we using local storage,
      autoLogoutValue: false,
      email: null,
    };
  },
  actions,
  mutations,
  getters,
};
