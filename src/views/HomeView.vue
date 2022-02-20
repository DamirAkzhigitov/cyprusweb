<template>
  <div class="home">
    <h1>Todo App</h1>
    <input type="text" v-model="name" placeholder="Todo name" />
    <input type="text" v-model="description" placeholder="Todo description" />
    <button @click="onClickCreateTodo" type="submit">Create Todo</button>
    <div v-for="item in todos" :key="item.id">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </div>
    <!--    <product-list msg="Welcome to Your Vue.js + TypeScript App" />-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onBeforeMount } from 'vue'
import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { createTodo } from '@/graphql/mutations'
import { listTodos } from '@/graphql/queries'
import {
  ListTodosQuery,
  SubcriptionCallBack,
  SubcriptionItem,
  Todo,
} from '@/API'
import { onCreateTodo } from '@/graphql/subscriptions'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const name = ref('')
    const description = ref('')
    const todos: Ref<Todo[]> = ref([])

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

    const getTodos = async () => {
      const response = (await API.graphql({
        query: listTodos,
      })) as GraphQLResult<ListTodosQuery>

      if (
        response &&
        response.data &&
        response.data.listTodos &&
        response.data.listTodos.items
      ) {
        const items = response.data.listTodos.items.filter(
          (todo) => !!todo
        ) as Todo[]

        todos.value = items
      }
    }

    const subscribe = () => {
      ;(
        API.graphql({ query: onCreateTodo }) as unknown as SubcriptionItem
      ).subscribe({
        next: (eventData: SubcriptionCallBack) => {
          let todo = eventData.value.data.onCreateTodo
          if (todos.value.some((item) => item.name === todo.name)) return // remove duplications
          todos.value = [...todos.value, todo]
        },
      })
    }

    onBeforeMount(() => {
      getTodos()
      subscribe()
    })

    return {
      name,
      description,
      onClickCreateTodo,
      todos,
    }
  },
  // components: {
  //   'product-list': defineAsyncComponent(
  //     () => import('@/components/ProductList.vue')
  //   ),
  // },
})
</script>
