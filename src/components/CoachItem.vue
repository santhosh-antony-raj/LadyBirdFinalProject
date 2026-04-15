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
export default {
  props: ['id', 'index', 'firstName', 'lastName', 'areas', 'hourlyRate', 'description'],
  emits: ['edit', 'delete'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    ViewDetail() {
      return '/coachdetail/' + this.id;
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
      return colors[area] || 'secondary';
    },
    onEdit() {
      this.$emit('edit', {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        areas: [...this.areas],
        hourlyRate: this.hourlyRate,
        description: this.description,
      });
      console.log('called');
    },
  },
};
</script>
