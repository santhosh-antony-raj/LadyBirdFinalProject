<template>
  <div class="app-wrapper">
    <template v-if="!isAuthPage">
      <!-- The Header -->
      <the-header></the-header>
      <!-- The Side Bar -->
      <the-sidebar></the-sidebar>
    </template>

    <!-- Main Content -->
    <div class="app-main">
      <transition name="route" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>

    <!-- The Footer -->
    <template v-if="!isAuthPage">
      <the-footer></the-footer>
    </template>
  </div>
</template>
<script>
import TheFooter from './components/layout/TheFooter.vue';
import TheHeader from './components/layout/TheHeader.vue';
import TheSidebar from './components/layout/TheSidebar.vue';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
  },
  // App.vue
  setup() {
    const route = useRoute();
    const store = useStore();
    //Check is login or signup to hide header,sidebar,footer
    const isAuthPage = computed(() => {
      return ['login', 'signup'].includes(route.name);
    });
    //helps to maintain  local session while refresh
    onMounted(() => {
      store.dispatch('userAuthMod/tryLogin'); // ← restore token on refresh
    });
    return {
      isAuthPage,
    };
  },
};
</script>

<style scoped>
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.app-main {
  padding-bottom: 0px !important;
}
</style>
