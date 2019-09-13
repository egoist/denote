<template>
  <div class="main">
    <div class="container">
      <div class="hero">
        <Logo size="4em" />
        <h2>A Decentralized Note-Taking App</h2>
        <div class="actions">
          <button class="button" @click="signIn">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from './Logo.vue'
import { userSession } from '../utils/userSession'

export default Vue.extend({
  components: {
    Logo
  },

  methods: {
    signIn() {
      userSession.redirectToSignIn()
    }
  }
})
</script>

<style scoped>
.hero {
  text-align: center;
  color: var(--active-text-color);
  margin: 100px 0;
  & h2 {
    font-weight: 400;
    font-size: 3rem;
    margin: 20px 0;
  }
}

.actions {
  margin-top: 50px;
}
</style>