<template>
  <div class="home">
    <h1>Todo App</h1>
    <input type="text" v-model="name" placeholder="Todo name" />
    <input type="text" v-model="description" placeholder="Todo description" />
    <button @click="onClickCreateTodo" type="submit">Create Todo</button>
    <!--    <product-list msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { API } from 'aws-amplify'
import { Amplify } from 'aws-amplify'

import awsmobile from '@/aws-exports.js'

Amplify.configure(awsmobile)
import { createTodo } from '@/graphql/mutations'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const name = ref('')
    const description = ref('')

    const onClickCreateTodo = async () => {
      console.log('onClickCreateTodo')
      if (!name.value || !description.value) return

      const todo = {
        name: name.value,
        description: description.value,
      }

      await API.graphql({
        query: createTodo,
        variables: { input: todo },
      })

      name.value = ''
      description.value = ''
    }

    return {
      name,
      description,
      onClickCreateTodo,
    }
  },
  // components: {
  //   'product-list': defineAsyncComponent(
  //     () => import('@/components/ProductList.vue')
  //   ),
  // },
})
</script>
