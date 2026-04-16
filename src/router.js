import { createRouter, createWebHashHistory } from 'vue-router';
import CoachFilter from './components/CoachFilter.vue';
import CoachList from './pages/coach/CoachList.vue';
import CoachDetail from './pages/coach/CoachDetail.vue';
import ContactCoach from './pages/contact/ContactCoach.vue';
import CoachMessages from './pages/contact/CoachMessages.vue';
import PageNotFound from './NotFound.vue';
import CoachRegister from './pages/coach/CoachRegister.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import SignUp from './pages/auth/SingUp.vue';
import store from './store/index.js';

import AboutUs from './pages/AboutUs.vue';

const router = createRouter({
  history: createWebHashHistory('/LadyBirdFinalProject/'),

  routes: [
    { path: '/', redirect: { name: 'login' } },

    {
      name: 'home',
      path: '/home',
      component: CoachFilter,
      meta: { requiresAuth: true },
    },
    {
      name: 'coachList',
      path: '/home/filter/:filter?',
      component: CoachList,
      meta: { requiresAuth: true },
    },
    {
      path: '/coachdetail/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach, name: 'contact' }],
      meta: { requiresAuth: true },
    },
    {
      name: 'coachMsg',
      path: '/coachMsg',
      component: CoachMessages,
      meta: { requiresAuth: true },
    },
    {
      name: 'coachRegister',
      path: '/coachRegister',
      component: CoachRegister,
      meta: { requiresAuth: true },
    },

    { name: 'aboutUs', path: '/aboutus', component: AboutUs, meta: { requiresAuth: true } },

    {
      name: 'login',
      path: '/login',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      name: 'signup',
      path: '/signup',
      component: SignUp,
      meta: { requiresUnauth: true },
    },
    { name: 'urlNotFound', path: '/:notFound(.)*', component: PageNotFound },
  ],
  linkActiveClass: '',
  linkExactActiveClass: 'active',
});
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters['userAuthMod/authenticate']) {
    next({ name: 'login' });
  } else if (to.meta.requiresUnauth && store.getters['userAuthMod/authenticate']) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
