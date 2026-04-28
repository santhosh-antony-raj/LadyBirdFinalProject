<template>
  <div class="container-fluid">
    <div>
      <h5 class="mt-2">Dashboard</h5>
    </div>
    <!-- Filter Cards -->
    <div class="row mt-4">
      <div class="col-12 col-sm-6 col-md-3">
        <router-link class="text-decoration-none text-dark" :to="{ name: 'coachList', params: { filter: 'frontend' } }">
          <div class="info-box">
            <span class="info-box-icon text-bg-warning shadow-sm">
              <i class="bi bi-people-fill"></i>
            </span>
            <div class="info-box-content">
              <div class="info-box-text">Frontend</div>
              <div class="info-box-numbers"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <router-link class="text-decoration-none text-dark" :to="{ name: 'coachList', params: { filter: 'backend' } }">
          <div class="info-box">
            <span class="info-box-icon text-bg-success shadow-sm">
              <i class="bi bi-people-fill"></i>
            </span>
            <div class="info-box-content">
              <div class="info-box-text">Backend</div>
              <div class="info-box-numbers"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <router-link class="text-decoration-none text-dark" :to="{ name: 'coachList', params: { filter: 'devops' } }">
          <div class="info-box">
            <span class="info-box-icon text-bg-danger shadow-sm">
              <i class="bi bi-people-fill"></i>
            </span>
            <div class="info-box-content">
              <div class="info-box-text">Devops</div>
              <div class="info-box-numbers"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <router-link class="text-decoration-none text-dark" :to="{ name: 'coachList', params: { filter: 'career' } }">
          <div class="info-box">
            <span class="info-box-icon text-bg-primary shadow-sm">
              <i class="bi bi-people-fill"></i>
            </span>
            <div class="info-box-content">
              <div class="info-box-text">career</div>
              <div class="info-box-numbers"></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
