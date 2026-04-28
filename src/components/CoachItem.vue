<template>
  <tr class="text-center">
    <td>{{ index }}</td>
    <td>{{ fullName }}</td>
    <td class="d-flex justify-content-start align-content-center">
      <!--  :class="`text-bg-${badgeColor(area)}`" -->
      <span class="badge me-1 mt-1" :class="`text-bg-${badgeColor(area)}`" v-for="area in areas" :key="area">{{ area }}</span>
    </td>
    <td>
      <span class="badge text-bg-secondary"> <i class="fa-solid fa-dollar-sign"></i> {{ hourlyRate }}/hr </span>
    </td>

    <td>
      <router-link :to="ViewDetail" class="btn btn-sm btn-light me-2">
        <i class="bi bi-eye-fill"></i>
      </router-link>
      <button data-test="onEdit" class="btn btn-sm btn-light me-2" @click="onEdit()">
        <i class="bi bi-pencil-fill"></i>
      </button>
      <button data-test="delEmit" class="btn btn-sm btn-light" @click="$emit('delete', id)">
        <i class="bi bi-trash-fill"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { computed } from 'vue';

export default {
  props: ['id', 'index', 'firstName', 'lastName', 'areas', 'hourlyRate', 'description'],
  emits: ['edit', 'delete'],
  //setup
  setup(props, { emit }) {
    const fullName = computed(() => {
      return props.firstName + ' ' + props.lastName;
    });
    const ViewDetail = computed(() => {
      return '/coachdetail/' + props.id;
    });
    //show badgecolor
    function badgeColor(area) {
      const colors = {
        frontend: 'warning',
        backend: 'success',
        devops: 'danger',
        career: 'primary',
      };
      return colors[area] || 'secondary';
    }
    //update details
    function onEdit() {
      emit('edit', {
        id: props.id,
        firstName: props.firstName,
        lastName: props.lastName,
        areas: [...props.areas],
        hourlyRate: props.hourlyRate,
        description: props.description,
      });
      console.log('called');
    }
    return {
      fullName,
      ViewDetail,
      badgeColor,
      onEdit,
    };
  },
};
</script>
