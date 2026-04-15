import { createStore } from 'vuex';
import coaches from './modules/coach/index.js';
import contacts from './modules/contact/index.js';
import UserAuthModule from './modules/auth/index.js';
const store = createStore({
  modules: {
    coachMod: coaches,
    contactMod: contacts,
    userAuthMod: UserAuthModule,
  },
});

export default store;
