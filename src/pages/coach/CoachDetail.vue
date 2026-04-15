<template>
  <div class="container-fluid">
    <div>
      <div class="d-flex justify-content-between">
        <h5 class="mt-2">Coach Detail</h5>
        <bread-crumb></bread-crumb>
      </div>
    </div>

    <div>
      <!-- Router view -->
      <router-view></router-view>
    </div>
    <div class="row">
      <div class="col-12 col-md-12 col-sm-6">
        <div class="card card-outline">
          <div class="card-header">
            <h3 class="card-title">{{ fullName }}</h3>
            <span class="badge text-bg-secondary ms-2">
              <i class="fa-solid fa-dollar-sign">{{ rate }}</i></span
            >

            <div class="card-tools">
              <!--  <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                        <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                        <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                      </button> -->
            </div>
            <!-- /.card-tools -->
          </div>
          <!-- /.card-header -->
          <div class="card-body" style="box-sizing: border-box; display: block">
            <div>
              <h5>Interested? Reach out Now!</h5>
            </div>
            <div class="mt-3 mb-3">
              <span class="badge me-1 p-2" :class="`text-bg-${badgeColor(area)} me-1`" v-for="area in areas" :key="area">{{ area }}</span>
            </div>

            <div>
              <p>{{ description }}</p>
            </div>
            <div class="d-flex justify-content-end">
              <button class="btn text-bg-primary mb-2">
                <router-link class="text-white text-decoration-none" :to="contactLink">Contact</router-link>
              </button>
            </div>
          </div>
          <!-- /.card-body -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '../../components/layout/BreadCrumb.vue';

export default {
  components: {
    BreadCrumb,
  },
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
      contactLinkActive: true,
    };
  },
  created() {
    this.selectedCoach = this.$store.getters['coachMod/coaches'].find((coach) => coach.id === this.id);
  },

  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + '/contact'; //coaches/c1/contact
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },

  methods: {
    badgeColor(area) {
      const colors = {
        frontend: 'warning',
        backend: 'success',
        devops: 'danger',
        career: 'primary',
      };
      return colors[area] || 'none'; // optional safe handling
    },
  },
};
</script>
