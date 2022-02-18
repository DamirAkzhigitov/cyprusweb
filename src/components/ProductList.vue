<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div v-for="item in list" :key="item.href">
          <product-item />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  name: 'ProductList',
  components: {
    'product-item': defineAsyncComponent(
      () => import('@/components/card/ProductItem.vue')
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
