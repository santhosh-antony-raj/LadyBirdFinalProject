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
              <i class="fa-solid fa-dollar-sign me-2">{{ rate }}</i></span
            >
          </div>
          <!-- /.card-header -->
          <div class="card-body">
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
import { onMounted, computed, ref } from 'vue';
import BreadCrumb from '../../components/layout/BreadCrumb.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  components: {
    BreadCrumb,
  },
  props: ['id'],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    let selectedCoach = ref(null);
    // let contactListActive = ref(true);

    //onmounted get view details of coach
    onMounted(() => {
      selectedCoach.value = store.getters['coachMod/coaches'].find((coach) => coach.id === props.id);
    });
    //fullname logic
    const fullName = computed(() => {
      return selectedCoach.value ? selectedCoach.value.firstName + ' ' + selectedCoach.value.lastName : '';
    });
    //contact link
    const contactLink = computed(() => {
      return route.path + '/contact';
    });
    //rate
    const rate = computed(() => {
      return selectedCoach.value?.hourlyRate || 0;
    });
    //areas
    const areas = computed(() => {
      return selectedCoach.value?.areas || [];
    });
    //description
    const description = computed(() => {
      return selectedCoach.value?.description || '';
    });
    //areas label colors apply logic
    function badgeColor(area) {
      const colors = {
        frontend: 'warning',
        backend: 'success',
        devops: 'danger',
        career: 'primary',
      };
      return colors[area] || 'none';
    }
    return {
      fullName,
      contactLink,
      areas,
      rate,
      description,
      badgeColor,
    };
  },
};
</script>

<style scoped>
.card-body {
  box-sizing: border-box;
  display: block;
}
</style>
