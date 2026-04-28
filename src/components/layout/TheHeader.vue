<template>
  <nav class="app-header navbar navbar-expand bg-body" id="navigation" tabindex="-1">
    <!--begin::Container-->
    <div class="container-fluid">
      <ul class="navbar-nav" role="navigation" aria-label="Navigation 1">
        <li class="nav-item">
          <a class="nav-link" data-lte-toggle="sidebar" href="#" role="button">
            <i class="bi bi-list"></i>
          </a>
        </li>
      </ul>
      <!--begin::Navbar Links-->
      <ul class="navbar-nav ms-auto" role="navigation" aria-label="Navigation 2">
        <!--begin::User Menu Dropdown-->
        <li class="nav-item dropdown user-menu">
          <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img src="../../assets/img/user2-160x160.jpg" class="user-image rounded-circle shadow" alt="User Image" />
            <span class="d-none d-md-inline">{{ loggedUEmail }}</span>
          </a>

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow rounded-1 text-light fs-6">
            <li>
              <a href="#" class="dropdown-item text-dark" @click="autoLog"> <i class="fa fa-sign-out-alt m-2"></i> Logout </a>
            </li>
          </ul>
        </li>

        <!--end::User Menu Dropdown-->
      </ul>
      <!--end::Navbar Links-->
    </div>
    <!--end::Container-->
  </nav>
</template>

<script>
export default {
  computed: {
    loggedUEmail() {
      return this.$store.getters['userAuthMod/userEmail'];
    },
  },
  methods: {
    autoLog() {
      this.$store.dispatch('userAuthMod/autoLogout');
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  width: 30px !important;
}
</style>
