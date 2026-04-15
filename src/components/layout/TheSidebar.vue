<template>
  <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
    <!--begin::Sidebar Brand-->
    <div class="sidebar-brand">
      <!--begin::Brand Link-->
      <router-link to="/home" class="brand-link">
        <span class="brand-text fw-light">FindCoach</span>
        <!--end::Brand Text-->
      </router-link>
      <!--end::Brand Link-->
    </div>
    <!--end::Sidebar Brand-->
    <!--begin::Sidebar Wrapper-->
    <div class="sidebar-wrapper" data-overlayscrollbars="host">
      <div class="os-size-observer">
        <div class="os-size-observer-listener"></div>
      </div>
      <div
        class=""
        data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
        tabindex="-1"
        style="margin-right: -16px; margin-bottom: -16px; margin-left: 0px; top: -8px; right: auto; left: -8px; width: calc(100% + 16px); padding: 8px"
      >
        <nav class="mt-2">
          <!--begin::Sidebar Menu-->
          <!-- data-lte-toggle="treeview" -->
          <ul class="nav sidebar-menu flex-column" role="navigation" aria-label="Main navigation" data-accordion="false" id="navigation">
            <li class="nav-item">
              <router-link to="/home" class="nav-link"
                ><i class="nav-icon bi bi-speedometer"></i>
                <p>Dashboard</p></router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/coachRegister" class="nav-link"
                ><i class="nav-icon bi bi-circle"></i>
                <p>RegisterCoach</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/coachMsg" class="nav-link"
                ><i class="nav-icon bi bi-circle"></i>
                <p>MessageCoach</p>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link to="/aboutus" class="nav-link">
                <i class="nav-icon bi bi-grip-horizontal"></i>
                <p>About US</p>
              </router-link>
            </li>
          </ul>
          <!--end::Sidebar Menu-->
        </nav>
      </div>
      <div
        class="os-scrollbar os-scrollbar-horizontal os-theme-light os-scrollbar-auto-hide os-scrollbar-handle-interactive os-scrollbar-track-interactive os-scrollbar-cornerless os-scrollbar-unusable os-scrollbar-auto-hide-hidden"
        style="--os-viewport-percent: 1; --os-scroll-direction: 0"
      >
        <div class="os-scrollbar-track">
          <div class="os-scrollbar-handle"></div>
        </div>
      </div>
      <div
        class="os-scrollbar os-scrollbar-vertical os-theme-light os-scrollbar-auto-hide os-scrollbar-handle-interactive os-scrollbar-track-interactive os-scrollbar-visible os-scrollbar-cornerless os-scrollbar-auto-hide-hidden"
        style="--os-viewport-percent: 0.1612; --os-scroll-direction: 0"
      >
        <div class="os-scrollbar-track">
          <div class="os-scrollbar-handle"></div>
        </div>
      </div>
    </div>
    <!--end::Sidebar Wrapper-->
  </aside>
</template>
