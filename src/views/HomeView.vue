<template>
  <div class="home">
    <product-list msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    'product-list': defineAsyncComponent(
      () => import('@/components/ProductList.vue')
    ),
  },
})
</script>
