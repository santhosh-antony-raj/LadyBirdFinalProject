<template>
  <div class="app-wrapper">
    <template v-if="!isAuthPage">
      <!-- The Header -->
      <the-header></the-header>
      <!-- The Side Bar -->
      <the-sidebar></the-sidebar>
    </template>

    <!-- Main Content -->
    <!-- Breadcrumb -->

    <div class="app-main" style="padding-bottom: 0px !important">
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

export default {
  components: {
    TheHeader,
    TheSidebar,
    TheFooter,
  },
  // App.vue

  created() {
    this.$store.dispatch('userAuthMod/tryLogin'); // ← restore token on refresh
  },
  computed: {
    isAuthPage() {
      return ['login', 'signup'].includes(this.$route.name);
    },
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
</style>
