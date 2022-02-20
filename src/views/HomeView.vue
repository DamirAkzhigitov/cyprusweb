<template>
  <div class="home">
    <h1>Todo App</h1>
    <v-btn tag="router-link" to="/auth">Перейти к авторизации</v-btn>
    <v-row class="pa-3">
      <v-col cols="3">
        <v-card class="mx-auto" max-width="300">
          <v-text-field
            label="Todo Item"
            v-model="name"
            placeholder="write here todo name"
          />
          <v-text-field
            label="Todo description"
            type="text"
            v-model="description"
            placeholder="write here todo description"
          />
          <v-btn @click="onClickCreateTodo" variant="outlined"
            >Create Todo</v-btn
          >
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="mx-auto" max-width="300">
          <v-list>
            <v-list-subheader>TODO LIST</v-list-subheader>
            <v-list-item
              v-for="(item, i) in todos"
              :key="i"
              :value="item"
              active-color="primary"
            >
              <v-list-item-title v-text="item.name" />
              <v-spacer />
              <v-list-item-subtitle v-text="item.description" />
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref } from 'vue'
import { API, Auth } from 'aws-amplify'
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
    const isAuthorized = ref(false)
    const todos: Ref<Todo[]> = ref([])

    const onClickCreateTodo = async () => {
      console.log('onClickCreateTodo')
      if (!isAuthorized.value) {
        return
      }
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
        todos.value = response.data.listTodos.items.filter(
          (todo) => !!todo
        ) as Todo[]
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

    onBeforeMount(async () => {
      await getTodos()
      subscribe()

      try {
        const response = await Auth.currentUserInfo()

        if (response) {
          isAuthorized.value = true
          console.log('response: ', response)
        }
      } catch (e) {
        console.log(e)
      }
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
