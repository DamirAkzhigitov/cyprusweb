<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <products-grid />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  name: 'ProductList',
  components: {
    'products-grid': defineAsyncComponent(
      () => import('@/components/card/ProductsGrid.vue')
    ),
  },
  setup() {
    const list = ref([
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ])

    return {
      list,
    }
  },
})
</script>
