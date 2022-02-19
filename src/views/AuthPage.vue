<template>
  <div>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Authenticator } from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'
import { Amplify } from 'aws-amplify'

import awsmobile from '@/aws-exports.js'

Amplify.configure(awsmobile)

export default defineComponent({
  name: 'AuthPage',
  components: {
    authenticator: Authenticator,
  },
  setup() {
    return {}
  },
})
</script>

<style scoped></style>
