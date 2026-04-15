import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
  namespaced: true,
  state() {
    return {
      msg: [
        {
          id: 'c1op',
          coachId: 'jPaXbCJruQax20ynw52kJ51f3Dx2',
          email: 'sunny@gmail.com',
          msg: `Hi Sir,

I hope you are doing well. I wanted to ask you a doubt regarding my frontend learning. Recently, I have been working with Vue (components, router, and state management), and I’m facing some confusion in a few areas.

First, I’m struggling to clearly understand how data flow works between parent and child components, especially when using props and emitting events. Sometimes I get confused about when to use props, when to emit, and when to use a global state like Vuex/Pinia.

Also, I have some difficulty with Vue Router concepts like nested routes and dynamic routing.


`,
        },
      ],
    };
  },
  getters,
  mutations,
  actions,
};
