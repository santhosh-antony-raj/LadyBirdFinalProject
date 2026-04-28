<template>
  <nav aria-label="...">
    <ul class="pagination">
      <!-- previous button -->
      <li class="page-item styleall" :class="{ disabled: currentPage == 1 }">
        <a class="page-link fs-7" data-test="preClick" @click="$emit('prevPage')"><span aria-hidden="true">&LessLess;</span></a>
      </li>
      <!-- page Numbers -->
      <li class="page-item styleall" aria-current="page" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
        <a class="page-link fs-7" data-test="gotoClick" @click="$emit('goTo', page)">{{ page }}</a>
      </li>
      <li class="page-item styleall" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link fs-7" data-test="nextClick" @click="$emit('nextPage')"><span aria-hidden="true">&GreaterGreater;</span></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['currentPage', 'totalPages'],
  emits: ['nextPage', 'prevPage', 'goTo'],
};
</script>

<style scoped>
.styleall {
  cursor: pointer;
}
</style>
