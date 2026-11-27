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
        <div v-if="isSignedIn" class="nav-dropdown">
          <span
            class="nav-item"
            aria-haspopup="true"
            :aria-expanded="menuOpen"
            @click.stop="menuOpen = !menuOpen"
          >
            {{ $inter.formatMessage({ path: 'app.menu' }) }}
          </span>
          <div v-if="menuOpen" class="nav-menu" @click.stop>
            <span class="nav-menu-item" @click="exportJSON">
              {{ $inter.formatMessage({ path: 'app.exportAsJSON' }) }}
            </span>
            <span class="nav-menu-item" @click="exportMarkdown">
              {{ $inter.formatMessage({ path: 'app.exportAsMarkdown' }) }}
            </span>
            <span class="nav-menu-item" @click="signOut">
              {{ $inter.formatMessage({ path: 'app.signOut' }) }}
            </span>
          </div>
        </div>
        <span v-else class="nav-item" @click="signIn">
          {{ $inter.formatMessage({ path: 'app.signIn' }) }}
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import { userSession } from '../utils/userSession'
import { exportNotesAsJSON, exportNotesAsMarkdown } from '../utils/exportNotes'
import Logo from './Logo.vue'

export default Vue.extend({
  components: {
    Logo
  },

  data() {
    return {
      menuOpen: false
    }
  },

  computed: {
    isSignedIn() {
      return userSession.isUserSignedIn()
    }
  },

  mounted() {
    document.addEventListener('click', this.closeMenu)
  },

  beforeDestroy() {
    document.removeEventListener('click', this.closeMenu)
  },

  methods: {
    closeMenu() {
      this.menuOpen = false
    },

    async exportJSON() {
      this.closeMenu()
      await exportNotesAsJSON()
    },

    async exportMarkdown() {
      this.closeMenu()
      await exportNotesAsMarkdown()
    },

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
  height: var(--header-height);
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

.nav-dropdown {
  position: relative;
}

.nav-menu {
  position: absolute;
  right: 0;
  top: 100%;
  min-width: 180px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}

.nav-menu-item {
  cursor: pointer;
  padding: 8px 16px;
  white-space: nowrap;

  &:hover {
    background: var(--body-bg);
  }
}
</style>