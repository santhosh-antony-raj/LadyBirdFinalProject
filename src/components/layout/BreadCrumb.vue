<template>
  <nav class="breadcrumb">
    <!-- Clicking Home → goes back to CoachFilter -->
    <router-link :to="{ name: 'home' }">Home</router-link>
    <span class="separator"> / </span>
    <span class="current">{{ label }}</span>
  </nav>
</template>

<script>
export default {
  computed: {
    label() {
      const filter = this.$route.params.filter;
      const id = this.$route.params.id;
      const pname = this.$route.name;
      if (filter) {
        return filter.charAt(0).toUpperCase() + filter.slice(1);
      } else if (id) {
        return `#${id}`;
      }
      return pname;
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  padding: 8px 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.separator {
  color: #999;
}
.current {
  color: #555;
  font-weight: 500;
}
a {
  color: #3b82f6;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
