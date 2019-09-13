<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <div class="logo">
          <Logo />
          <nuxt-link to="/">Denote</nuxt-link>
        </div>
      </div>
      <div class="header-right">
        <span v-if="isSignedIn" class="nav-item" @click="signOut">Sign out</span>
        <span v-else class="nav-item" @click="signIn">Sign in</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { userSession } from '../utils/userSession'
import Logo from './Logo.vue'

export default Vue.extend({
  components: {
    Logo
  },

  computed: {
    isSignedIn() {
      return userSession.isUserSignedIn()
    }
  },

  methods: {
    signIn() {
      userSession.redirectToSignIn()
    },

    signOut() {
      userSession.signUserOut('/')
    }
  }
})
</script>

<style scoped>
.header {
  border-bottom: 1px solid var(--border-color);
  height: 60px;
}

.header > .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 1.3rem;

  & svg {
    margin-right: 10px;
  }

  & a {
    text-decoration: none;
  }
}

.nav-item {
  cursor: pointer;
}
</style>